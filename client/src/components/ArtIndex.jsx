import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Dropdown from 'react-bootstrap/Dropdown'

export default function TvIndex() {
  const [arts, setArts] = useState([])
  const [artistChoice, setArtistChoice] = useState('All Artists')


  //! Effects
  useEffect(() => {
    async function getArtData() {
      try {
        const { data } = await axios.get('/api/art')
        setArts(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getArtData()
  }, [])

  //! Functions
  function handleSubmit(e) {
    e.preventDefault()
  }

  //! JSX
  return (
    <>
      <section className="searchContainer">
        <form onSubmit={handleSubmit}>
          <select
            className="genres-list"
            onChange={(e) => setArtistChoice(e.target.value)}
            value={artistChoice}
          >
            {arts
              .map((genreChoice, i) => {
                return <option key={i} value={genreChoice}>{genreChoice}</option>
              })
            }
          </select>
        </form>
      </section>

      <main>
        {/* <h1 className="bold display-3 mb-4">Shows List</h1> */}
        <Container fluid>
          <Row className="artsAll-list">
            {arts
              .map(show => {
                const { id, name, image: { medium } } = show
                return (
                  <Col
                    as={Link}
                    key={id}
                    xs={4}
                    s={3}
                    md={3}
                    lg={2}
                    xl={2}
                    to={`/art/${id}`}
                  >
                    <div className="rails">
                      <img className="thumbnail" src={medium} to={`/art/${id}`} />
                      <div className="movietittle">
                        <p>{name}<br></br>★Rating: {show.rating.average}</p>
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