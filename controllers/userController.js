import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${newUser.username}` })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const login = async (req,res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error(!user ? 'Username not found' : 'Incorrect Password')
    }
    const token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '7d' })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}