"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for templates. */

class Template {

    /** Create a template (from data), update db, return new template data.
     *
     * data should be { name, description, userId }
     *
     * Returns { id, name, description, createdAt, createdBy }
     *
     * Throws BadRequestError if template already in database.
     * */

    static async create({ name, description, userId }) {
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

        return template;
    }

    /** Find all templates (optional filter on searchFilters).
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
     * Returns { id, name, description, createdAt, createdBy }
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

        // const jobsRes = await db.query(
        //     `SELECT id, title, salary, equity
        //     FROM jobs
        //     WHERE template_handle = $1
        //     ORDER BY id`,
        //     [handle],
        // );

        // template.jobs = jobsRes.rows;

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
