import React, {useState, useEffect} from 'react';
import HomePage from "./Pages/HomePage"
import NavBar from "./Components/NavBar"
import './App.css';
import { Route, Link } from "react-router-dom"
import UserProfilePage from './Pages/UserProfilePage'
import { ToastContainer } from 'react-toastify';
import MyProfilePage from "./Components/MyProfilePage"

function App() { 
  return (
    <div>
      <NavBar/>
      <ToastContainer /> {/*"ToastContainer" is placed in App.js so that toast can be used across any component that loads just like the NavBar */}
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/profile" component={MyProfilePage}/>
      <Route exact path={`/users/:user_id`} component={UserProfilePage}/>
    </div>
  );
}

export default App;
