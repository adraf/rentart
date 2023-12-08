import { useNavigate } from "react-router-dom"

export default function AppreciatorProfile({ userData, setUserData }){

  return (
    <section className="profile">
      <div className="profile-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body appr-body">
        <div className="body-instance current-items">
          <h2>Currently in posession</h2>
          {console.log(userData.rented)}
          {userData.rented > 0
          ? 
          userData.rented.map((art, i) => {
            <div className="art-item" key={i}></div>
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