import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import InventoryCard from "./InventoryCard";
// Api helper
import ApiHelper from "./apiHelper";

const InventoryList = ()=>{
    const INIT_DATA = { "searchTerm" : "" };

    const [ inventoryList, setInventoryList ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [formData, setFormData] = useState(INIT_DATA);
    

    useEffect(()=>{
        async function fetchData(){
          const inventories = await ApiHelper.inventoryGetAll();
          setInventoryList(inventories);
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
        <Container className="InventoryList">
            <h1>Inventory List</h1>
            {/* Search Box */}
            {/* <form>
                <input type="search" placeholder="Enter search term" id="searchTerm" name="searchTerm" onChange={handleChange}/>
                <Button onClick={handleSubmit}>Search</Button>
            </form> */}
            {/* Inventory List */}
            {inventoryList.map(inventory=><InventoryCard key={inventory.id} id={inventory.id} title={inventory.title} date={inventory.inventoryDate} complete={inventory.completeFlag} template={inventory.templatedBy} user={inventory.inventoryBy}/>)}
        </Container>
    )
}

export default InventoryList;