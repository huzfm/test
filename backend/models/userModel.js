const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Job = require('./jobModel')

// defining thr scheama of dconstata in the databse
const userSchema = new mongoose.Schema({
      email: {
            type: String,
            unique: true,
            required: [true, 'user must have a email'],
            validate: [validator.isEmail, 'please provide a valid email']
      },
      password: {
            type: String,
            required: [true, 'user must have a password'],
      },
      passwordConfirm: {
            type: String,
            required: [true, 'user must have a password'],

            //validating if the password matches
            validate: {
                  validator: function (val) {
                        return val == this.password
                  },
                  message: 'passwords msut be same'
            }

      },
      jobs: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job', // Reference to the User model
            required: [true, 'Job must be associated with a user'],
      },
})

//document middleware that encrypts the password before save into the database using bcyrptjs library
userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 12);
      this.passwordConfirm = undefined;
      next()
})

const User = mongoose.model("User", userSchema);
module.exports = User