require('dotenv').config();
const bcrypt = require('bcrypt');
const ErrorClass = require('../libs/errClass');

module.exports = {
  createHash: async(psw) => {
    try {
      const salt = await bcrypt.genSalt(+process.env.SALT);             
      const hash = await bcrypt.hash(psw, salt);      
      return hash;
      
    } catch(err) {      
      throw new ErrorClass({
        message: 'error creating the hash',
				code: 401
      })
    }     
  },

  verifyHash: async function(password) {
    try {
      const isValid = await bcrypt.compare(password, this.password);
      
      if(!isValid) {
        throw new Error('password: invalid credentials');
      }
      return isValid;
    } catch(err) {
      throw new ErrorClass({
        message: err.message || 'validation error',
				code: 401
      })
    }
  }
}