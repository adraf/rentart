/* eslint-disable react/prop-types */
import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function AppreciatorProfile({ userData }) {
  return (
    <section>
      <Container className='' fluid={true}>
        <Row className=''>
          <Col className='settings' sm={2}>
            <h3 className='filters-header' style={{justifyContent:"flex-end"}}>Settings</h3>
            <ImageUploadSection />
            <Container className="setting-fields">
              <div><p>{userData.name}</p><button>edit</button></div>
              <div><p>Delivery Address</p><button>edit</button></div>
              <div><p>Payment Details</p><button>edit</button></div>
            </Container>
            {/* {
            !userData.profileImage
              ?
              <img className='profilePic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
              :
              <img className='profilePic' src={userData.profileImage} alt={userData.username} />
          } */}
          </Col>
          <Col className='user-information'>
            <Row>
              <div style={{ display: "flex" }}>
                <h2>PROFILE: {userData.name}, Art Appreciator</h2>
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


    // <section className="profile">
    //   <ImageUploadSection />
    //   <div className="profile-body appr-body">
    //     <div className="body-instance current-items">
    //       <h2>Favourites</h2>
    //       {userData.favourites.length > 0
    //         ?
    //         userData.favourites.map(artId => {
    //           return (
    //             <ArtListDiv key={artId} id={artId} />
    //           )
    //         })
    //         :
    //         <h2>You have no artwork yet!</h2>
    //       }
    //       <h2>Currently in posession</h2>
    //       {userData.rented.length > 0
    //         ?
    //         userData.rented.map((artId) => {
    //           return (
    //             <ArtListDiv key={artId} id={artId} />
    //           )
    //         })
    //         :
    //         <h2>You have no artwork yet!</h2>
    //       }
    //     </div>
    // <div className="body-instance details">
    //   <div><p>Name</p><button>edit</button></div>
    //   <div><p>Delivery Address</p><button>edit</button></div>
    //   <div><p>Payment Details</p><button>edit</button></div>
    // </div>
    //   </div>
    // </section>
  )
}