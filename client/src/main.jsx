import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import App from './App.jsx'
import ArtCarousel from './components/Carousel.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import Login from './components/Login.jsx'
import ArtIndex from './components/ArtIndex.jsx'
import IndArtPage from './components/IndArtPage.jsx'
import Profile from './components/Profile.jsx'
import About from './components/About.jsx'
import IndUserPage from './components/PublicProfile.jsx'
import ArtworkUploadSection from './components/ArtistWorkUploadDiv.jsx'

// Loader
import { getIndArt } from './utils/loaders/artLoader.js'
import { getIndUser } from './utils/loaders/userLoader.js'


//! Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ArtCarousel />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <RegisterUser />,
      },{
        path: '/about',
        element: <About />,
      },
      {
        path: '/gallery',
        element: <ArtIndex />,
        // loader: getUser
      },
      {
        path: '/collection',
        element: <ArtworkUploadSection />,
      },
      {
        path: '/art/:artId',
        element: <IndArtPage />,
        loader: async ({ params }) => getIndArt(params.artId)
      },
      {
        path: '/profile/:userId',
        element: <IndUserPage />,
        loader: async ({ params }) => getIndUser(params.userId)
      },
      {
        path: '/profile',
        element: <Profile />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
