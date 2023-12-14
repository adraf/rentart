import { Outlet, useNavigation } from 'react-router-dom'

// components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function App() {
  let stage = sessionStorage.getItem('data')
  // let userData = stage || ''
  const [userData, setUserData] = useState(stage ? JSON.parse(stage) : '')
  const navigation = useNavigation()

  useEffect(() => {
    sessionStorage.setItem('data', JSON.stringify(userData))
  }, [userData])

  return (
    <>
      <Nav userData={userData} setUserData={setUserData}/>
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