import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"

export default function ArtistProfile({ userData }){

  return (
    <section className="profile">
      {/* <div className="profile-header">
        <div className="artistcollection">Your Art Collection</div> */}
      <ImageUploadSection />
      {/* </div> */}
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