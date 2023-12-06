import mongoose from 'mongoose'
import Art from '../models/artModel.js'
import User from '../models/userModel.js'
import artData from './data/arts.js'
import userData from './data/users.js'
import 'dotenv/config'

async function seed(){
  try {
    //* 1. Establish a connection to the database
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('✅ Database connection established')

    //* 2. We will clear out existing data in preparation to add our initial/dummy data
    const { deletedCount: deletedArtCount } = await Art.deleteMany()
    console.log(`❌ Deleted ${deletedArtCount} arts from the database`)

    const { deletedCount: deletedUserCount } = await User.deleteMany()
    console.log(`❌ Deleted ${deletedUserCount} users from the database`)

    //* 3. Add our data into the the relevant collections
    const usersCreated = await User.create(userData)
    console.log(`👤 Seeded ${usersCreated.length} users to the database`)

    //* Add random user _id field as uploadedBy value on each art document
    const ownedArts = artData.map(art => {
      const randomUserIndex = Math.floor(Math.random() * usersCreated.length)
      return { ...art, uploadedBy: usersCreated[randomUserIndex]._id }
    })

    const ownedArts = artData.map(async (art) => {
      const adminIndex = await User.findOne({ username: 'admin' });
      return { ...art, uploadedBy: adminIndex._id };
    })

    //* Use the updated artData with uploadedBy fields to create documents
    const artsCreated = await Art.create(ownedArts)
    console.log(`🌱 Seeded ${artsCreated.length} arts to the database`)

    //* 4. Close the connection to the database
    await mongoose.connection.close()
    console.log('👋 Closed the connection to the database')

  } catch (error) {
    console.log(error)

    await mongoose.connection.close()
    console.log('👋 Closed the connection to the database')
  }
}
seed()