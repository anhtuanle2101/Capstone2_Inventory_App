import React, {useEffect, useState} from "react";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SignOut = ({ signOut })=>{
    const [isLoggingOut, setIsLoggingOut] = useState(true);
    const navigate = useNavigate();
    
    useEffect(()=>{
        signOut();
        setIsLoggingOut(false);
        navigate("/");
    }, [isLoggingOut])
    
    if (isLoggingOut)
        return (
            <Container>Logging out..</Container>
        );
    else{
        return (
            <Container>Logged out</Container>
        )
        
    }
}

export default SignOut;