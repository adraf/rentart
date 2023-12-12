import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  paymentDetails: Number,
  profileImage: String,
  favourites: [{ type: mongoose.ObjectId, ref: 'Art' }],
  rented: [{ type: mongoose.ObjectId, ref: 'Art' }],
  personal_collection: [{ type: mongoose.ObjectId, ref: 'Art' }],
})

// Whenever the user collection is queried and a user document is converted to JSON, we will remove the password from the response
userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    // eslint-disable-next-line comma-dangle
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function (value) {
    // Here value is the actual value passed from the frontend that we add to the virtual field
    this._passwordConfirmation = value
  })

userSchema.pre('validate', function (next) {
  if (this.isModified('password') && this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Make sure the passwords match')
  }
  next()
})

userSchema.pre('validate', function (next) {
  if (this.isModified('rented') && this.rented.length > 2) {
    this.invalidate('rented', 'Maximum 2 rented pieces')
  }
  next()
})

userSchema.pre('save', function (next) {
  // This function will hash our plain text password
  // We first need to ensure we are trying to modify the password, otherwise it will hash each time, hashing the hash
  // Once we've confirmed we are updating or creating the password, we will use bcrypt to hash it
  if (this.isModified('password')) {
    // hashSync takes a plain text password (this.password) and a salt which we generate with genSaltSync (passing the required rounds)
    // hashSync will return our hash and we assign this as the value of the password field just before we save to the database
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
  }
  next()
})

export default mongoose.model('User', userSchema)