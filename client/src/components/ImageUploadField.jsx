import axios from 'axios'

export default function ImageUploadField({ formData, setFormData }) {

  async function handleImageUpload(e) {
    const preset = import.meta.env.VITE_UPLOAD_PRESET
    const file = e.target.files[0]
    const endPoint = import.meta.env.VITE_UPLOAD_URL

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)

    const { data: { secure_url }} = await axios.post(endPoint, data)

    setFormData({...formData, profileImage: secure_url })
  }

  return (
    <>
      {formData.profileImage ?
        <img src={formData.profileImage} alt="Profile-Pic" />
        :
        <input type='file' name='profileImage' onChange={handleImageUpload} />
      }
    </>
  )
}