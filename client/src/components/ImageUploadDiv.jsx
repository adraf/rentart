
import ImageUploadField from './ImageUploadField.jsx'
import { useOutletContext } from 'react-router-dom'

export default function ImageUploadSection() {

  const [userData, setUserData] = useOutletContext()
  const placeholderImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'


  return (
    <div className='profileImageUploadSection'>
      <img src={userData.profileImage || placeholderImg} alt="profile picture" className="profilePic" /> 
      <form className='profileImageUploaderControls' onSubmit={e => e.preventDefault()}>
        <ImageUploadField userData={userData} setUserData={setUserData} /*placeholderImg={placeholderImg}*/ />
      </form>
    </div>
  )
}

