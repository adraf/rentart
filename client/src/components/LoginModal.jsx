import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function OpenLoginModal() {
  const [show, setShow] = useState(false)
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function swapModals() {
    handleClose()
    OpenRegisterModal()
  }

  // function OpenRegisterModal() {
  //   const [show, setShow] = useState(false)
  //   const handleRegisterClose = () => setShow(false)
  //   // const handleRegisterShow = () => setShow(true)

  //   return (
  //     <>
  //       <Modal className='registerModal' show={show} onHide={handleRegisterClose}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Join the Art Rental Community!</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form>
  //             <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
  //               <Form.Label hidden>First & Last Name</Form.Label>
  //               <Form.Control 
  //               type='name'
  //               placeholder='First & Last Name'
  //               autoFocus
  //               />
  //             </Form.Group>
  //             <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
  //               <Form.Label hidden>Address</Form.Label>
  //               <Form.Control 
  //               type='address'
  //               placeholder='Address'
  //               />
  //             </Form.Group>
  //             <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
  //               <Form.Label hidden>Username</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 placeholder="Username"
  //               />
  //             </Form.Group>
  //             <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
  //               <Form.Label hidden>Password</Form.Label>
  //               <Form.Control 
  //               type='password'
  //               placeholder='Password'
  //               />
  //             </Form.Group>
  //             <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
  //               <Form.Label hidden>Confirm Password</Form.Label>
  //               <Form.Control 
  //               type='password'
  //               placeholder='Confirm Password'
  //               />
  //             </Form.Group>
  //           </Form>
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="outline-secondary" onClick={handleRegisterClose}>
  //             Close
  //           </Button>
  //           <Button variant="primary" onClick={handleRegisterClose}>
  //             Join
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </>
  //   )
  // }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch Login Modal
      </Button>


      <Modal className='loginModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
              <Form.Label hidden>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Username"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginForm.ControlTextarea1">
              <Form.Label hidden>Password</Form.Label>
              <Form.Control 
              type='password'
              placeholder='Password'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onHide={swapModals}>
            Register Account
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
