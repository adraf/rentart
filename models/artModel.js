import mongoose from 'mongoose'

const artSchema = new mongoose.Schema({
  artName: { type: String, required: true },
  artist: { type: String, required: true },
  artImage: { type: String, required: true },
  type: [{ type: String, required: true }],
  description: { type: String, required: true },
  movement: [{ type: String, required: true }],
  media: [{ type: String, required: true }],
  year: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  price: { type: Number, required: true },
  rentalStartDate: { type: Date, default: Date.now },
  rentalEndDate: { type: Date, default: Date.now },
  availability: { type: Boolean, default: true },
  uploadedBy: { type: mongoose.ObjectId, ref: 'User', required: true },
})


// use Art
export default mongoose.model('Art', artSchema)