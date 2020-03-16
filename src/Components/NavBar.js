import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import ModalForm from "../Container/ModalForm";
import { toast } from 'react-toastify';
import { Link, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom'


function NavBar() { 
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('jwt')) // A string returns a truthy value and if it is empty it returns undefined which is falsy

  let history = useHistory()

  const signOutButton = () => {
    setLoggedIn(false)
    localStorage.removeItem("jwt")
    history.push('/') // this will move me to the homepage when I log out
    toast('🦄 Sign out is Succesful!!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }


  return(
    <Navbar className = "navbar" light expand="md">
    <NavbarBrand id= "navbarBrand" href="/">Nextagram</NavbarBrand>
    <Nav className="mr-auto" navbar>
      <NavItem>
        <NavLink href="#">Users</NavLink>
      </NavItem>
      <NavItem>
        {
          isLoggedIn ?
          (
            <>
              <button onClick={signOutButton}>Sign Out</button>
              <Link to = "/profile">My Profile</Link>
            </>
          )
          :
          (
            <ModalForm logIn = {setLoggedIn}/> //logIn is a key which gives me access to my value which is a function being "setLoggedIn" I then pass it down to modalForm as a prop which i can then acces the function by doing props.logIn
          )
        }
      </NavItem>
    </Nav>
    <InputGroup>
      <Input placeholder="type username" />
      <Button outline color="dark">Search</Button>
    </InputGroup>
  </Navbar>
  )
}



export default NavBar