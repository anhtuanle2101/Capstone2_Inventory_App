import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import ApiHelper from "./apiHelper";
import './App.css';
import currentUserContext from "./currentUserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import NotFound from "./NotFound";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SignOut from "./SignOut";
import TemplateList from "./TemplateList";
import InventoryList from "./InventoryList";


function App() {

  const [token, setToken, setTokenToLocalStorage, getTokenFromLocalStorage] = useLocalStorage("token");
  const [currentUser, setCurrentUser, setUserToLocalStorage, getUserFromLocalStorage] = useLocalStorage("user");

  // signUp function which utilizes the ApiHelper userSignUp function
  // Sign Up parameters: { username, password, firstName, lastName, email }
  // Returns { token } 
  const signUp = async ({ username, password, firstName, lastName, email })=>{
    const result = await ApiHelper.userSignUp({ username, password, firstName, lastName, email });
    const { token } = result;
    setCurrentUser(username);
    setToken(token);
  }

  // signIn function which utilizes the ApiHelper userSignIn function
  // parameters: { username, password }
  // Returns { token } if authenticates
  const signIn = async ({ username, password })=>{
    const result = await ApiHelper.userSignIn({ username, password });
    const { token } = result;
    setCurrentUser(username);
    setToken(token);
    setUserToLocalStorage(username);
    setTokenToLocalStorage(token);
  }

  // signOut function which log out the currentUser and clears the localStorage;
  const signOut = async ()=>{
    setToken();
    setCurrentUser();
    ApiHelper.token = null;
    await localStorage.clear();
  }

  useEffect(()=>{
    getTokenFromLocalStorage();
    getUserFromLocalStorage();
  })

  return (
    <div className="App">
      <currentUserContext.Provider value={{currentUser}}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignInForm signIn={signIn}/>}/>
            <Route path="/signup" element={<SignUpForm signUp={signUp}/>}/>
            <Route path="/signout" element={<SignOut signOut={signOut}/>}/>
            <Route path="/templates">
              <Route path="" element={<TemplateList />}></Route>
            </Route>
            <Route path="/inventories">
              <Route path="" element={<InventoryList />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
