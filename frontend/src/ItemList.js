import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import ItemCard from "./ItemCard";
// Api helper
import ApiHelper from "./apiHelper";
import 'bootstrap/dist/css/bootstrap.min.css';


const ItemList = ()=>{
    const INIT_DATA = { "searchTerm" : "" };

    const [ itemList, setItemList ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(()=>{
        async function fetchData(){
          const items = await ApiHelper.itemGetAll();
          setItemList(items);
        }
        fetchData();
        setIsLoading(false);
        
    }, [])

    if (isLoading){
        return (<p>Loading... </p>)
    }
    return (
        <Container className="InventoryList">
            <h1>Item List</h1>
            {/* Inventory List */}
            {itemList.map(item=><ItemCard key={item.id} id={item.id} name={item.name} unit={item.unit} description={item.description} department={item.department}/>)}
        </Container>
    )
}

export default ItemList;