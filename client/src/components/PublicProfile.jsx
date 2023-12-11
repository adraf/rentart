// import { Link } from 'react-router-dom'

import { useLoaderData } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function IndUserPage() {

  const user = useLoaderData()

  const {
    username,
    usertype,
    name,
    profileImage,
    favourites,
    rented,
    personal_collection } = user

    console.log(user.username)

  return (
    <main>
      <Container className='indArtContainer' fluid={true}>
        <Row className='indArtSection'>
          <Col className='indArtImageColumn' sm={5}><img src={profileImage} alt={username} /></Col>
          <Col className='indArtTextColumn'>
            <Row>
              <h2>Name: {name}</h2>
              <h4>Username: {username}, {usertype}</h4>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>Favourites:</Col>
              <Col>{favourites}</Col>
            </Row>
            <Row>
              <Col>Currently on rent:</Col>
              <Col>{rented}</Col>
            </Row>
            <Row>
              <Col>Artist Collection:</Col>
              <Col>{personal_collection}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  )
}