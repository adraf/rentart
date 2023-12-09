import ImageUploadField from './ImageUploadField'
import { useState } from 'react'

export default function AppreciatorProfile(){

  const placeholderImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  // Start of image upload, will complete when profile's are complete
  const [ formData, setFormData ] = useState({ profileImage: placeholderImg })
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value }) 
  }

  return (
    <section className="profile">
      <div className="profile-header">
        {/* Start of image upload, will complete when profile's are complete */}
        <div>
          <form onSubmit={e => e.preventDefault()}>
            <ImageUploadField formData={formData} setFormData={setFormData}/>
            <input type="submit" value="Add Profile Picture" onSubmit={handleChange} />
          </form>
        </div>
        <img src={formData.profileImage} alt="" className="profilepic" />

      </div>
      <div className="profile-body appr-body">
        <div className="body-instance current-items">
          <h2>Currently in posession</h2>
        </div>
        <div className="body-instance details">
          <div><p>Name</p><button>edit</button></div>
          <div><p>Delivery Address</p><button>edit</button></div>
          <div><p>Payment Details</p><button>edit</button></div>
        </div>
      </div>
    </section>
  )
}