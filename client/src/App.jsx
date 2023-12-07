//import { useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { useState } from 'react'

// components
import Nav from './components/Nav'

import { Spinner } from 'react-bootstrap'

export default function App() {

  const [ userData, setUserData ] = useState([])
  console.log(setUserData)
  const navigation = useNavigation()

  return (
    <>
      <Nav userData={userData} />
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
    </>
  )
}