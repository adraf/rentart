// import { Link } from 'react-router-dom'
import axios from "axios"
import { useLoaderData, useOutletContext } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//! only user who uploaded can change art

export default function IndArtPage() {
  const data = useOutletContext()
  const [ userData ] = data
  const indArt = useLoaderData()

  const { 
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
    price,
    _id,
    availability } = indArt

    async function getRented(){
      try {
        const res = await axios.put(`/art/${_id}`, { availability: false }, {
          validateStatus: () => true,
        })
        console.log(_id)
        indArt.availability = false
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
            <Row>£{price}</Row>
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