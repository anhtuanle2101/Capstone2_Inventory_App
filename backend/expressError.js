// ExpressError extends normal JS Error class 
// so we can add a status with every instance 
// The error-handling middleware will return the error

class ExpressError extends Error{
    constructor( msg, status ){
        super();
        this.msg = msg;
        this.status = status;
    }
}

// 404 NotFoundError
class NotFoundError extends ExpressError{
    constructor( msg = "Not Found"){
        super( msg, 404 );
    }
}

// 401 UnauthorizedError
class UnauthorizedError extends ExpressError{
    constructor( msg = "Unauthorized" ){
        super( msg, 401 );
    }
}

// 400 BadRequestError
class BadRequestError extends ExpressError{
    constructor( msg = "Bad Request" ){
        super( msg, 400 );
    }
}

// 403 ForbiddenEror
class ForbiddenError extends ExpressError{
    constructor( msg = "Bad Request" ){
        super( msg, 403 );
    }
}

module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
}