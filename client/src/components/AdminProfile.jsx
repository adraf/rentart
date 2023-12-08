import { useState } from "react"

export default function AdminProfile(){

  const [searchData, setSearchData] = useState('')

  async function search(e){
    e.preventDefault()
    const inputValue = e.target.elements.searchInput.value
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profilepic" />
      </div>
      <div className="profile-body admin-body">
        <form onSubmit={search} className="admin-search">
          <input type="text" placeholder="Search by username, name of artwork" className="admin-search" />
          {
          !searchData
          ?
          <h2 className="negative-results">No results...</h2>
          :
          searchData.map(result => {
            <section className="admin-result">
              <p>placeholder</p>
            </section>
          })
          }
        </form>
        <div className="admin-results"></div>
      </div>
    </section>
  )
}