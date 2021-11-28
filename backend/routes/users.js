"use strict";

// User routes

const jsonschema = require("jsonschema");

const express = require("express");
const User = require("../model/user");
const { createToken } = require("../helper/tokens");
const { checkValidator } = require("../helper/helperFunc");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const userNewSchema = require("../schemas/userNew.json");
const userPatchSchema = require("../schemas/userPatch.json");


const router = new express.Router();

/** POST /users/ { user } => { user, token } 
 * 
 * Adds a new user. This is not the registration endpoint -- this is only
 * for admin users to add new users. The new user being added can be an admin.
 * 
 * This returns the newly created user and a JWT token for further requests.
 * { user: { id, username, firstName, lastName, email, isAdmin }, token }
 * 
 * Authorization required: admin
*/
router.post("/", ensureAdmin, async (req, res, next) => {
    try {
        const validator = jsonshema.validate(req.body, userNewSchema);
        checkValidator(validator);
        
        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
})

/** GET /users => { users: [ { id, username, firstName, lastName, email }, ... ]} 
 * 
 * Returns list of users
 * 
 * Authorization required: Admin
*/
router.get("/", ensureAdmin, async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
})

/** GET /users/:username => { user } 
 * 
 * Returns { id, username, firstName, lastName, isAdmin, templates, inventories }
 * where templates are [ { id, name, description, createdAt }, ... ]
 * and inventories are [ { id, title, inventory_date, completeFlag, templatedBy }, ... ]
 * 
 * Authorization required: admin or same username logged-in user
*/
router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) =>{
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
})

/** PATCH /users/:username { user } => { user } 
 * 
 * Data can include: { username, firstName, lastName, password, email }
 * 
 * Returns { id, username, firstName, lastName, email, isAdmin }
 * 
 * Authorization required: admin or same username logged-in user
*/
router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) =>{
    try {
        const validator = jsonschema.validate(rea.body, userPatchSchema);
        checkValidator(validator);
        
        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
        
    }
})

/** DELETE /users/:username => { deleted: { id, username } } 
 * 
 * Authorization required: admin or same username logged-in user
*/
router.delete("/:username", ensureCorrectUserOrAdmin, async (req, res, next) =>{
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;