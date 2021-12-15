import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./TemplateDetails.css";
import ItemCard from "./ItemCard";

const TemplateDetails = ({ getTemplate })=>{
    const { currentUser } = useContext(currentUserContext);
    const [ templateDetails, setTemplateDetails ] = useState({name:"", description:"", createdAt:"", createdBy:"", itemList:[]});
    const [ isLoading, setIsLoading ] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!currentUser) navigate("/");
        async function fetchData(){
            const { name, description, createdAt, createdBy, itemList } = await getTemplate(id);
            setTemplateDetails({name, description, createdAt, createdBy, itemList });
        }
        fetchData();
        setIsLoading(false);
    }, [])

    if (isLoading){
        return <p>Loading...</p>
    }
    else
    return (
        <Container className="TemplateDetails">
            <h1>Template Detail</h1>
            <Container>
                Name: {templateDetails.name}
            </Container>
            <Container>
                Description: {templateDetails.description}
            </Container>
            <Container>
                Created At: {( new Date(templateDetails.createdAt)).toLocaleString()}
            </Container>
            <Container>
                Item List: {templateDetails.itemList.map(item=>item.name).join(", ")}
            </Container>
            <Button>Create a new Inventory</Button>
        </Container>
    )
}

export default TemplateDetails;