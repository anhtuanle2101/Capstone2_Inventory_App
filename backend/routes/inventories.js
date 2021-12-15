"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { checkValidator } = require("../helper/helperFunc");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const inventoryNewSchema = require("../schemas/inventoryNew.json");
const inventoryPatchSchema = require("../schemas/inventoryPatch.json");
const Inventory = require("../models/inventory");

/** POST /inventories { inventory } => { inventory } 
 * 
 * inventories can only be created by logged in users
 * Returns { id, title, inventoryDate, completeFlag, templatedBy, inventoryBy }
 * 
 * Authorization required: logged-in users
*/
router.post("/", ensureLoggedIn, async (req, res, next) =>{
    try {
        const validator = jsonschema.validate(req.body, inventoryNewSchema);
        checkValidator(validator);
        
        const inventory = await Inventory.create(req.body);
        return res.status(201).json({ inventory })
    } catch (err) {
        return next(err);
    }
})

/** GET /inventories => { inventories: [ {id, title, inventoryDate, completeFlag, templatedBy, inventoryBy }, ... ]}
 * 
 * Return list of inventories 
 * 
 * Authorization required: logged-in users
 */
router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const inventories = await Inventory.findAll();
        return res.json({ inventories });
    } catch (err) {
        return next(err);      
    }
})

/** GET /inventories/:id => { inventory } 
 * 
 * Returns { id, title, inventoryDate, completeFlag, templatedBy, inventoryBy }
 * 
 * Authorization required: logged-in users
*/
router.get("/:id", ensureLoggedIn, async (req, res, next) =>{
    try {
        const inventory = await Inventory.get(req.params.id);
        return res.json({ inventory });
    } catch (err) {
        return next(err);
    }
})

/** PATCH /inventories/:id { inventory } => { inventory }
 * 
 * Data can include:
 *  { title, completeFlag }
 * 
 * Returns { id, title, inventoryDate, completeFlag, templatedBy, inventoryBy }
 * 
 * Authorization required: logged in users
 */
router.patch("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        // const validator = jsonschema.validate(req.body, inventoryPatchSchema);
        // checkValidator(validator);
        const inventory = await Inventory.update(req.params.id, req.body);
        return res.json({ inventory });
    } catch (err) {
        return next(err);
    }
})

/** DELETE /inventories/:id => { deleted: id }
 * 
 * Authorization required: admin
 */
router.delete("/:id", ensureAdmin, async (req, res, next) => {
    try {
        await Inventory.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;