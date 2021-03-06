import React, {useContext} from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import currentUserContext from "./currentUserContext";
import "./Home.css";

const Home = ()=>{
    const {currentUser} = useContext(currentUserContext);
    return (
        <div className="Home">
            <Container>
                <h1>Inventory App</h1>
                <p>Ease at inventory tasks</p>
                {!currentUser?(
                    <Container>
                        <Link to="/signin"><Button color="primary">Sign In</Button></Link>
                        <Link to="/signup"><Button color="primary">Sign Up</Button></Link>
                    </Container>
                ):(
                    <Container>
                        Welcome back, {currentUser}!
                    </Container>
                )}
            </Container>
            
        </div>
    )
}

export default Home;