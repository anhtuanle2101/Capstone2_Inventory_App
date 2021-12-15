"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helper/sql");

/** Related functions for templates. */

class Template {

    /** Create a template (from data), update db, return new template data.
     *
     * data should be { name, description, userId, itemList }
     * 
     * and itemList should be [{ id, quantity }, ...]
     *
     * Returns { id, name, description, createdAt, createdBy, itemList }
     * 
     * and itemList should be [{ item_id, name, unit, description, department, quantity }, ...]
     *
     * Throws BadRequestError if template already in database.
     * */

    static async create({ name, description, userId, itemList }) {
        const duplicateCheck = await db.query(
            `SELECT name
            FROM templates
            WHERE name = $1`,
            [name]);

        if (duplicateCheck.rows[0])
        throw new BadRequestError(`Duplicate template: ${name}`);

        const result = await db.query(
            `INSERT INTO templates
            ( name, description, created_by )
            VALUES ($1, $2, $3)
            RETURNING id, name, description, created_at AS "createdAt", created_by AS "createdBy"`,
            [
            name,
            description,
            userId
            ],
        );
        const template = result.rows[0];
        template.itemList = [];

        for (let item of itemList){
            const itemResult = await this.addItem(template.id, item.id, item.quantity);

            template.itemList.push(itemResult);
        }

        return template;
    }

    /** Add an item to template
     * 
     * data should be { template_id, item_id, quantity }
     * 
     * Returns { item_id, name, description, department, quantity }
     * 
     * Throws NotFoundErorr if the item_id does not exist in db
     */
    static async addItem({ template_id, item_id, quantity }){
        const existCheck = await db.query(
            `SELECT * 
            FROM items 
            WHERE id = $1`,
            [item_id]
        );

        if (!existCheck.rows[0]){
            throw new NotFoundError(`Item not found id: ${item_id}`);
        }

        const item = existCheck.rows[0];

        const result = await db.query(
            `INSERT INTO templates_items
            ( template_id, item_id, quantity )
            VALUES ($1, $2, $3)
            RETURNING quantity`,
            [
                template_id,
                item.id, 
                quantity
            ]
        );

        item.item_id = item.id;
        delete item.id;
        
        return {  ...result, ...item  };
    }

    /** Find all templates.
     *
     * Returns [{ id, name, description, createdAt, createdBy }, ...]
     * */

    static async findAll() {
        let query = `SELECT id,
                            name,
                            description,
                            created_at AS "createdAt",
                            created_by AS "createdBy"
                    FROM templates`;
        query += " ORDER BY name";
        const templatesRes = await db.query(query);
        return templatesRes.rows;
    }

    /** Given a template id, return data about template.
     *
     * Returns { id, name, description, createdAt, createdBy, itemList }
     * where itemList is [{ id, name, description, deparment, quantity }, ...]
     * 
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const templateRes = await db.query(
            `SELECT id,
                    name,
                    description,
                    created_at AS "createdAt",
                    created_by AS "createdBy"
            FROM templates
            WHERE id = $1`,
            [id]);

        const template = templateRes.rows[0];

        if (!template) throw new NotFoundError(`No template: ${id}`);

        const itemListRes = await db.query(
            `SELECT i.id, i.name, i.unit, i.description, i.department, ti.quantity
            FROM items i JOIN templates_items ti ON i.id = ti.item_id
            WHERE ti.template_id = $1
            ORDER BY i.id`,
            [id]
        )

        template.itemList = itemListRes.rows;

        return template;
    }

    /** Update template data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: { name, description }
     *
     * Returns { id, name, description, createdAt, createdBy }
     *
     * Throws NotFoundError if not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {});
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE templates 
                        SET ${setCols} 
                        WHERE id = ${idVarIdx} 
                        RETURNING id, 
                                    name, 
                                    description, 
                                    created_at AS "createdAt",
                                    created_by AS "createdBy"`;
        const result = await db.query(querySql, [...values, id]);
        const template = result.rows[0];

        if (!template) throw new NotFoundError(`No template: ${id}`);

        return template;
    }

    /** Delete given template from database; returns undefined.
     *
     * Throws NotFoundError if template not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
            FROM templates
            WHERE id = $1
            RETURNING id`,
            [id]);
        const template = result.rows[0];

        if (!template) throw new NotFoundError(`No template: ${id}`);
    }
}


module.exports = Template;
