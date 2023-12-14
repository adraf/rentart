/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { getIndArt } from "../utils/loaders/artLoader"
import { Link } from 'react-router-dom'


import Col from 'react-bootstrap/Col'

export default function ArtListDiv({ id }) {
  const [painting, setPainting] = useState('')

  useEffect(() => {
    async function artworkRetrieve() {
      const artwork = await getIndArt(id)
      setPainting(artwork)
    }
    artworkRetrieve()
  }, [id])

  return (
    <Col
      className='single-art-container'
      // Link helps the individual art page function
      as={Link}
      xs={12}
      s={6}
      md={4}
      lg={3}
      xl={2}
      to={`/art/${painting._id}`}
    >

      <div className="rails" style={{ height: '200px', paddingBottom: '3em' }}>
        <div className="thumbnail" to={`/art/${painting._id}`}
          style={{ backgroundImage: `url(${painting.artImage})` }}>
        </div>
        <div className="art-title">
          <h5>{painting.artName}</h5>
          <p>{painting.artist}</p>
        </div>
      </div>
    </Col>
  )
}