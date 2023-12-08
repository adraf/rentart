///ERROR 
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { Modal, Button } from '@mui/material'

export default function ArtIndex() {
  const [search, setSearch] = useState('')
  const [arts, setArts] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  artistAll.sort()
  artistAll.unshift('Artists')

  //* LIST OF MOVEMENT
  const [movementChoice, setMovementChoice] = useState('Movements')
  const movementAll = []
  const movementSets = [... new Set(arts.map(art => art.movement))]
  movementSets.forEach(listOfMovement => {
    listOfMovement.forEach(movement => {
      movementAll.push(movement)
      movementAll.sort()
      movementAll.unshift('Movements')
    })
  })
  const movementList = movementAll.filter((value, index) => movementAll.indexOf(value) === index)

  //* LIST OF MEDIA
  const [mediaChoice, setMediaChoice] = useState('Media')
  const mediaAll = []
  const mediaSets = [... new Set(arts.map(art => art.media))]
  mediaSets.forEach(listOfMedia => {
    listOfMedia.forEach(medium => {
      mediaAll.push(medium)
      mediaAll.sort()
      mediaAll.unshift('Media')
    })
  })
  const mediaList = mediaAll.filter((value, index) => mediaAll.indexOf(value) === index)

  //* WIDTH SLIDER
  const minDistance = 10
  const [artWidth, setArtWidth] = React.useState([0, 1000])

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setArtWidth([Math.min(newValue[0], artWidth[1] - minDistance), artWidth[1]])
    } else {
      setArtWidth([artWidth[0], Math.max(newValue[1], artWidth[0] + minDistance)])
    }
  }

  //* HEIGHT SLIDER
  const [artHeight, setArtHeight] = React.useState([0, 1000])

  const handleChange2 = (newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1000 - minDistance)
        setArtHeight([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setArtHeight([clamped - minDistance, clamped])
      }
    } else {
      setArtHeight(newValue)
    }
  }

  //* PRICE SLIDER
  const [artPrice, setArtPrice] = React.useState([0, 100000])

  const handleChange3 = (newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000 - minDistance)
        setArtPrice([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setArtPrice([clamped - minDistance, clamped])
      }
    } else {
      setArtPrice(newValue)
    }
  }

  //! Functions

  function valuetext(value) {
    return `${value} cm`
  }

  //! JSX
  return (
    <>
      <main className='index-page'>
      <button className='side-buttons' onClick={handleOpen}>Filters˯ </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='filter-container'>
            <h3>Filters</h3>
            <input
              placeholder="Search..."
              className="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <section className='filter-selection'>
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
            <section className='filter-selection'>
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
            <section className='filter-selection'>
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
            <Box className='filter-sliders-container'>
              <label>Width Range (cm)</label>
              <Slider
                min={0}
                max={1000}
                getAriaLabel={() => 'Minimum distance'}
                value={artWidth}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
              <label>Height Range (cm)</label>
              <Slider
                min={0}
                max={1000}
                getAriaLabel={() => 'Minimum distance shift'}
                value={artHeight}
                onChange={handleChange2}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
              <label>Price Range (£)</label>
              <Slider
                min={0}
                max={100000}
                getAriaLabel={() => 'Minimum distance shift'}
                value={artPrice}
                onChange={handleChange3}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Box>
          </Box>
        </Modal>


        {/* <h1 className="bold display-3 mb-4">Shows List</h1> */}
        <Container fluid className='art-grid'>
          <Row className="artAll-list">
            {arts
              .filter(art => {
                const minWidth = artWidth[0]
                const maxWidth = artWidth[1]
                const minHeight = artHeight[0]
                const maxHeight = artHeight[1]
                // console.log(minWidth, maxWidth)
                // console.log(art.width)
                const pattern = new RegExp(search, 'i')
                if (minWidth < art.width
                  && art.width < maxWidth
                  && minHeight < art.height
                  && art.height < maxHeight
                  && artistChoice === 'Artists'
                  && movementChoice === 'Movements'
                  && mediaChoice === 'Media') {
                  return pattern.test(art.artName)
                }
                else if (minWidth < art.width && art.width < maxWidth && minHeight < art.height && art.height < maxHeight && art.artist.includes(artistChoice) && movementChoice === 'Movements' && mediaChoice === 'Media') {
                  return pattern.test(art.artName)
                }
                else if (minWidth < art.width && art.width < maxWidth && minHeight < art.height && art.height < maxHeight && art.artist.includes(artistChoice) && art.movement.includes(movementChoice) && mediaChoice === 'Media') {
                  return pattern.test(art.artName)
                }
                else if (minWidth < art.width && art.width < maxWidth && minHeight < art.height && art.height < maxHeight && art.artist.includes(artistChoice) && art.movement.includes(movementChoice) && art.media.includes(mediaChoice)) {
                  return pattern.test(art.artName)
                }
                else if (minWidth < art.width && art.width < maxWidth && minHeight < art.height && art.height < maxHeight && art.artist.includes(artistChoice) && movementChoice === 'Movements' && art.media.includes(mediaChoice)) {
                  return pattern.test(art.artName)
                }
                else if (minWidth < art.width && art.width < maxWidth && minHeight < art.height && art.height < maxHeight && artistChoice === 'Artists' && art.movement.includes(movementChoice) && mediaChoice === 'Media') {
                  return pattern.test(art.artName)
                }
                else if (minWidth < art.width && art.width < maxWidth && minHeight < art.height && art.height < maxHeight && artistChoice === 'Artists' && art.movement.includes(movementChoice) && art.media.includes(mediaChoice)) {
                  return pattern.test(art.artName)
                }



                // else if (art.media.includes(mediaChoice)) {
                //   return pattern.test(art.artName)
                // }
              })
              .sort((a, b) => {
                return a.artName.localeCompare(b.artName)
              }
              )
              .map((art, i) => {
                // 'indArtId' is to link to Individual Art Page
                const { _id: indArtId, artName, artImage, artist } = art
                return (
                  <Col
                    className='single-art-container'
                    // Link helps the individual art page function
                    as={Link}
                    key={i}
                    xs={12}
                    s={8}
                    md={6}
                    lg={4}
                    xl={3}
                    // style={{ backgroundImage: `url(${artImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}
                    to={`/art/${indArtId}`}
                  >
                    {/* {artName} */}
                    <div className="rails" style={{ height: '300px' }}>
                      <div className="thumbnail" to={`/art/${indArtId}`}
                        style={{ backgroundImage: `url(${artImage})` }}>

                        <p className='favorite'
                          onClick={(e) => {
                            e.preventDefault()
                            if (e.target.innerText === '🤍') {
                              e.target.innerText = '♥️'
                              console.log(indArtId)
                            } else {
                              e.target.innerText = '🤍'
                            }
                          }}
                        >
                          {'🤍'}
                        </p>

                      </div>
                      <div className="art-title">
                        <h5>{artName}</h5>
                        <p>{artist}</p>
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