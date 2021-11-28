"use strict";

// Convenient middleware functions to handle common auth cases in routes. 

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middle ware: Authenticate user by checking upcomming request headers
 * 
 *  If the token was provided, verify it, and if it's valid, store the token
 *  payload on res.locals { username, is Admin }
 * 
 *  No error is thrown if no token was provided or the token is invalid.
 */

const authenticateJWT = (req, res, next) =>{
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

/** Middleware to ensure the users login
 * 
 * If not, raises Unauthorized.
 */

const ensureLoggedIn = (req, res, next) =>{
    try {
        if (!req.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

/** Middleware to ensure the user logged in as admin.
 * 
 * If not, raises Unauthorized.
 */
const ensureAdmin = (req, res, next) =>{
    try {
        if (!res.locals.user || !res.locals.user.isAdmin) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

/** Middleware to ensure the user is logged in with valid token and 
 * matched with username provided in the route param.
 * 
 * If not, raises Unauthorized.
 */
const ensureCorrectUserOrAdmin = (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!(user && (user.isAdmin || user.username === req.params.username))) throw new UnauthorizedError("Same logged-in user required!");
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin
}