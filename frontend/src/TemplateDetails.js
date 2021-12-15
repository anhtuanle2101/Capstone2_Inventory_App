import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./TemplateDetails.css";
import ApiHelper from "./apiHelper";
import ItemCard from "./ItemCard";
import 'bootstrap/dist/css/bootstrap.min.css';

const TemplateDetails = ({ getTemplate, createInventory })=>{
    const INITIAL = { title: "" }
    const { currentUser } = useContext(currentUserContext);
    const [ templateDetails, setTemplateDetails ] = useState({name:"", description:"", createdAt:"", createdBy:"", itemList:[]});
    const [ formData, setFormData ] = useState(INITIAL);
    const [ isLoading, setIsLoading ] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { title } = formData;
        const user = await ApiHelper.userGet(currentUser);
        console.log(user);
        await createInventory({ title, templatedBy: id, inventoryBy: user.id});
        navigate("/inventories");
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }

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
                Template Item List;
                {templateDetails.itemList.map(item=><ItemCard key={item.id} id={item.id} name={item.name} unit={item.unit} description={item.description} department={item.department}/>)}
            </Container>
            <Container>
                <form>
                    <label htmlFor="title">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}/>
                    <Button onClick={handleSubmit}>Create a new Inventory</Button>
                </form>
            </Container>
        </Container>
    )
}

export default TemplateDetails;