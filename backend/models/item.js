"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for items. */

class Item {

    /** Create a item (from data), update db, return new item data.
     *
     * data should be { name, unit, description, department }
     *
     * Returns { id, name, unit, description, department }
     *
     * Throws BadRequestError if item already in database.
     * */

    static async create({ name, unit, description, department }) {
        const duplicateCheck = await db.query(
            `SELECT name
            FROM items
            WHERE name = $1`,
            [name]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate item: ${name}`);

        const validDepartmentCheck = await db.query(
            `SELECT code
            FROM departments
            WHERE code = $1`,
            [department]
        );

        if (!validDepartmentCheck.rows[0])
            throw new BadRequestError(`Department code does not exist: ${deparment}`);

        const result = await db.query(
            `INSERT INTO items
            ( name, unit, description, department )
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, unit, description, department`,
            [
            name,
            unit,
            description,
            department
            ]
        );
        const item = result.rows[0];

        return item;
    }

    /** Find all items.
     *
     * Returns [{ id, name, unit, description, department }, ...]
     * */

    static async findAll() {
        let query = `SELECT id,
                            name,
                            unit,
                            description,
                            department
                    FROM items`;
        query += " ORDER BY name";
        const itemsRes = await db.query(query);
        return itemsRes.rows;
    }

    /** Given a item id, return data about item.
     *
     * Returns { id, name, unit, description, department }
     *
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const itemRes = await db.query(
            `SELECT id,
                    name,
                    unit,
                    description,
                    department
            FROM items
            WHERE id = $1`,
            [id]);

        const item = itemRes.rows[0];

        if (!item) throw new NotFoundError(`No item: ${id}`);

        return item;
    }

    /** Update item data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: { name, unit, description, department }
     *
     * Returns { id, name, unit, description, department }
     *
     * Throws NotFoundError if not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {});
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE items 
                        SET ${setCols} 
                        WHERE id = ${idVarIdx} 
                        RETURNING id, 
                                  name, 
                                  unit,
                                  description, 
                                  department`;
        const result = await db.query(querySql, [...values, id]);
        const item = result.rows[0];

        if (!item) throw new NotFoundError(`No item: ${id}`);

        return item;
    }

    /** Delete given item from database; returns undefined.
     *
     * Throws NotFoundError if item not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
            FROM items
            WHERE id = $1
            RETURNING id`,
            [id]);
        const item = result.rows[0];

        if (!item) throw new NotFoundError(`No item: ${id}`);
    }
}


module.exports = Item;
