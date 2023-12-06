import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/routes.js'
// from artModel
import Art from './models/artModel.js'

//! Variables
const app = express()
const port = process.env.PORT
const connectionString = process.env.CONNECTION_STRING

//! Middleware 
app.use(express.json())
app.use((req, res, next) => {
  console.log(`REQUEST RECEIVED: ${req.method} ${req.originalUrl}`)
  next()
})

//! Endpoints
app.use('/api', router)

// Start servers
async function startServer() {
  try {
    // Establish a connection to the MongoDB database (Atlas)
    await mongoose.connect(connectionString)
    console.log('✅ Database connection established')
    // Listen
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`))
  } catch (error) {
    console.log('🚨 Error connection')
    console.log(error)
  }
}
startServer()