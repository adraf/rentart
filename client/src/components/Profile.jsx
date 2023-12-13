import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect } from "react"

import ArtistProfile from "./ArtistProfile"
import AppreciatorProfile from "./AppreciatorProfile"
import AdminProfile from "./AdminProfile"

export default function Profile(){
  // State
  const data = useOutletContext()
  const [ userData ] = data

  // User type variable to render appropriate component
  const type = userData.usertype
  // console.log(type)
  // navigation
  const navigate = useNavigate()

  useEffect(() => {
    function getOut(){
      if (!userData.username){
        navigate("/")
      }
    }
    getOut()
  }, [])

  return (
    <>
      {type === (null || undefined)
      ? navigate('/')
      : type === 1 ? <ArtistProfile userData={userData} />
      : type === 2 ? <AppreciatorProfile userData={userData} />
      : type === 0 && <AdminProfile userData={userData} />
      }
    </>
  )
}