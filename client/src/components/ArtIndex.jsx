///ERROR 
import * as React from 'react';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'

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


  //* LIST OF ARTISTS
  const [artistChoice, setArtistChoice] = useState('Artists')
  const artistAll = [... new Set(arts.map(art => art.artist))]
  artistAll.unshift('Artists')

  //* LIST OF MOVEMENT
  const [movementChoice, setMovementChoice] = useState('Movements')
  const movementAll = []
  const movementSets = [... new Set(arts.map(art => art.movement))]
  movementSets.forEach(listOfMovement => {
    listOfMovement.forEach(movement => {
      movementAll.push(movement)
      movementAll.unshift('movement')
    })
  })
  const movementList = movementAll.filter((value, index) => movementAll.indexOf(value) === index)

  //* LIST OF MEDIA
  const [mediaChoice, setMediaChoice] = useState('Medium')
  const mediaAll = []
  const mediaSets = [... new Set(arts.map(art => art.media))]
  mediaSets.forEach(listOfMedia => {
    listOfMedia.forEach(medium => {
      mediaAll.push(medium)
      mediaAll.unshift('Medium')
    })
  })
  const mediaList = mediaAll.filter((value, index) => mediaAll.indexOf(value) === index)

  //* MAXIMUM WIDTH
  const [maxWidth, setMaxWidth] = useState(0)
  const artWidth = [... new Set(arts.map(art => art.width))]




  //! Functions
  function handleSubmit(e) {
    e.preventDefault()
  }
  function valuetext(value) {
    return `${value}°C`;
  }
  
  const minDistance = 10;
  const [value1, setValue1] = React.useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  //! JSX
  return (
    <>
      <section className="filter-container">
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
      </section>
      <section className="filter-container">
        <select
          className="movement-list"
          onChange={(e) => setMovementChoice(e.target.value)}
          value={movementChoice}
        >
          {movementList
            .map((movementChoice, i) => {
              return <option key={i} value={movementChoice}>{movementChoice}</option>
            })
          }
        </select>
      </section>
      <section className="filter-container">
        <select
          className="media-list"
          onChange={(e) => setMediaChoice(e.target.value)}
          value={mediaChoice}
        >
          {mediaList
            .map((mediaChoice, i) => {
              return <option key={i} value={mediaChoice}>{mediaChoice}</option>
            })
          }
        </select>
      </section>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={value2}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>






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