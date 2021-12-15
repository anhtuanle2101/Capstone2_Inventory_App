import React, { useState, useEffect, useContext } from "react";
import { Button, Container } from "reactstrap";
import InventoryCard from "./InventoryCard";
import "./InventoryList.css";
// Api helper
import ApiHelper from "./apiHelper";
import currentUserContext from "./currentUserContext";

const InventoryList = ()=>{

    const [ inventoryList, setInventoryList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const { currentUser, isAdmin } = useContext(currentUserContext);
    

    useEffect(()=>{
        async function fetchData(){
          const inventories = await ApiHelper.inventoryGetAll();
          setInventoryList(inventories);
        }
        fetchData();
        setIsLoading(false);
        
    }, [])

    if (isLoading){
        return (<p>Loading... </p>)
    }
    return (
        <Container className="InventoryList">
            <h1>Inventory List</h1>
            <h3>Pick a template to create a new inventory</h3>
            {/* Inventory List */}
            {inventoryList.map(inventory=><InventoryCard key={inventory.id} id={inventory.id} title={inventory.title} date={inventory.inventoryDate} complete={inventory.completeFlag} template={inventory.templatedBy} user={inventory.inventoryBy}/>)}
        </Container>
    )
}

export default InventoryList;