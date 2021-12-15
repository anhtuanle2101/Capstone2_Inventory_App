import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import TemplateCard from "./TemplateCard";
// Api helper
import ApiHelper from "./apiHelper";

const TemplateList = ()=>{
    const INIT_DATA = { "searchTerm" : "" };

    const [ templateList, setTemplateList ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [formData, setFormData] = useState(INIT_DATA);
    

    useEffect(()=>{
        async function fetchData(){
          const templates = await ApiHelper.templateGetAll();
          setTemplateList(templates);
        }
        fetchData();
        setIsLoading(false);
        
    }, [])

    // const handleSubmit = async (e)=>{
    //     e.preventDefault();
    //     const { searchTerm } = formData;
    //     // const companies = await filterCompany(searchTerm);
    //     // setCompanyList(companies);
    // }

    // const handleChange = (e)=>{
    //     const {name, value} = e.target;
    //     setFormData(data=>({...data, [name]:value}));
    // }

    if (isLoading){
        return (<p>Loading... </p>)
    }
    return (
        <Container className="TemplateList">
            <h1>Template List</h1>
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