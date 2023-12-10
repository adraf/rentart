
import ImageUploadField from './ImageUploadField'
import axios from "axios"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function ArtCollection() {
  //! State
  const [noBueno, setNoBueno] = useState('')
  const [formData, setFormData] = useState({
    artName: '',
    artist: '',
    type: '',
    description: '',
    movement: '',
    media: '',
    year: null,
    width: null,
    height: null,
    price: null,
    image: '',
  })


  //! State from App
  const data = useOutletContext()
  const setUserData = data[8]// need to add an array field in artist's schema where to upload their own collections

  

  //! Functions
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function validateArt(e) {
    e.preventDefault()
    // Defining variables for validation
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    const formKeys = []
    let str = ''

    // validating every field has been fulfilled
    for (const [key, value] of Object.entries(parsedData)) {
      if (!value) formKeys.push(key)
    }
    if (formKeys.length > 0) {
      // If empty values were found we make a string with them to add to an error message
      formKeys.map(val => str = `${str}${val} ,`)
      str = str.substring(0, str.length - 2)
      return setNoBueno('Seems you have missed some fields: \n' + str)
    } else {
      setNoBueno('')
    }
    uploadArt(parsedData)
  }

  async function uploadArt(parsedData) {
    try {
      // upload data
      const res = await axios.post('/api/collection', parsedData)
      // Save data
      setUserData(res.data)

    } catch (error) {
      console.log(error)
    }
  }


  //! JSX
  return (
    <fieldset>
      {/* If user doesen't fill one or more of the fields a warning appears */}
      {noBueno && <section className="nobueno"><p>{noBueno}</p></section>}
      <legend>Join the Art Rental Community!</legend>
      <form action="#" onSubmit={validateArt}>
        <input type="text" name="artName" placeholder="Artwork Title" />
        <input type="text" name="artist" placeholder="Artist" />
        <input type="text" name="type" placeholder="Type" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="movement" placeholder="Movement" />
        <input type="text" name="media" placeholder="Media" />
        <input type="number" name="year" placeholder="Year of creation" />
        <input type="number" name="width" placeholder="Width" />
        <input type="number" name="height" placeholder="Height" />
        <input type="number" name="price" placeholder="Price" />
        <ImageUploadField value={formData.image} handleChange={handleChange} />
        <button type="submit">Submit!</button>
      </form>
    </fieldset>

  )

}