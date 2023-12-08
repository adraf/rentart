

export default function AdminProfile(){
  return (
    <section className="profile">
      <div className="profile-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body">
        <input type="text" className="admin-search"/>
        <div className="admin-results"></div>
      </div>
    </section>
  )
}