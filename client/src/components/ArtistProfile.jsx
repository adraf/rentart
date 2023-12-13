import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"
// import ArtworkUploadSection from "./ArtistWorkUploadDiv"

export default function ArtistProfile({ userData }){

  return (
    <section className="profile">
      <ImageUploadSection />
      {/* <ArtworkUploadSection /> */}
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