///ERROR 
import * as React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"

//! components

import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'

export default function Filterbox() {
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
  const [artistChoice, setArtistChoice] = useState('Artist')
  const artistAll = [... new Set(arts.map(art => art.artist))]
  artistAll.unshift('Artists')

  //* LIST OF MOVEMENT
  const [movementChoice, setMovementChoice] = useState('Movement')
  const movementAll = []
  const movementSets = [... new Set(arts.map(art => art.movement))]
  movementSets.forEach(listOfMovement => {
    listOfMovement.forEach(movement => {
      movementAll.push(movement)
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

  const handleChange2 = (event, newValue, activeThumb) => {
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

  const handleChange3 = (event, newValue, activeThumb) => {
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
  // function handleSubmit(e) {
  //   e.preventDefault()
  // }

  function valuetext(value) {
    return `${value} cm`
  }


  //! JSX
  return (
    <>
      <main>
        <div className='filter-container'>
          <h3>Filters</h3>
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
        </div>
      </main >
    </>
  )
}