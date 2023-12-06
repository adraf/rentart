///ERROR 

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ArtIndex() {
  const [arts, setArts] = useState([])
  const [artistChoice, setArtistChoice] = useState('All Artists')



  //! Effects
  useEffect(() => {
    async function getArtData() {
      try {
        const res = await axios.get('/api/art')
        console.log(res)
        console.log(res.data)
        setArts(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getArtData()
  }, [])

  const artistAll = [... new Set(arts.map(art => art.artist))]




  //! Functions
  function handleSubmit(e) {
    e.preventDefault()
  }

  //! JSX
  return (
    <>
      <section className="filter-container">
        {/* <form onSubmit={handleSubmit}>   */}
        <select
          className="artist-list"
          onChange={(e) => setArtistChoice(e.target.value)}
          value={artistChoice}
        >
          {artistAll
            .map((artistChoice, i) => {
              return <option key={i} value={artistChoice}>{artistChoice}</option>
            })
          }
        </select>
        {/* </form> */}
      </section>

      <main>
        {/* <h1 className="bold display-3 mb-4">Shows List</h1> */}
        <Container fluid>
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
                    style={{ backgroundImage: `url(${artImage})`, backgroundRepeat:'no-repeat' , backgroundPosition:'center', backgroundSize:'contain'}}
                    to={`/art/${id}`}
                  >
                    {/* {artName} */}
                    <div className="rails" style={{height: '300px'}}>
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