import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const NotFound = ()=>{
    return (
        <Container className="NotFound">
            Not Found Page please return to <Link to="/">Home Page</Link>
        </Container>
    )
}

export default NotFound;