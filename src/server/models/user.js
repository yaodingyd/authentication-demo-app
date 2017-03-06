const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
})

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, cb)
}

UserSchema.pre('save', function saveHook (next) {
  const user = this
  if (!user.isModified('password')) return next()

  return bcrypt.genSalt((error, salt) => {
    if (error) return next(error)

    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)
      user.password = hash
      return next
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
