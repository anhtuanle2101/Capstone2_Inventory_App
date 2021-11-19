const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**
 * 
 * @params user which contains 2 fields username and isAdmin
 * 
 * returns token which is created with `jwt` and signed with secret key
 */

const createToken = user =>{
    console.assert(user.isAdmin !== undefined,
        "createToken passed user without isAdmin property");

    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false
    };

    return jwt.sign(payload, SECRET_KEY)
}

module.exports = { createToken };