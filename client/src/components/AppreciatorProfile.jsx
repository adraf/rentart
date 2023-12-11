import ArtListDiv from "./ArtListDiv"

export default function AppreciatorProfile({ userData }){

  return (
    <section className="profile">
      <div className="profile-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body appr-body">
        <div className="body-instance current-items">
          <h2>Favourites</h2>
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
          <h2>Currently in posession</h2>
          {userData.rented.length > 0
          ? 
          userData.rented.map((art, i) => {
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
        <div className="body-instance details">
          <div><p>Name</p><button>edit</button></div>
          <div><p>Delivery Address</p><button>edit</button></div>
          <div><p>Payment Details</p><button>edit</button></div>
        </div>
      </div>
    </section>
  )
}