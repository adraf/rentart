import { Outlet, useNavigation } from 'react-router-dom'

// components
import Nav from './components/Nav'
import Footer from './components/Footer'

import { Spinner } from 'react-bootstrap'

export default function App() {

  const stage = JSON.parse(sessionStorage.getItem('data'))
  const userData = stage || '';
  const navigation = useNavigation()

  return (
    <>
      <Nav userData={userData}/>
      <main>
      {
      navigation.state === 'idle' ?
      <Outlet context={[userData]} />
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