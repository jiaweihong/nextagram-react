import React, {useEffect, useState}from "react";
import axios from "axios"
import LoadingIndicator from "./LoadingIndicator"
import { useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import UploadButton from "./UploadButton"

function MyProfilePage() {

    const [profileUsername, setProfileUsername] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [userImages, setUserImages] = useState([])
    const [isProfileDataLoading, setProfileDataLoading] = useState(true)
    const [isUserImagesLoading, setUserImagesLoading] = useState(true)

    let history = useHistory()
    
    useEffect(()=> {
        if(localStorage.jwt){
            //to get me my user info
            axios({
                method: "GET",
                url: "https://insta.nextacademy.com/api/v1/users/me",
                headers: {
                    Authorization: `Bearer ${localStorage.jwt}`
                }
            })
            .then(response => {
                console.log(response.data)
                setProfileUsername(response.data.username)
                setProfileImage(response.data.profile_picture)
                setProfileDataLoading(false)
            })
            .catch(error => {
                console.log(error)
            })

            // to get me my images
            axios({
                method: "GET",
                url: "https://insta.nextacademy.com/api/v1/images/me",
                headers: {
                    Authorization: `Bearer ${localStorage.jwt}`
                }
            })
            .then(response => {
                console.log(response.data)
                setUserImages(response.data)
                setUserImagesLoading(false)
            
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            history.push('/')
            toast('💩 You do not have access to this page', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              });
        }
    }, [])

    if (isProfileDataLoading) {
        return <LoadingIndicator/>
    }

    if (isUserImagesLoading) {
        return <LoadingIndicator/>
    }


    return (
        <>
            <h1 style={{textAlign: "center"}}>{profileUsername}</h1>
            <img src = {profileImage} className = "profile-avatar"></img>
            <UploadButton/>
            <div>
                {
                    userImages.map((userImage)=>{ return (
                        <>
                            <img src={userImage} style = {{width : "200px", height : "200px"}}></img>
                        </>
                    )})
                }
            </div>
        </>
    )
}

export default MyProfilePage