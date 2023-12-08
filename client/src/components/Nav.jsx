import { Link, useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function Nav({ userData, setUserData }){
  // console.log(userData)
  const navigate = useNavigate()

  function logOut(){
    localStorage.clear()
    setUserData('')
    navigate('/')
  }

  return (
    <header>
      <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/gallery'><button>Gallery</button></Link>
        <Link to='/about'><button>About us</button></Link>
        <Link to='/collection/'><button>Collection</button></Link>
        {!userData[0] ? (
          <>
            <Link to='/login/'><button>Login</button></Link>
            <Link to='/register'><button>Register</button></Link>
          </>
        ) : (
          <>
            <Link to={`/profile/${userData[0]}`}><button>Profile</button></Link>
            <button onClick={logOut}>Log Out</button>
          </>
        )}
      </nav>
      <section className="welcome">
        <p>Welcome {!userData[1] ? 'visitor' : userData[1]}</p>
      </section>
    </header>
  )
}