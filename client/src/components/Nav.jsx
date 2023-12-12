/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Logo from '../images/rentartLogo.png';

// eslint-disable-next-line react/prop-types
export default function Nav({ userData, setUserData }) {

  // Session data


  useEffect(() => {
    //console.log('userData:', userData);
  }, [userData]);

  const navigate = useNavigate()

  function logOut() {
    localStorage.clear()
    sessionStorage.clear()
    setUserData('')
    navigate('/')
  }

  return (
    <header>
      <nav>
        <div className="home-link">
          <Link to='/'><img src={Logo} style={{ height: '75px' }} /></Link>
        </div>
        <div className="nav-Link">
          <Link to='/gallery'><button>Gallery</button></Link>
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
        </div>
      </nav>
      {!userData.username ? (
        <></>
      )
        : (
          <>
            <section className="welcome">
              <Link to={`/profile/${userData._id}`}>
                <p>Welcome {userData.username}</p>
              </Link>
            </section >
          </>)
      }
    </header >
  )
}