import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { useEffect, useState } from 'react'

// use state stores the data from the useEffect
export default function ArtCarousel() {
  const [ allArt, setAllArt ] = useState()
// useEffect gets data on load and sets state
  useEffect(() => {
    async function getAllArt(){
      const data = await axios.get(`/api/art`)
      setAllArt(data.data)
    }
    getAllArt()
  }, [])

// ! To do  
// ! Need to make sure all images are equal size - css
// ! Need to fit them to page to see the text at the bottom - css

// Data stored in state is mapped through and added to carousel
  return (
    <main>
      <Carousel touch={true} wrap={true}>
        {allArt.map(art => {
          const artId = art._id
          const artImage = art.artImage
          const artName = art.artName
          const artist = art.artist
          return (
            <Carousel.Item key={ artId }>
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