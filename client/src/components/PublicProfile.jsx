import { useLoaderData } from 'react-router-dom'
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

  const userTypeText = usertype === 1 ? 'Artist' : usertype === 2 ? 'Art Appreciator' : '';

  return (
    <section>
      <Container className='' fluid={true}>
        <Row className=''>
          <Col className='indArtImageColumn' sm={2}>
            {
              !user.profileImage
                ?
                <img className='profilePic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                :
                <img className='profilePic' src={profileImage} alt={username} />
            }</Col>
          <Col className='user-information'>
            <Row>
              <h2>PROFILE: {name}, {userTypeText}</h2>
              <h4>Username: {username}</h4>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>CURRENTLY ON RENT</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {rented
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} />
                      )
                    })}
                </Row>
              </Container>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>FAVOURITES</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {favourites
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} />
                      )
                    })}
                </Row>
              </Container>
            </Row>
            {usertype === 1 && (
              <Row >
                <Col style={{ backgroundColor: 'grey', color: 'white' }}>MY OWN ART COLLECTION</Col>
                <Container fluid className='art-grid'>
                  <Row className="artAll-list">
                    {personal_collection
                      .map((artId) => {
                        return (
                          <ArtListDiv id={artId} key={artId} />
                        )
                      })}
                  </Row>
                </Container>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}