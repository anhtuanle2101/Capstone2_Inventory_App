import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./InventoryForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryForm = ({ getInventory, updateInventory })=>{
    const INITAL = { itemList:[] }
    const [ formData, setFormData ] = useState(INITAL);
    const { currentUser } = useContext(currentUserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { itemList } = formData;
        await updateInventory(id, itemList);
        setFormData( data=>({...data, itemList }));
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const { itemList } = formData;
        for( let e of itemList ){
            if (e.name === name) e.quantity = value; 
        }
        setFormData(data=>({...data, itemList}));
    }

    useEffect(()=>{
        if (!currentUser) navigate("/");
        async function fetchData(){
            const data = await getInventory(id);
            setFormData(data);
        }
        fetchData();
    }, [])

    return (
        <Container className="InventoryForm">
            <h1>Inventory Form</h1>
        
            <Container>
                <p>Title: {formData.title}</p>
                <p>Inventory Date: {(new Date(formData.inventoryDate)).toLocaleString()}</p>
                <p>Inventory By User ID: {formData.inventoryBy}</p>
                <p>Templated By Template ID: {formData.templatedBy}</p>
            </Container>
            <Container>
                <h5>Inventory</h5>
                <form>
                    {formData.itemList.map(item=><Container key={item.id}><label htmlFor={item.name}>{item.name} qty: </label><input id={item.name} name={item.name} value={item.quantity} placeholder={item.name} onChange={handleChange}></input></Container>)}
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </form>
            </Container>
                
            
        </Container>
    )
}

export default InventoryForm;