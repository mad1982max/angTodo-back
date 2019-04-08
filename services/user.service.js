const User = require('../models/user.model');
const ErrorClass = require('../libs/errClass');

module.exports = {
  createUser: async(data) => {
    try {

      const hashPsw = await User.hashing(data.password);
      data.password = hashPsw;
      const user = await User.create(data);
      return user;

    } catch(err) {
      throw new ErrorClass({
        message: err.message,
        code: err.code,
        name: err.name
      })
    }        
  },

  getUserByEmail: async(email) => {
    try {
      const user = await User.findOne({email: email});
      if(!user) {
        throw new ErrorClass({
          message: 'user is not exist',
          code: 500,
        })
      }
      return user;
    } catch (err) {
      throw new ErrorClass({
        message: err.message,
        code: err.code,
        name: err.name
      })
    }
  },

  // login: async(data) => {
  //   try {


  //   } catch(err) {
  //     throw new ErrorClass({
  //       message: err.message,
  //       code: err.code,
  //       name: err.name
  //     })
  //   }
  // }
}