/* eslint-disable react/prop-types */
import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"

export default function AppreciatorProfile({ userData }) {
  return (
    <section className="profile">
      <ImageUploadSection />
      <div className="profile-body appr-body">
        <div className="body-instance current-items">
          <h2>Favourites</h2>
          {userData.favourites.length > 0
            ?
            userData.favourites.map(artId => {
              return (
                <ArtListDiv key={artId} id={artId} />
              )
            })
            :
            <h2>You have no artwork yet!</h2>
          }
          <h2>Currently in posession</h2>
          {userData.rented.length > 0
            ?
            userData.rented.map((artId) => {
              return (
                <ArtListDiv key={artId} id={artId} />
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