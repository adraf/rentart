import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { useEffect, useState } from 'react'

// use state stores the data from the useEffect
export default function ArtCarousel() {
  const [ allArt, setAllArt ] = useState([])
// useEffect gets data on load and sets to state
  useEffect(() => {
    async function getAllArt(){
      try {
        const res = await axios.get(`/art/count/:artCount`)
        setAllArt(res.data)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getAllArt()
  }, [])

// ! To do  
// ! Need to make sure all images are equal size - css
// ! Need to fit them to page to see the text at the bottom - css

// Data stored in state is mapped through and added to carousel
  return (
    <main>
      {/* touch means you can use with touchscreen, wrap continues with no hard stop */}
      <Carousel touch={true} wrap={true}>
        {/* map through art for carousel to cycle through */}
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