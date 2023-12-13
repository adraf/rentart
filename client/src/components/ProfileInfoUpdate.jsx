import { useRef } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

export default function ProfileInfoUpdate({ show, setShow, toChange, userData, setUserData }) {
  const inputRef = useRef(null)

  async function submitData(change) {
    try {
      console.log(userData.token)
      const res = await axios.put('/api/profile', change, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const change = { [toChange.toLowerCase()]: inputRef.current.value }
    setUserData({ ...userData, [toChange.toLowerCase()]: inputRef.current.value })
    submitData(change)
    setShow(false)
  }

  return (
    <Modal centered className='changeModal' show={show}>
        <form action="" onSubmit={handleSubmit}>
          <input className="changeInput" type="text" name={toChange} placeholder={`Input new ${toChange}`} ref={inputRef} />
          <input className="changeSubmit" type="submit" value="Ok" />
          <button className='exit' onClick={() => setShow(false)}>x</button>
        </form>
    </Modal>
  )
}
