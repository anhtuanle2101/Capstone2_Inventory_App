import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import ItemCard from "./ItemCard";
// Api helper
import ApiHelper from "./apiHelper";

const ItemList = ()=>{
    const INIT_DATA = { "searchTerm" : "" };

    const [ itemList, setItemList ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [formData, setFormData] = useState(INIT_DATA);
    

    useEffect(()=>{
        async function fetchData(){
          const items = await ApiHelper.itemGetAll();
          setItemList(items);
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
            <h1>Item List</h1>
            {/* Search Box */}
            {/* <form>
                <input type="search" placeholder="Enter search term" id="searchTerm" name="searchTerm" onChange={handleChange}/>
                <Button onClick={handleSubmit}>Search</Button>
            </form> */}
            {/* Inventory List */}
            {itemList.map(item=><ItemCard key={item.id} id={item.id} name={item.name} unit={item.unit} description={item.description} department={item.department}/>)}
        </Container>
    )
}

export default ItemList;