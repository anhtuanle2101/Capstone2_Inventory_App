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
                    <NavLink to="/signin">Sign In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </Container>
            ):(
                <Container>
                    <NavLink to="/items">Items</NavLink>
                    <NavLink to="/templates">Template</NavLink>
                    <NavLink to="/inventories">Inventory</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/signout">Sign out {currentUser.username}</NavLink>
                </Container>
                
            )}  
        </nav>
    )
}

export default Nav;