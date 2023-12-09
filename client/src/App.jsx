import { useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'

// components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { Spinner } from 'react-bootstrap'

export default function App() {

  const [ userData, setUserData ] = useState([])
  const navigation = useNavigation()

  return (
    <>
      <Nav userData={userData} setUserData={setUserData} />
      <main>
      {
      navigation.state === 'idle' ?
      <Outlet context={[userData, setUserData]} />
      :
      <div className='centered'>
        <Spinner animation='border' />
      </div>
      }
      </main>
      {/* <Footer /> */}
    </>
  )
}