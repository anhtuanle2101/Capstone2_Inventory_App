import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody,
    CardTitle, CardText } from "reactstrap";
import "./InventoryCard.css";

const InventoryCard = ({ id, title, date, complete, template, user })=>{
    
    return (
        <Container className="InventoryCard">
            {/* <Link to={`/inventories/${id}`}> */}
                <Card >
                    <CardBody>
                        <CardTitle><h4>{title}</h4></CardTitle>
                        <CardText>
                        Date: {(new Date(date)).toLocaleDateString("en-US")}
                        </CardText>
                        <CardText>
                        Complete: {complete?"True":"False"}
                        </CardText>
                        <CardText>
                        Template ID: {template}
                        </CardText>
                        <CardText>
                        Inventory By User ID: {user}
                        </CardText>
                    </CardBody>
                </Card>
            {/* </Link> */}
            
        </Container>
    )
}

export default InventoryCard;