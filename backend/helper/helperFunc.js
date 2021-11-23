const { BadRequestError } = require("../expressError");

const checkValidator = (validator) =>{
    if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
    }
}

module.exports = {
    checkValidator
}