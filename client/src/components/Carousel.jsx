import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// use state stores the data from the useEffect
export default function ArtCarousel() {
  const [ allArt, setAllArt ] = useState([])
// useEffect gets data on load and sets to state
  useEffect(() => {
    async function getAllArt() {
      try {
        // const res = await axios.get(`/api/art`)
        const res = await axios.get(`api/art/count/:artCount`)
        setAllArt(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getAllArt()
  }, [])

// Data stored in state is mapped through and added to carousel
  return (
    <main>
      {/* touch means you can use with touchscreen, wrap continues with no hard stop */}
      <Carousel touch={true} wrap={true} data-bs-theme="dark" slide={true}>
        {/* map through art for carousel to cycle through */}
        {allArt.map((art, id) => {
          const { _id: artId, artImage, artName, artist } = art
          return (
            // has link to go to individual ID page
            // ! does this need api at the start of link?
            <Carousel.Item key={ id } as={Link} to={`/art/${artId}`}>
              <img
                className="carouselSlideImage" 
                src={artImage}
                alt={artName}
              />
              <Carousel.Caption>
                <h3>{artName}</h3>
                <p>{artist}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </main>
  )
}