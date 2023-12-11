import { useState, useEffect } from "react"
import { getIndArt } from "../utils/loaders/artLoader"

export default function ArtListDiv({ id }){
  const [ painting, setPainting ] = useState('')

  useEffect(() => {
    async function artworkRetrieve(){
      const artwork = await getIndArt(id)
      setPainting(artwork)
    }
    artworkRetrieve()
  }, []) 

  return (
    <div className="art-item">
      <img src={painting.artImage} className="search-image" alt="" />
      <div>
        <p>Name: {painting.artName}</p>
        <p>Artist: {painting.artist}</p>
        <p>Movement: {painting.movement}</p>
        <p>Media: {painting.media}</p>
        <p>Year: {painting.year}</p>
        <p>Dimensions: {painting.width}cm x {painting.year}cm</p>
      </div>
    </div>
  )
}