import "./Profile.css"

import { requestConfig, uploads } from "../../utils/config"
import {api} from '../../utils/config'
//components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import { BsFillEyeFill, BsPencilFill, BsXlg } from "react-icons/bs"

//Hooks
import {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

//redux
import { getUserDetails } from "../../slices/userSlice"


const Profile = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const {user, loading} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)
    
    //Photo


    //Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
    }, [dispatch, id])

    //const qrCode = async(data, token) => {

      //  const config = requestConfig("GET", data, token)

        //try {
          //  const res = await fetch(qr + api + "/users/" + id, config)
            //return res
        //} catch (error) {
            
        //}

    //}

    if(loading){
        return <p>Carregando...</p>
    }
  return (
    <div id="profile">
        <div className="profile-header">
            {user.profileImage && (
                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
            )}
            <div className="profile-description">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
                <img src={qrCode}/>
            </div>
        </div>
    </div>
  )
}

export default Profile