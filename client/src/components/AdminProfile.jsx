import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function AdminProfile({ userData, setUserData }){

  const [searchData, setSearchData] = useState('')

  async function search(e){
    try {
      e.preventDefault()
      //stopping default behavior of form
      const inputValue = e.target.elements.searchField.value
      // Regular expression from input
      const pattern = new RegExp(inputValue, 'i')
      // Getting All art data and filtering it
      const res = await axios.get('/api/art')
      const rawArtData = res.data
      const parsedArtData = rawArtData.filter(piece => pattern.test(piece.artName))
      // Getting All user data and filtering it
      const response = await axios.get('/api/profile/all', { headers: { Authorization: `Bearer ${ userData.token }` } })
      const rawUserData = response.data
      const parsedUserData = rawUserData.filter(user => pattern.test(user.username))
      setSearchData({ userData: parsedUserData, artData: parsedArtData })
      console.log(searchData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <section className="profile">
      <div className="profile-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body admin-body">
        <form onSubmit={search} className="admin-search">
          <input type="text" name="searchField" placeholder="Search by username, name of artwork" className="admin-search" />
        </form>
        {
          !searchData
          ?
          <h2 className="negative-results">No results...</h2>
          :
          <section className="admin-result">
            <section className="user-results">
              {searchData && searchData.userData.map(user => (
                <section className="single-user-result" key={user._id}>
                  {
                  !user.profileImage
                  ?
                  <img className="search-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                  :
                  <img className="search-image" src={user.profileImage} alt="" />
                  }
                  <div className="text-data">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address}</p>
                    <p>Payment Details: {user.paymentDetails}</p>
                  </div>
                </section>
              ))}
            </section>
            <section className="art-results">
              {searchData && searchData.artData.map(art => (
                <Link to={`/art/${art._id}`} key={art._id}>
                  <section className="single-art-result" >
                    <img className="search-image" src={art.artImage} alt="" />
                    <div className="text-data">
                      <p>Artist: {art.artist}</p>
                      <p>Name: {art.artName}</p>
                      <p>Year: {art.year}</p>
                      <p>Movement: {art.movement}</p>
                    </div>
                  </section>
                </Link>
              ))}
            </section>
          </section>
        }
      </div>
    </section>
  )
}