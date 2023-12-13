import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    console.log('req.body->', req.body)
    const newUser = await User.create(req.body)
    const token = jwt.sign({ sub: newUser._id }, process.env.SECRET, { expiresIn: '7d' })
    return res.status(201).json({ username: newUser.username, token: token })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// Not very different from sam's one, but user logs in with username
export const login = async (req,res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error(!user ? 'Username not found' : 'Incorrect Password')
    }
    const token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '7d' })
    return res.json({ token: token, ...user.toObject() })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// Profile route

export const getProfile = async (req, res) => {
  try {
    // We can't populate req.currentUser as its not a query. So we'll get a query by using the req.currentUser._id and populate that
    const profile = await User.findById(req.currentUser._id).populate('rented').populate('favourites').populate('personal_collection')
    return res.json(profile)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const getAllProfile = async (req, res) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing headers')
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, process.env.SECRET)
    const userToVerify = await User.findById(payload.sub)
    const admin = await User.findOne({ username: 'admin' })
    if (!userToVerify._id.equals(admin._id)) throw new Error()
    // We can't populate req.currentUser as its not a query. So we'll get a query by using the req.currentUser._id and populate that
    const profile = await User.find().populate('rented').populate('favourites').populate('personal_collection')
    return res.json(profile)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// *show
// Method: GET
// Path: /profile/:userId
export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'No art to be found' })
    }
    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}


// *update
// method: PUT
// path: /profile/
export const updateUser = async (req, res) => {
  try {
    console.log('Hit inner')
    const profile = await User.findById(req.currentUser._id)
    Object.assign(profile, req.body)
    await profile.save()
    // console.log(profile)
    return res.json(profile)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// *update Add Profile Image
// method: PUT
// path: /profile
export const updateUserImg = async (req, res) => {
  try {
    const profile = await User.findById(req.currentUser._id)
    Object.assign(profile, req.body.profileImage)
    await profile.save()
    return res.json(profile)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}