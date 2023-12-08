


export default function ArtistProfile({ userData, setUserData }){
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="artistcollection">Your Art Collection</div>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body">
        <h2>Your Rented Artworks</h2>
      </div>
    </section>
  )
}