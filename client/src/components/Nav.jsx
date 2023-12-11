import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

// eslint-disable-next-line react/prop-types
export default function Nav({ userData }){

  // Session data


  useEffect(() => {
    //console.log('userData:', userData);
  }, [userData]);

  const navigate = useNavigate()

  function logOut(){
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <header>
      <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/gallery'><button>Gallery</button></Link>
        <Link to='/about'><button>About us</button></Link>
        {!userData.username ? (
          <>
            <Link to='/login/'><button>Login</button></Link>
            <Link to='/register'><button>Register</button></Link>
          </>
        ) : (
          <>

            {userData.usertype === 1 && <Link to={'/collection/'}><button>Collection</button></Link>}
            <Link to={`/profile/`}><button>Profile</button></Link>
            <button onClick={logOut}>Log Out</button>
          </>
        )}
      </nav>
      <section className="welcome">
        <p>Welcome {!userData.username ? 'visitor' : userData.username}</p>
      </section>
    </header>
  )
}