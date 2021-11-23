"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const { checkValidator } = require("../helper/helperFunc");
const { ensureLoggedIn } = require("../middleware/auth");
const templateNewSchema = require("../schemas/templateNew.json");
const templatePatchSchema = require("../schemas/templatePatch.json");

/** POST /templates { template } => { template } 
 * 
 * Templates can only be created by admin users
 * Returns { id, name, description, createdAt, createdBy }
 * 
 * Authorization required: admin
*/
router.post("/", async (req, res, next) =>{
    try {
        const validator = jsonschema.validate(req.body, templateNewSchema);
        checkValidator(validator);
        
        const template = await Template.create(req.body);
        return res.status(201).json({ template })
    } catch (err) {
        return next(err);
    }
})

/** GET /templates => { templates: [ {id, name, description, createdAt, createdBy }, ... ]}
 * 
 * Return list of templates 
 * 
 * Authorization required: logged-in users
 */
router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const templates = await Template.findAll();
        return res.json({ templates });
    } catch (err) {
        return next(err);      
    }
})

/** GET /templates/:id => { template } 
 * 
 * Returns { id, name, description, createdAt, createdBy, itemList }
 * where itemList is { itemList: [ { id, name, unit, description, deparment, quantity }, ... ] }
 * 
 * Authorization required: admin or read-permitted users
*/
router.get("/:id", ensurePermittedOrAdmin, async (req, res, next) =>{
    try {
        const template = await Template.get(req.params.id);
        return res.json({ template });
    } catch (err) {
        return next(err);
    }
})

/** PATCH /templates/:id { template } => { template }
 * 
 * Data can include:
 *  { name, description }
 * 
 * Returns { id, name, description, createdAt, createdBy }
 * 
 * Authorization required: admin or edit-permitted user
 */
router.patch("/:id", ensurePermittedOrAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema(req.body, templatePatchSchema);
        checkValidator(validator);

        const template = await Template.update(id, req.body);
        return res.json({ template });
    } catch (err) {
        return next(err);
    }
})

/** DELETE /templates/:id => { deleted: id }
 * 
 * Authorization required: admin or delete-permitted user
 */
router.delete("/:id", async (req, res, next) => {
    try {
        await Template.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;