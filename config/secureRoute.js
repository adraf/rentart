import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export default async function secureRoute(req, res, next){
  try {
    // 1. We want to ensure the Authorization header was passed with the request
    if (!req.headers.authorization) throw new Error('Missing headers')
    // 2. Extract the token from the header
    const token = req.headers.authorization.replace('Bearer ', '')
    // 3. jwt method to verify the tokens validity
    const payload = jwt.verify(token, process.env.SECRET)
    // 4. Make sure that the user still exists in our database
    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error('User not found')
    // 5. access to the user document we found in the final controller
    req.currentUser = userToVerify
    // 6. If we find the user still exists, then pass the request on to the final controller with next()
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}