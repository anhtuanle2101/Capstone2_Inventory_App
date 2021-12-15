import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap";
import SignInForm from "./SignInForm";
import "./SignUpForm.css"

const SignUpForm = ({ signUp, signIn })=>{
    const INIT_DATA = {username: "", password: "", firstName: "", lastName: "", email: ""};
    const [formData, setFormData] = useState(INIT_DATA);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { username, password, firstName, lastName, email} = formData;
        await signUp({ username, password, firstName, lastName, email });
        await signIn({ username, password });
        navigate("/");
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }
    return (
        <Container className="SignUpForm">
            <h1>Sign Up Form</h1>
            <form>
                <Container>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                </Container>
                
                <Container><label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                /></Container>
                <Container><label htmlFor="firstName">First Name: </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                /></Container>
                <Container><label htmlFor="lastName">Last Name: </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                /></Container>
                <Container><label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                /></Container>
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
        </Container>
    )
}

export default SignUpForm;