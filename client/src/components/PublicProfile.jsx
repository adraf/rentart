import { Link, useLoaderData } from 'react-router-dom'

// import axios from 'axios'
// import { useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArtListDiv from './ArtListDiv'


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


  return (
    <main>
      <Container className='indArtContainer' fluid={true}>
        <Row className='indArtSection'>
          <Col className='indArtImageColumn' sm={2}>
            {
              !user.profileImage
                ?
                <img className="search-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                :
                <img className="search-image" src={profileImage} alt={username} />
            }</Col>
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
              <Col>Currently on rent:</Col>
              <Col>{rented}</Col>
            </Row>
            <Row>
              <Col>Favourites:</Col>
              <Col>
                  {favourites
                    .map((artId) => {
                      <ArtListDiv id={artId} key={artId}/> 
                    })}
              </Col>
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