import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect } from "react"

import ArtistProfile from "./ArtistProfile"
import AppreciatorProfile from "./AppreciatorProfile"
import AdminProfile from "./AdminProfile"
import ImageUploadField from './ImageUploadField'

export default function Profile(){
  // State
  const data = useOutletContext()
  const [ userData ] = data

  // image uploader
  // const [ formData, setFormData ] = useState({profileImage: ''})
  // function handleChange(e) {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // User type variable to render appropriate component
  const type = userData.usertype
  console.log(type)
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
      {/* <form onSubmit={e => e.preventDefault()}>
        <ImageUploadField setFormData={setFormData} formData={formData}/>
        <input type="submit" value="Add Profile Picture" onSubmit={handleChange} />
      </form> */}
    </>
  )
}