// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function IndArtPage() {

  // useState
  const [ indArt, setIndArt ] = useState([])

  // useEffect
  useEffect(() => {
    async function getIndividualArt() {
      try {
        // commented out example artId
        // const res = await axios.get(`api/art/65718b5331a5c52e589639ea`)
        const res = await axios.get(`api/art/${artId}`)
        setIndArt(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getIndividualArt()
  }, [])
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
    price } = indArt

  return (
    <main>
      <Container className='indArtContainer' fluid={true}>
        <Row className='indArtSection'>
          <Col className='indArtImageColumn' sm={5}><img src={artImage} alt={artName}/></Col>
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
            <Row>£{price}</Row>
          </Col>
        </Row>
      </Container>
    </main>
  )
}