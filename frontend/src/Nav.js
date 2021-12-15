import { NavLink } from "react-router-dom";
import React, {useContext} from "react";
import "./Nav.css";
import { Nav, NavItem, Collapse, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import currentUserContext from "./currentUserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavTab = ()=>{
    const { currentUser } = useContext(currentUserContext);
    
    return (
        <nav className="Nav">
            <h2><NavLink to="/">Inventory App</NavLink></h2>
            {/* {!currentUser?(
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
                
            )}   */}
            <div>
            <div>
    <Navbar
        color="light"
        expand="md"
        fixed="top"
        light
    >
        <NavbarBrand href="/">
            Inventory App
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck(){}} />
        <Collapse navbar>
        <Nav
            className="me-auto"
            navbar
        >
            {!currentUser?(
                <>
                <NavItem>
                    <NavLink to="/signin">
                    Sign In
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/signup">
                    Sign Up
                    </NavLink>
                </NavItem>
                </>
            ):(
                <>
                    <NavItem>
                        <NavLink to="/items">
                            Item
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/templates">
                            Template
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/inventories">
                            Inventory
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/signout">
                            Sign Out
                        </NavLink>
                    </NavItem>
                </>
            )}
        </Nav>
        </Collapse>
    </Navbar>
</div>
</div>
        </nav>
    )
}

export default NavTab;