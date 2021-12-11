// ExpressError extends normal JS Error class 
// so we can add a status with every instance 
// The error-handling middleware will return the error

class ExpressError extends Error{
    constructor( message, status ){
        super();
        this.message = message;
        this.status = status;
    }
}

// 404 NotFoundError
class NotFoundError extends ExpressError{
    constructor( message = "Not Found"){
        super( message, 404 );
    }
}

// 401 UnauthorizedError
class UnauthorizedError extends ExpressError{
    constructor( message = "Unauthorized" ){
        super( message, 401 );
    }
}

// 400 BadRequestError
class BadRequestError extends ExpressError{
    constructor( message = "Bad Request" ){
        super( message, 400 );
    }
}

// 403 ForbiddenEror
class ForbiddenError extends ExpressError{
    constructor( message = "Bad Request" ){
        super( message, 403 );
    }
}

module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
}