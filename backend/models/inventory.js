"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helper/sql");

/** Related functions for inventories. */

class Inventory {

    /** Create a inventory (from data), update db, return new inventory data.
     *
     * data should be { title, templatedBy, inventoryBy }
     *
     * Returns { id, title, inventoryDate, completeFlag, templatedBy, inventoryBy, itemList }
     * where itemList is [{ id, name, description, department, template_quantity, inventory_quantity }]
     *
     * Throws BadRequestError if inventory already in database.
     * */

    static async create({ title, templatedBy, inventoryBy }) {
        const duplicateCheck = await db.query(
            `SELECT title
            FROM inventories
            WHERE title = $1`,
            [title]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate inventory: ${name}`);

        const validTemplateCheck = await db.query(
            `SELECT id
            FROM templates
            WHERE id = $1`,
            [templatedBy]
        );

        if (!validTemplateCheck.rows[0]) throw new BadRequestError(`Template id does not exist: ${templatedBy}`);

        const validUserCheck = await db.query(
            `SELECT id
            FROM users
            WHERE id = $1`,
            [inventoryBy]
        )

        if (!validUserCheck.rows[0]) throw new BadRequestError(`User id does not exist: ${inventoryBy}`);

        const result = await db.query(
            `INSERT INTO inventories
            ( title, templatedBy, inventoryBy )
            VALUES ($1, $2, $3)
            RETURNING id, title, inventoryDate, completeFlag, templatedBy, inventoryBy`,
            [
                title,
                templatedBy,
                inventoryBy
            ]
        );
        const inventory = result.rows[0];

        return inventory;
    }

    /** Add an item to the inventory
     * 
     *  @params Accepts an object of the inventory id, item id and a quantity
     *  
     *  Returns { item_id, name, description, department, quantity }
     * 
     *  Throws NotFound Error if the item does not exist in the database
     */

    static async addItem({ inventory_id, item_id, quantity }){
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
            `INSERT INTO inventories_items
            ( inventory_id, item_id, quantity )
            VALUES ($1, $2, $3)
            RETURNING quantity`,
            [
                inventory_id,
                item.id, 
                quantity
            ]
        );

        item.item_id = item.id;
        delete item.id;
        
        return {  ...result, ...item  };
    }

    /** Find all inventories.
     *
     * Returns [{ id, title, inventoryDate, completeFlag, templatedBy, inventoryBy }, ...]
     * */

    static async findAll() {
        let query = `SELECT id,
                            title,
                            inventory_date AS "inventoryDate",
                            complete_flag AS "completeFlag",
                            templated_by AS "templatedBy",
                            inventory_by AS "inventoryBy"
                    FROM inventories`;
        query += " ORDER BY title";
        const inventoriesRes = await db.query(query);
        return inventoriesRes.rows;
    }

    /** Given a inventory id, return data about inventory.
     *
     * Returns { id, title, inventoryDate, completeFlag, templatedBy, inventoryBy, itemList }
     * where itemList is [{ id, name, description, deparment, quantity }, ...]
     * 
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const inventoryRes = await db.query(
            `SELECT id,
                    title,
                    inventory_date AS "inventoryDate", 
                    complete_flag AS "completeFlag",
                    templated_by AS "templatedBy",
                    inventory_by AS "inventoryBy"
            FROM inventories
            WHERE id = $1`,
            [id]);

        const inventory = inventoryRes.rows[0];

        if (!inventory) throw new NotFoundError(`No inventory: ${id}`);

        const itemListRes = await db.query(
            `SELECT i.id, i.name, i.unit, i.description, i.department, ii.quantity
            FROM items i JOIN inventories_items ii ON i.id = ii.item_id
            WHERE ii.template_id = $1
            ORDER BY i.id`,
            [id]
        )

        inventory.itemList = itemListRes.rows;

        return inventory;
    }

    /** Update inventory data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: { title, completeFlag }
     *
     * Returns { id, title, inventoryDate, completeFlag, templatedBy, inventoryBy }
     *
     * Throws NotFoundError if not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                completeFlag: "complete_flag"
            });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE inventories 
                        SET ${setCols} 
                        WHERE id = ${idVarIdx} 
                        RETURNING id, 
                                  title,
                                  inventory_date AS "inventoryDate",
                                  complete_flag AS "completeFlag",
                                  templated_by AS "templatedBy",
                                  inventory_by AS "inventoryBy"`;

        const result = await db.query(querySql, [...values, id]);
        const inventory = result.rows[0];

        if (!inventory) throw new NotFoundError(`No inventory: ${id}`);

        return inventory;
    }

    /** Delete given inventory from database; returns undefined.
     *
     * Throws NotFoundError if inventory not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
            FROM inventories
            WHERE id = $1
            RETURNING id`,
            [id]);

        const inventory = result.rows[0];

        if (!inventory) throw new NotFoundError(`No inventory: ${id}`);
    }
}


module.exports = Inventory;
