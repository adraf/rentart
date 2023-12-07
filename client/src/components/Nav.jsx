import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Nav(){
  const [ userData, setUserData] = useState('')

  useEffect(() => {
    setUserData(localStorage.getItem('user'))
  }, [])


  return (
    <nav>
      <Link to='/gallery'><button>Gallery</button></Link>
      <Link to='/about'><button>About us</button></Link>
      <Link to='/collection/'><button>Collection</button></Link>
      {!userData ? (
        <>
          <Link to='/login/'><button>Login</button></Link>
          <Link to='/register'><button>Register</button></Link>
        </>
      ) : (
        <Link to={`/profile/${userData.id}`}><button>Profile</button></Link>
      )}
    </nav>
  )
}