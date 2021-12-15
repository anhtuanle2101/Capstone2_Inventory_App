import React, {useEffect, useState} from "react";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SignOut = ({ signOut })=>{
    const [isLoggingOut, setIsLoggingOut] = useState(true);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const signOutFunc = async()=>{
            await signOut();
        }
        signOutFunc();
        setIsLoggingOut(false);
        navigate("/");
    }, [isLoggingOut])
    
    if (isLoggingOut)
        return (
            <Container>Signing out..</Container>
        );
    else{
        return (
            <Container>Already signed out</Container>
        )
        
    }
}

export default SignOut;