// import { Link } from 'react-router-dom'
import axios from "axios"
import { useLoaderData } from 'react-router-dom';

// import { useLoaderData } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import axios from 'axios'
import { useState } from 'react'

export default function IndArtPage() {
//! STATES
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('data')))
  const [availableToRent, setavailableToRent] = useState(true)
  const indArt = useLoaderData()
  
  const {
    _id: artId,
    artImage,
    artName,
    artist,
    type,
    description,
    movement,
    media,
    year,
    width,
    height,
    availability,
    price } = indArt
    
    const isUserLoggedIn = userData && userData.token
    const isRentedByMe = isUserLoggedIn && Array.isArray(userData.rented) && userData.rented.includes(artId)
    console.log(userData)

  async function updateUserRented(newRentedList) {
    try {
      const userResponse = await axios.put('/api/profile', { rented: newRentedList }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      const newData = { ...userResponse.data, token: userData.token }
      sessionStorage.setItem('data', JSON.stringify(newData))
      setUserData(newData)

    } catch (error) {
      console.error(error)
    }
  }


  //! JSX
  return (
    <main>
      <Container className='indArtContainer' fluid={true}>
        <Row className='indArtSection'>
          <Col className='indArtImageColumn' sm={5}>
            <img src={artImage} alt={artName} className={width > height ? 'wideIndArt' : 'tallIndArt'}/>
            </Col>
          <Col className='indArtTextColumn'>
            <Row>
              <h2>{artName}</h2>
              <h4>{artist}, {year}</h4>
            </Row>
            <Row>{description}</Row>
            <Row>
              <Col>Type</Col>
              <Col>{type}</Col>
            </Row>
            <Row>
              <Col>Movement</Col>
              <Col>{movement}</Col>
            </Row>
            <Row>
              <Col>Media</Col>
              <Col>{media}</Col>
            </Row>
            <Row>
              <Col>Measurements</Col>
              <Col>{width} x {height}cm</Col>
            </Row>
            <Row>
              <Col>Price</Col>
              <Col>£{price}</Col>
            </Row>
            <Row>
              <Col></Col>
              <Col>
                <p
                  className='rent-button'
                  onClick={(e) => {
                    e.preventDefault()
                    if (isUserLoggedIn) {
                      const { rented } = userData
                      if (!isRentedByMe) {
                        const newRentedList = [...rented, artId]
                        console.log(newRentedList)
                        setavailableToRent(false)
                        updateUserRented(newRentedList, setUserData)
                      } else {
                        const newRentedList= rented.filter(value => value !== artId)
                        setavailableToRent(true)
                        updateUserRented(newRentedList, setUserData)
                      }
                    }
                  }}>
                  {(isUserLoggedIn && !isRentedByMe)? 'Click to Rent' : 'Not Available'}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  )
}