import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from 'react'

import ArtistProfile from "./ArtistProfile"
import AppreciatorProfile from "./AppreciatorProfile"
import AdminProfile from "./AdminProfile"
import ImageUploadField from './ImageUploadField'

export default function Profile(){
  // State
  const data = useOutletContext()
  const [ userData, setUserData ] = data

  // image uploader
  // const [ formData, setFormData ] = useState({profileImage: ''})
  // function handleChange(e) {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // User type variable to render appropriate component
  const type = localStorage.getItem('usertype')
  // navigation
  const navigate = useNavigate()



  return (
    <>
      {!type 
      ? navigate('/')
      : type === '1' ? <ArtistProfile userData={userData} setUserData={setUserData} />
      : type === '2' ? <AppreciatorProfile />
      : type === '0' && <AdminProfile />
      }
      {/* <form onSubmit={e => e.preventDefault()}>
        <ImageUploadField setFormData={setFormData} formData={formData}/>
        <input type="submit" value="Add Profile Picture" onSubmit={handleChange} />
      </form> */}
    </>
  )
}