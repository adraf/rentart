// import { Link } from 'react-router-dom'
import axios from "axios"
import { useLoaderData, useOutletContext } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'

export default function IndArtPage() {

  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('data')))
  const [availableToRent, setavailableToRent] = useState(true)
  const indArt = useLoaderData()

  const {
    _id,
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

  async function updateUserRented(newRentedList) {
    try {
      const res = await axios.put('/api/profile', { rented: newRentedList, availability: availableToRent }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      console.log(res.data)
      const newData = { ...res.data, token: userData.token }
      sessionStorage.setItem('data', JSON.stringify(newData))
      setUserData(newData)

      console.log(availableToRent)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main>
      <Container className='indArtContainer' fluid={true}>
        <Row className='indArtSection'>
          <Col className='indArtImageColumn' sm={5}><img src={artImage} alt={artName} /></Col>
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
                    const isUserLoggedIn = userData && userData.token
                    if (isUserLoggedIn) {
                      const { rented } = userData
                      if (availableToRent) {
                        const newRentedList = [...rented, _id]
                        setavailableToRent(false)
                        updateUserRented(newRentedList, setUserData)
                      } else {
                        const newRentedList= rented.filter(value => value !== _id)
                        setavailableToRent(true)
                        updateUserRented(newRentedList, setUserData)
                      }
                    }
                  }}>
                  {availableToRent? 'Click to Rent' : 'Not Available'}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className='centered'>
        {!userData
        ?
        <p>Log in to Rent Art!</p>
        :
        availability
        ?
        <button onClick={() => getRented()}>Rent</button>
        :
        <p>Not available at the moment!</p>
        }
      </div>
    </main>
  )
}