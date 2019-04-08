const resJSON = require('../services/resJSON');
const errJSON = require('../services/errJSON');
const jwtService = require('../services/jwt.service');
const userService = require('../services/user.service');

module.exports = {

  createUser: async(req, res, next) => {
    try {
      const data = Object.assign({}, req.body);
      const user = await userService.createUser(data);
      
      return resJSON({
        res,
        data: user,
        msg: 'user is created'
      })

    } catch(err) {
      errJSON(err, req, res)
    }    
  },

  loginUser: async(req, res, next) => {
    try {
      const {email, password} = req.body;
      const user = await userService.getUserByEmail(email);
      
      await user.checkHash(password);

      const {token, refreshToken} = await jwtService.sign({email, _id: user.id});
      console.log('token', token);//TODO:
      resJSON({
        res,
        data: {token, refreshToken},
        message: 'user logged in'
    });
    } catch(err) {
      console.log('-----e');
      
      errJSON(err, req, res)
    }
  }
}


