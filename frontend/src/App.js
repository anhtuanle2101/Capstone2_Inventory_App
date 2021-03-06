import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import ApiHelper from "./apiHelper";
import './App.css';
import currentUserContext from "./currentUserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavTab from "./Nav";
import Home from "./Home";
import NotFound from "./NotFound";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SignOut from "./SignOut";
import TemplateList from "./TemplateList";
import TemplateDetails from "./TemplateDetails";
import InventoryList from "./InventoryList";
import Profile from "./Profile";
import ItemList from "./ItemList";
import InventoryForm from "./InventoryForm";


function App() {

  const [token, setToken, setTokenToLocalStorage, getTokenFromLocalStorage] = useLocalStorage("token");
  const [currentUser, setCurrentUser, setUserToLocalStorage, getUserFromLocalStorage] = useLocalStorage("user");
  const [isAdmin, setIsAdmin, setIsAdminToLocalStorage, getIsAdminFromLocalStorage] = useLocalStorage("isAdmin");

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
    setUserToLocalStorage(username);
    setToken(token);
    setTokenToLocalStorage(token);
  }

  // signOut function which log out the currentUser and clears the localStorage;
  const signOut = async ()=>{
    setToken();
    setCurrentUser();
    setIsAdmin();
    ApiHelper.token = undefined;
    await localStorage.clear();
  }

  // getUser function which get user information from the database with provided username
  const getUser = async ()=>{
    const userDetails = await ApiHelper.userGet(currentUser);
    return userDetails;
  }

  // updateUser function which update user information with new changes
  const updateUser = async ({ firstName, lastName, email, password })=>{
    // validating the provided password
    const token = await ApiHelper.userSignIn({ username: currentUser, password });
    if (!token){
      return;
    }else{
      const userDetails = await ApiHelper.userUpdate({ username: currentUser, firstName, lastName, email });
      return userDetails;
    }
  }

  // getTemplate function which get template information from the db with provided id
  const getTemplate = async (id)=>{
    const templateDetails = await ApiHelper.templateGet(id);
    return templateDetails;
  }

  // create Inventory function which will create new inventory with provided info
  const createInventory = async (data)=>{
    const inventoryDetails = await ApiHelper.inventoryCreate(data);
    return inventoryDetails;
  }

  // getInventory function which get the inventory information from the db with provided id
  const getInventory = async (id)=>{
    const inventoryDetails = await ApiHelper.inventoryGet(id);
    return inventoryDetails;
  }

  // updateInventory function which update the inventory information with changes
  const updateInventory = async (id, itemList)=>{
    const res = await ApiHelper.inventoryUpdate(id, itemList);
    return res;
  }


  useEffect(()=>{
    getTokenFromLocalStorage();
    getUserFromLocalStorage();
    getIsAdminFromLocalStorage();
    ApiHelper.token = token;
  })


  return (
    <div className="App">
      <currentUserContext.Provider value={{currentUser, isAdmin}}>
        <BrowserRouter>
          <NavTab />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignInForm signIn={signIn}/>}/>
            <Route path="/signup" element={<SignUpForm signUp={signUp} signIn={signIn}/>}/>
            <Route path="/signout" element={<SignOut signOut={signOut}/>}/>
            <Route path="/templates">
              <Route path="" element={<TemplateList />}></Route>
              <Route path=":id" element={<TemplateDetails getTemplate={getTemplate} createInventory={createInventory}/>}></Route>
            </Route>
            <Route path="/inventories">
              <Route path="" element={<InventoryList />}></Route>
              <Route path=":id" element={<InventoryForm getInventory={getInventory} updateInventory={updateInventory}/>}></Route>
            </Route>
            <Route path="/items">
              <Route path="" element={<ItemList />}></Route>
            </Route>
            <Route path="/profile" element={<Profile getUser={getUser} updateUser={updateUser} />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
