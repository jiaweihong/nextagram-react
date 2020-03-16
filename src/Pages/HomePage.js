import React, {useState, useEffect} from 'react';
import axios from "axios"
import ExtraImg from "../Container/ExtraImg"
import LoadingIndicator from "../Components/LoadingIndicator"
import { Link, Route } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] =useState(true)
  
  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      console.log (result.data)
      setUsers(result.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [])

  if (isLoading){
    return (<LoadingIndicator/>)
  }


  return (
    <div className = "grid-container">
      {
        users.map((user, index) => { return(
          <>
            <div>
            <Link to={`/users/${user.id}`} className ="profile-username">{user.username}</Link>
            <img src = {user.profileImage} className = "profile-avatar"></img>
            </div>
            <div>
              <ExtraImg userID={user.id}/>
            </div>
          </>
        )})
      }
    </div>
  );
}



export default HomePage