import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
export default function ImageUploadField({ formData, setFormData }) {
  const [userData, setUserData] = useOutletContext()

  async function updateUserImage(secure_url) {
    try {
      const res = await axios.put('/api/profile', { profileImage: secure_url }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      localStorage.setItem('profileImage', JSON.stringify(res.data.profileImage))
      setUserData((prevUserData) => ({...prevUserData, profileImage: res.data.profileImage}))
      } catch (error) {
        console.log(error)
      }
    }


  
  async function handleImageUpload(e) {
    const preset = import.meta.env.VITE_UPLOAD_PRESET
    const file = e.target.files[0]
    const endPoint = import.meta.env.VITE_UPLOAD_URL

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)

    const { data: { secure_url }} = await axios.post(endPoint, data)
    console.log("secureURL =>", secure_url)
    setFormData({...formData, profileImage: secure_url })
    setUserData({...formData, profileImage: secure_url})
    updateUserImage(secure_url)
  }

  return (
    <>
      {formData.profileImage === 'placeholder' ?
        <img src={formData.profileImage} className='profile-pic-preview' alt='Profile-Pic'/>
        :
        <input type='file' name='profileImage' onChange={handleImageUpload} />
      }
    </>
  )
}