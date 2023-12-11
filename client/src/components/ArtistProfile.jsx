import ArtListDiv from "./ArtListDiv"


export default function ArtistProfile({ userData }){

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="artistcollection">Your Art Collection</div>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body art-body">
        <h2>Your Personal Artworks</h2>
        {userData.favourites.length > 0
            ?
            userData.favourites.map(art => {
              return (
                <>
                  <ArtListDiv key={art} id={art} />
                </>
              )
            })
            : 
          <h2>You have no artwork yet!</h2>
          }
      </div>
    </section>
  )
}