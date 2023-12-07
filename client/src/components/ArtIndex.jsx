import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"
import Filterbox from './Filterbox'

//! components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function ArtIndex() {
  const [arts, setArts] = useState([])

  //! Effects
  useEffect(() => {
    async function getArtData() {
      try {
        const res = await axios.get('/api/art')
        setArts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getArtData()
  }, [])



  //! JSX
  return (
    <>
      <main>
        <Filterbox></Filterbox>

        {/* <h1 className="bold display-3 mb-4">Shows List</h1> */}
        <Container fluid className='art-grid'>
          <Row className="artsAll-list">
            {arts
              .map((art, i) => {
                const { id, artName, artImage } = art
                return (
                  <Col
                    as={Link}
                    key={i}
                    xs={4}
                    s={3}
                    md={3}
                    lg={2}
                    xl={2}
                    style={{ backgroundImage: `url(${artImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}
                    to={`/art/${id}`}
                  >
                    {/* {artName} */}
                    <div className="rails" style={{ height: '300px' }}>
                      {/* <img className="thumbnail" src={artImage} to={`/art/${id}`} /> */}
                      <div className="art-title">
                        <p>{artName}</p>
                      </div>
                    </div>
                  </Col>
                )
              })}
          </Row>
        </Container>
      </main >
    </>
  )
}