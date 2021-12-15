import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody,
    CardTitle, CardText } from "reactstrap";
import "./InventoryCard.css";

const InventoryCard = ({ id, name, unit, description, department })=>{
    
    return (
        <Container className="InventoryCard">
            {/* <Link to={`/inventories/${id}`}> */}
                <Card >
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardText>
                        Unit: {unit}
                        </CardText>
                        <CardText>
                        Description: {description}
                        </CardText>
                        <CardText>
                        Department: {department}
                        </CardText>
                    </CardBody>
                </Card>
            {/* </Link> */}
            
        </Container>
    )
}

export default InventoryCard;