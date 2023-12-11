import { Outlet, useNavigation } from 'react-router-dom'

// components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { Spinner } from 'react-bootstrap'
import { useEffect } from 'react'

export default function App() {
  let stage = JSON.parse(sessionStorage.getItem('data'))
  let userData = stage || ''
  const navigation = useNavigation()

  
  function setUserData(){
    userData = JSON.parse(sessionStorage.getItem('data'))
  }

  return (
    <>
      <Nav userData={userData}/>
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
      <Footer />
    </>
  )
}