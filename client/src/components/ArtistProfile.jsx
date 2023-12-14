import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"
// import ArtworkUploadSection from "./ArtistWorkUploadDiv"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function ArtistProfile({ userData }) {
  return (
    <section>
      <Container className='' fluid={true}>
        <Row className=''>
          <Col className='settings' sm={2}>
            <h3 className='modal-header' style={{justifyContent:"flex-end"}}>Settings</h3>
            <ImageUploadSection />
            <Container className="setting-fields">
              <div><p>{userData.name}</p><button>Edit</button></div>
              <div><p>Delivery Address</p><button>Edit</button></div>
              <div><p>Payment Details</p><button>Edit</button></div>
            </Container>
          </Col>
          <Col className='user-information'>
            <Row>
              <div style={{ display: "flex" }}>
                <h2>PROFILE: {userData.name}, Artist</h2>
              </div>

              <div style={{ display: "flex" }}>
                <h4>Username: {userData.username}</h4>
              </div>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>MY OWN ART COLLECTION</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {userData.personal_collection
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} />
                      )
                    })}
                </Row>
              </Container>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>CURRENTLY ON RENT</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {userData.rented
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
                  {userData.favourites
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} />
                      )
                    })}
                </Row>
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}