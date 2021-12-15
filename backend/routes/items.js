"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { checkValidator } = require("../helper/helperFunc");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const itemNewSchema = require("../schemas/itemNew.json");
const itemPatchSchema = require("../schemas/itemPatch.json");
const Item = require("../models/item");

/** POST /items { item } => { item } 
 * 
 * items can only be created by admin users
 * Returns { id, name, unit, description, department }
 * 
 * Authorization required: admin
*/
router.post("/", ensureAdmin, async (req, res, next) =>{
    try {
        const validator = jsonschema.validate(req.body, itemNewSchema);
        checkValidator(validator);
        
        const item = await Item.create(req.body);
        return res.status(201).json({ item })
    } catch (err) {
        return next(err);
    }
})

/** GET /items => { items: [ {id, name, unit, description, department }, ... ]}
 * 
 * Return list of items 
 * 
 * Authorization required: admin
 */
router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const items = await Item.findAll();
        return res.json({ items });
    } catch (err) {
        return next(err);      
    }
})

/** GET /items/:id => { item } 
 * 
 * Returns { id, name, unit, description, department }
 * 
 * Authorization required: admin
*/
router.get("/:id", ensureLoggedIn, async (req, res, next) =>{
    try {
        const item = await Item.get(req.params.id);
        return res.json({ item });
    } catch (err) {
        return next(err);
    }
})

/** PATCH /items/:id { item } => { item }
 * 
 * Data can include:
 *  { name, description }
 * 
 * Returns { id, name, unit, description, department }
 * 
 * Authorization required: admin
 */
router.patch("/:id", ensureAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema(req.body, itemPatchSchema);
        checkValidator(validator);

        const item = await Item.update(id, req.body);
        return res.json({ item });
    } catch (err) {
        return next(err);
    }
})

/** DELETE /items/:id => { deleted: id }
 * 
 * Authorization required: admin
 */
router.delete("/:id", ensureAdmin, async (req, res, next) => {
    try {
        await Item.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;