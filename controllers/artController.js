import Art from '../models/artModel.js'

// *index
// Method: GET
// Path: /art
export const getAllArt = async (req, res) => {
  const art = await Art.find()
  return res.json(art)
}

// *show
// Method: GET
// Path: /art/:artId
export const getSingleArt = async (req, res) => {
  try {
    const { artId } = req.params
    const art = await Art.findById(artId).populate('uploadedBy')
    if (!art) {
      return res.status(404).json({ message: 'No art to be found' })
    }
    return res.json(art)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// *create
// Method: POST
// Path: /art
export const createArt = async (req, res) => {
  try {
    req.body.uploadedBy = req.currentUser._id
    const artToCreate = await Art.create(req.body)
    return res.status(201).json(artToCreate)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// *update
// method: PUT
// path: /art/:artId
export const updateArt = async (req, res) => {
  try {
    const { artId } = req.params
    const art = await Art.findById(artId)
    if (!art) {
      return res.status(404).json({ message: 'No art found' })
    }
    if (!art.uploadedBy.equals(req.currentUser._id)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    Object.assign(art, req.body)
    await art.save()
    return res.json(art)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// *delete
// method: DELETE
// path: /art/:artId
export const deleteArt = async (req, res) => {
  try {
    const { artId } = req.params
    const artToDelete = await Art.findByIdAndDelete({ _id: artId, uploadedBy: req.currentUser._id })
    if (!artToDelete) {
      return res.status(404).json({ message: 'No book found, or unauthorized' })
    }
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const getSomeArt = async (req, res) => {
  try {
    const { artCount } = req.params
    const randomArt = await Art.aggregate([
      { $sample: { size: 6 } }
    ])
    return res.json(randomArt)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}