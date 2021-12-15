import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody,
    CardTitle, CardText } from "reactstrap";
import "./TemplateCard.css";

const TemplateCard = ({ id, name, description, date, user })=>{
    
    return (
        <Container className="TemplateCard">
            <Link to={`/templates/${id}`}>
                <Card >
                    <CardBody>
                        <CardTitle><h4>{name}</h4></CardTitle>
                        <CardText>
                        Date: {(new Date(date)).toLocaleDateString("en-US")}
                        </CardText>
                        <CardText>
                        Description: {description}
                        </CardText>
                        <CardText>
                        Template By User ID: {user}
                        </CardText>
                    </CardBody>
                </Card>
            </Link>
            
        </Container>
    )
}

export default TemplateCard;