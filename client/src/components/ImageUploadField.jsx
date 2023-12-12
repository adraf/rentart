import axios from 'axios'

export default function ImageUploadField({ userData, setUserData, placeholderImg }) {
  async function updateUserImage(secure_url) {
    try {
      const res = await axios.put('/api/profile', { profileImage: secure_url }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
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
    
    updateUserImage(secure_url)
  }

  return (
    <>
        <img src={userData.profileImage || placeholderImg} className='profile-pic-preview' alt='Profile-Pic'/>
        <input type='file' className='imgUploadButton' name='profileImage' onChange={handleImageUpload} />
    </>
  )
}