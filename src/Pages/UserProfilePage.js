import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"


const UserProfilePage = () => {
    let {user_id} = useParams()
    const [profileUsers, setProfileUsers] = useState("");
    const [profileImages, setProfileImages] = useState([])

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${user_id}`)
        .then(result => {
          console.log (result.data)
          setProfileUsers(result.data)
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
      }, [])

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${user_id}`)
        .then(result => {
          console.log (result.data)
          setProfileImages(result.data)
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
      }, [])

  return (
    <div>
    <h1>User Profile Page</h1>
    <h2>{profileUsers.username}</h2>
    <img src = {profileUsers.profileImage} style = {{width : "400px", height : "400px"}}></img>

    {
        profileImages.map((profileImage) =>{
            console.log(profileImage)
            return (
            <img  src = {profileImage} style = {{width : "200px", height : "200px", }}></img>
            )
        })
    }


    </div>
  )
}

export default UserProfilePage