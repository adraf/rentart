/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import Logo from '../images/rentartLogo.png';

// eslint-disable-next-line react/prop-types
export default function Nav({ userData, setUserData }) {

  // Session data

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
          <Link to='/'><img src={Logo} style={{ height: '75px' }} alt='Home'/></Link>
        </div>
        <div className="nav-Link">
          <Link to='/gallery'><button className='nav-button'>Gallery</button></Link>
          {!userData.username ? (
            <>
              <Link to='/login/'><button className='nav-button'>Login</button></Link>
              <Link to='/register'><button className='nav-button'>Register</button></Link>
            </>
          ) : (
            <>
              {userData.usertype === 1 && <Link to={'/collection/'}><button className='nav-button'>Collection</button></Link>}
              <Link to={`/profile/`}><button className='nav-button'>Profile</button></Link>
              <button className='nav-button' onClick={logOut}>Log Out</button>
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