import './EditProfile.css'

import { uploads } from '../../utils/config'

//hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Redux
import {profile, resetMessage} from '../../slices/userSlice'
import { updateProfile } from '../../slices/userSlice'
//components
import Message from '../../components/Message'

const EditProfile = () => {

    const dispatch = useDispatch()

    const {user, message, error, loading} = useSelector((state) => state.user)

    //States
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[profileImage, setImageProfile] = useState("")
    const[bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    //Load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])


    //Fill form with user data
    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])


    const handleSubmit = async(e) => {
        e.preventDefault()

        //Gather user data from states
        const userData = {
            name,
        }

        if(profileImage){
            userData.profileImage = profileImage
        }

        if(bio){
            userData.bio = bio
        }

        if(password){
            userData.password = password
        }

        //buid form data
        const formData = new FormData()

        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

        formData.append("user", userFormData)

        await dispatch(updateProfile(FormData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = (e) => {
        //image preview

        const image = e.target.files[0]

        setPreviewImage(image)

        //update image state
        setImageProfile(image)
    }

  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className='subtitle' >Adicione uma imagem de perfil e conte mais sobre você...</p>
        {/* preview da imagem */}
        {(user.profileImage || previewImage) && (
            <img className='profile-image'
                src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`}
                alt={user.name}
            />
        )}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder='E-mail' disable value={email || ""}/>
            <label>
                <span>Imagem do Perfil</span>
                <input type="file" onChange={handleFile}/>
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do Perfil' onChange={(e) => setBio(e.target.value)} value={bio || ""}/>
            </label>
            <label>
                <span>Quer alterar senha?</span>
                <input type="password" placeholder='Digite sua nova Senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
            </label>
            {!loading && <input type="submit" value="Atualizar"/>}
            {loading && <input type="submit" value="Aguarde..." disabled/>}
            {error && <Message msg={error} type="error"/>}
            {message && <Message msg={message} type="sucess" />}
        </form>
    </div>
  )
}

export default EditProfile