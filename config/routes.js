import express from 'express'
import { 
  getAllArt, 
  createArt, 
  getSingleArt,
  updateArt,
  rentArt,
  deleteArt,
  getSomeArt
} from '../controllers/artController.js'
import { 
  register, 
  login, 
  getProfile, 
  getAllProfile,
  getSingleUser, 
  updateUser,
  updateUserImg
} from '../controllers/userController.js'
import secureRoute from './secureRoute.js'

const router = express.Router()

// Arts
router.route('/art')
  .get(getAllArt)
  .post(secureRoute, createArt)

router.route('/art/:artId')
  .get(getSingleArt)
  .put(secureRoute, updateArt)
  .delete(secureRoute, deleteArt)

router.route('/art/rent/:artId')
  // Art Rental Status Modification Specific Endpoint
  .put(secureRoute, rentArt)

router.route('/art/count/:artCount')
  .get(getSomeArt)

// Auth
router.route('/register')
  .post(register)

router.route('/login')
  .post(login)

// User
router.route('/profile')
  .get(secureRoute, getProfile)
  .put(secureRoute, updateUser)
  .put(secureRoute, updateUserImg)

router.route('/profile/all')
  .get(secureRoute, getAllProfile)

router.route('/profile/:userId')
  .get(getSingleUser)


export default router