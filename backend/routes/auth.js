"use strict";

// Routes for authentication.

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helper/tokens");
const { checkValidator } = require("../helper/helperFunc");
const authSchema = require("../schemas/auth.json");
const registerSchema = require("../schemas/register.json");

/** POST /auth/token: { username, password } => { token }
 * 
 * Returns JWT token which can be used to authenticate further requests.
 * 
 * Authorization required: none
 */
router.post("/token", async (req, res, next) =>{
    try {
        const validator = jsonschema.validate(req.body, authSchema);
        checkValidator(validator);

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
})

/** POST /auth/register: { user } => { token }
 * 
 * Returns JWT token which can be used to authenticate further requests.
 * 
 * Authorization required: none
 */
router.post("/register", async (req, res, next) =>{
    try {
        const validator = jsonschema.validate(req.body, registerSchema);
        checkValidator(validator);

        const newUser = await User.register({ ...req.body, isAdmin:false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;