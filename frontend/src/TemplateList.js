import React, { useState, useEffect, useContext } from "react";
import { Container, Button } from "reactstrap";
import TemplateCard from "./TemplateCard";
import "./TemplateList.css";
// Api helper
import ApiHelper from "./apiHelper";
import currentUserContext from "./currentUserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const TemplateList = ()=>{

    const [ templateList, setTemplateList ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAdmin } = useContext(currentUserContext);
    

    useEffect(()=>{
        async function fetchData(){
          const templates = await ApiHelper.templateGetAll();
          setTemplateList(templates);
        }
        fetchData();
        setIsLoading(false);
        
    }, [])

    if (isLoading){
        return (<p>Loading... </p>)
    }
    return (
        <Container className="TemplateList">
            <h1>Template List</h1>
            <h3>Pick a template to create a new inventory</h3>

            {isAdmin?<Button>Create a new Template</Button>:""}
            {/* Template List */}
            {templateList.map(template=><TemplateCard key={template.id} id={template.id} name={template.name} description={template.description} date={template.createdAt} user={template.createdBy}/>)}
        </Container>
    )
}

export default TemplateList;