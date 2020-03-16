import React, {useState, useEffect} from 'react';
import axios from "axios";
import LoadingIndicator from "../Components/LoadingIndicator"

function ExtraImg (props) {
    const {userID} = props
    const [imgs, setImgs] = useState([])
    const [isLoading, setLoading] =useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userID}`)
        .then(result => {
          console.log (result)
          setImgs(result.data)
          setLoading(false)
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
      }, [])
    
    if (isLoading){
      return (<LoadingIndicator/>)
    }

    return(
        imgs.map((img, index) => { return (
              <img  src = {img.url} style = {{width : "200px", height : "200px"}}></img>
            )
        })
    )
}

export default ExtraImg
