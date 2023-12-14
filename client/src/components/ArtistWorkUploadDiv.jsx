import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArtListDiv from "./ArtListDiv"
import { Modal } from '@mui/material'
import Box from '@mui/material/Box'

export default function ArtworkUploadSection() {
  // Get User ID
  const [userData, setUserData] = useOutletContext()
  const [uploadArtImg, setUploadArtImg] = useState('')
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({})
  const { personal_collection } = userData
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  // Disable button unless completed forms
  const keysArray = Object.keys(inputs)
  const count = keysArray
  const artUploadField = document.querySelector('.artUploadField')
  const submitBtn = document.querySelector('.submitBtn')
  if ((count.length === 11) && !artUploadField.value !== true) {
    submitBtn.disabled = false
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    let json = Object.fromEntries(formData.entries());
    json = { ...json, artImage: uploadArtImg }
    submitArtInfo(json)
  }
  // POST and then navigate to new art page
  async function submitArtInfo(json) {
    try {
      const res = await axios.post('/api/art', json, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      const artID = res.data._id
      // push to artist collection
      const artistCollection = [...personal_collection, artID]
      updateArtistCollection(artistCollection)
      navigate(`/art/${artID}`)
    } catch (error) {
      console.log(error)
    }
  }

  // push to artist collection
  async function updateArtistCollection(artistCollection) {
    try {
      const res = await axios.put('/api/profile', { personal_collection: artistCollection }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      const newData = { ...res.data, token: userData.token }
      setUserData(newData)
    } catch (error) {
      console.log(error)
    }
  }

  // Cloudinary Upload
  async function handleImageUpload(e) {
    const preset = import.meta.env.VITE_UPLOAD_PRESET
    const file = e.target.files[0]
    const endPoint = import.meta.env.VITE_UPLOAD_URL
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)
    const { data: { secure_url } } = await axios.post(endPoint, data)
    setUploadArtImg(secure_url)
  }

  // Adds image ready for form upload
  useEffect(() => {
    inputs.artImage = uploadArtImg
  }, [uploadArtImg])


  return (
    <>
      <section className='index-page'>
        <button className='side-buttons' onClick={handleOpen} style={{ top: '6.5em', }}>Upload˯</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='modal-container'>
            <div className='modal-header'>
              <h3></h3>
              <h3>Upload</h3>
            </div>
            <form className='ArtworkImageUploaderControls' onSubmit={handleSubmit} method="POST">
              <label hidden htmlFor="artName">Name of art work</label>
              <input type="text" name="artName" placeholder='Title of art work' value={inputs.artName || ''} onChange={handleChange} required />
              <label hidden htmlFor="artist">Artist name</label>
              <input type="text" name="artist" placeholder='Artist name' value={inputs.artist || ''} onChange={handleChange} required />
              <label hidden htmlFor="type">Type</label>
              <input type="text" name="type" placeholder='Type (painting, sculpture, etc)' value={inputs.type || ''} onChange={handleChange} required />
              <label hidden htmlFor="description">Description</label>
              <input type="text" name="description" placeholder='Description' value={inputs.description || ''} onChange={handleChange} required />
              <label hidden htmlFor="movement">Movement</label>
              <input type="text" name="movement" placeholder='Movement' value={inputs.movement || ''} onChange={handleChange} required />
              <label hidden htmlFor="media">Media</label>
              <input type="text" name="media" placeholder='Media' value={inputs.media || ''} onChange={handleChange} required />
              <label hidden htmlFor="year">Year</label>
              <input type="number" name="year" placeholder='Year' value={inputs.year || ''} onChange={handleChange} required />
              <label hidden htmlFor="width">Width</label>
              <input type="number" name="width" placeholder='Width in cm' value={inputs.width || ''} onChange={handleChange} required />
              <label hidden htmlFor="height">Height</label>
              <input type="number" name="height" placeholder='Height in cm' value={inputs.height || ''} onChange={handleChange} required />
              <label hidden htmlFor="price">Price</label>
              <input type="number" name="price" placeholder='Price in £s' value={inputs.price || ''} onChange={handleChange} required />
              <input type='file' className='artUploadField' name='artImage' onChange={handleImageUpload} />
              <input type="submit" className="submitBtn" value="Upload Artwork" disabled={true} />
            </form>
          </Box>
        </Modal>
        <Container fluid className='art-grid'>
          <Row >
            <Col style={{ backgroundColor: 'grey', color: 'white', height: '2.5em', marginLeft:'1em' }}>MY OWN ART COLLECTION
              {/* <button className='modal-buttonToUpload' onClick={handleOpen} > UPLOAD˯ </button> */}
            </Col>
            <Container fluid className='art-grid'>
              <Row className="artAll-list">
                {userData.personal_collection
                  .map((artId) => {
                    return (
                      <ArtListDiv id={artId} key={artId} />
                    )
                  })}
              </Row>
            </Container>
          </Row>
        </Container>
      </section>
    </>
  )
}
