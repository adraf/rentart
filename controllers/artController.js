import Art from '../models/artModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

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
//* Renting art
export const rentArt = async (req, res) => {
  // mongoose session
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { artId } = req.params
    const art = await Art.findById(artId)
    console.log(art)
    if (!art) throw new Error('Art not found')
    if (Object.keys(req.body).length === 1 && Object.keys(req.body)[0] === 'availability'){
      // set end of rental date
      if (req.body.availability === true) {
        // If art becomes available again
        const user = await User.findOne({ rented: { $in: [artId] } })
        // console.log(user.rented)
        if (user) {
          user.rented = user.rented.filter(id => id.toString() !== artId)
          Object.assign(art, req.body)
          await user.save()
        }
        await art.save()
        await session.commitTransaction()
        session.endSession()
        return res.json([art, user])
      } else {
        // if art is being rented
        const user = await User.findById(req.currentUser._id)
        if (user.rented.length > 2) throw new Error('Max 2 rentals at a time')
        user.rented.push(artId)
        const inAWeek = new Date()
        inAWeek.setDate(inAWeek.getDate() + 7)
        Object.assign(art, req.body, { rentalStartDate: new Date(), rentalEndDate: inAWeek })
        await user.save()
        await art.save()
        await session.commitTransaction()
        session.endSession()
        return res.json([art, user])
      }
    } else {
      await session.abortTransaction()
      session.endSession()
      return res.status(404).json({ message: 'Unable to process rent' })
    }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    return res.status(400).json({ message: error.message })
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
      return res.status(404).json({ message: 'No art found, or unauthorized' })
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