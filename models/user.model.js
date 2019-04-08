const mongoose = require('mongoose');
const passwordService = require('../services/psw.service');

let userSchema = mongoose.Schema({
  name: {
    type: String, 
    required: true
  },

  email: {
    type: String,
    validate: {
      validator: (value) => /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value),
      message: data => `${data.value} is not valid email`
    },
    unique: true,
    required: true
  },

  password: {
    type: String, 
    required: true
  },
  created: {
    type: Date, 
    default: Date.now
  }
});

// userSchema.pre('save', async function(){
//   console.log('this', this);
//   console.log('pre');
// });

userSchema.statics.hashing = passwordService.createHash;
userSchema.methods.checkHash = passwordService.verifyHash;

module.exports = mongoose.model('User', userSchema);