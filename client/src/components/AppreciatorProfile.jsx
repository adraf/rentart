import { getIndArt } from "../utils/loaders/artLoader"
import { useState, useEffect } from "react"
 // Image Uploader Import
import ImageUploadField from './ImageUploadField'

export default function AppreciatorProfile({ userData }){

  // Image Uploader
  const placeholderImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  const [ formData, setFormData ] = useState({ profileImage: placeholderImg })
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [ favourites, setFavourites ] = useState([])
  const [ rented, setRented ] = useState([])
  console.log(typeof(userData.favourites[0]))
  useEffect(() => {
    //Building arrays to render
    async function getFaves(){
      try {
        const rawData = userData.favourites.map(art => {
          
          getIndArt(art)
        })
        const resolved = await Promise.all(rawData)
        console.log(resolved)
        setFavourites(resolved)
      } catch (error) {
        console.log(error)
      }
    }
    async function getRents(){
      try {
        const rawData = userData.rented.map(art => getIndArt(art))
        const resolved = await Promise.all(rawData)
        setRented(resolved)
        
      } catch (error) {
        console.log(error)
      }
    }
    getFaves()
    getRents()
  }, [])

  return (
    <section className="profile">
      {/* <div className="profile-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div> */}
      {/* Image Upload Div */}
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <ImageUploadField formData={formData} setFormData={setFormData}/>
          <input type="submit" value="Add Profile Picture" onSubmit={handleChange} />
        </form>
      </div>
      <img src={formData.profileImage} alt="" className="profilepic" />
      <div className="profile-body appr-body">
        <div className="body-instance current-items">
          <h2>Favourites</h2>
          {favourites && userData.favourites.length > 0
            ?
            favourites.map((art, i) => {
              return (
              <div className="art-item" key={userData.favourites[i]}>
                {/* name: {art.name} */}
              </div>
              )
            })
            : 
          <h2>You have no artwork yet!</h2>
          }
          <h2>Currently in posession</h2>
          {favourites && userData.rented.length > 0
          ? 
          userData.rented.map((art, i) => {
            return (
            <div className="art-item" key={userData.rented[i]}>
              name: {art.name}
            </div>
            )
          })
          : 
          <h2>You have no artwork yet!</h2>
          }
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