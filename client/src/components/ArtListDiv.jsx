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
      // key={i}
      xs={12}
      s={6}
      md={4}
      lg={3}
      xl={2}
      // style={{ backgroundImage: `url(${artImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}
      to={`/art/${painting._id}`}
    >

      <div className="rails" style={{ height: '200px', paddingBottom: '3em' }}>
        <div className="thumbnail" to={`/art/${painting._id}`}
          style={{ backgroundImage: `url(${painting.artImage})` }}>
        </div>
        {/* <img src={painting.artImage} className="thumbnail" alt="" /> */}
        <div className="art-title">
          <h5>{painting.artName}</h5>
          <p>{painting.artist}</p>
          {/* <p>Movement: {painting.movement}</p>
          <p>Media: {painting.media}</p>
          <p>Year: {painting.year}</p>
          <p>Dimensions: {painting.width}cm x {painting.year}cm</p> */}
        </div>
      </div>
    </Col>
  )
}