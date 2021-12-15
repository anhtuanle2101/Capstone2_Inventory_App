import React, { useState, useEffect, useContext } from "react";
import { Container, Button } from "reactstrap";
import TemplateCard from "./TemplateCard";
import "./TemplateList.css";
// Api helper
import ApiHelper from "./apiHelper";
import currentUserContext from "./currentUserContext";

const TemplateList = ()=>{
    const INIT_DATA = { "searchTerm" : "" };

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
            {/* Search Box */}
            {/* <form>
                <input type="search" placeholder="Enter search term" id="searchTerm" name="searchTerm" onChange={handleChange}/>
                <Button onClick={handleSubmit}>Search</Button>
            </form> */}
            {/* Template List */}
            {templateList.map(template=><TemplateCard key={template.id} id={template.id} name={template.name} description={template.description} date={template.createdAt} user={template.createdBy}/>)}
        </Container>
    )
}

export default TemplateList;