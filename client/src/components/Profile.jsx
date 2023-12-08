import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect } from "react"

import ArtistProfile from "./ArtistProfile"
import AppreciatorProfile from "./AppreciatorProfile"
import AdminProfile from "./AdminProfile"

export default function Profile(){
  // State
  const data = useOutletContext()
  const [ userData, setUserData ] = data
  // User type variable to render appropriate component
  const type = localStorage.getItem('usertype')
  // navigation
  const navigate = useNavigate()

  useEffect(() => {
    function getOut(){
      if (!userData.username){
        navigate("/")
      }
    }
    getOut()
  }, [ userData ])

  return (
    <>
      {!type 
      ? navigate('/')
      : type === '1' ? <ArtistProfile userData={userData} setUserData={setUserData} />
      : type === '2' ? <AppreciatorProfile userData={userData} setUserData={setUserData} />
      : type === '0' && <AdminProfile userData={userData} setUserData={setUserData} />
      }
    </>
  )
}