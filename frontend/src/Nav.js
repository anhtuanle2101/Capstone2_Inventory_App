import { NavLink } from "react-router-dom";
import React, {useContext} from "react";
import "./Nav.css";
import { Container } from "reactstrap";
import currentUserContext from "./currentUserContext";

const Nav = ()=>{
    const { currentUser } = useContext(currentUserContext);
    
    return (
        <nav className="Nav">
            <h2><NavLink to="/">Inventory App</NavLink></h2>
            {!currentUser?(
                <Container>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </Container>
            ):(
                <Container>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/logout">Log out {currentUser.username}</NavLink>
                </Container>
                
            )}  
        </nav>
    )
}

export default Nav;