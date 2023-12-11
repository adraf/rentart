import { Link, useLoaderData } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function IndUserPage() {

  // // //! Effects
  // useEffect(() => {
  //   async function getArtData() {
  //     try {
  //       const res = await axios.get('/api/art')
  //       setArts(res.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getArtData()
  // }, [])

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
      <Container className='' fluid={true}>
        <Row className=''>
          <Col className='' sm={2}>
            {
              !user.profileImage
                ?
                <img className="search-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                :
                <img className="search-image" src={profileImage} alt={username} />
            }</Col>
          <Col className=''>
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
              <Container>
                <Row>
                  {favourites
                    .map((art, i) => {
                      const { _id: indArtId, artName, artImage, artist } = art
                      return (
                        <Col
                          className=''
                          // Link helps the individual art page function
                          as={Link}
                          key={i}
                          xs={12}
                          s={12}
                          md={6}
                          lg={6}
                          xl={4}
                          style={{ backgroundImage: `url(${artImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}
                          to={`/art/${indArtId}`}
                        >
                          <div className="rails" style={{ height: '300px' }}>
                            <div className="thumbnail" to={`/art/${indArtId}`}
                              style={{ backgroundImage: `url(${artImage})` }}>
                            </div>
                            <div className="art-title">
                              <h5>art{artName}</h5>
                              <p>artist {artist}</p>
                            </div>
                          </div>
                        </Col>
                      )
                    })}
                </Row>
              </Container>
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