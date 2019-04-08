const {body, validationResult} = require('express-validator/check');
const resJSON = require('../services/resJSON');
const errJSON = require('../services/errJSON');
const jwtService = require('../services/jwt.service');

module.exports = {
  createUser: () => {
    return [
      body('name').exists().not().isEmpty().isString().isLength({
        min: 3,
        max: 8
      }),
      body('email').exists().not().isEmpty().isEmail(),
      body('password').exists().not().isEmpty().isString().isLength({min: 3, max: 10}),
    ]
  },

  login: () => {
    return [
      body('email').exists().not().isEmpty().isEmail(),
      body('password').exists().not().isEmpty().isString().isLength({min: 3, max: 10}),
    ]
  },

  createNote: () => {
    return [
      body('name').exists().not().isEmpty().isString().isLength({ max: 100 }),
      //body('email').exists().not().isEmpty().isEmail(),
    ]
  },

  varifyToken: async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw new Error('no verifying token');
        }        
        const decoded = await jwtService.verify(token);
        req.decodedToken = decoded;
        return next();

    } catch(err) {
        err.code = 401;
        errJSON(err, req, res);
    }
  },

  result: (req, res, next) => {
    validationResult(req).isEmpty()
      ? next()
      : resJSON({
        res,
        code: 401,        
        msg: 'invalid credentials',
        success: false
      })
  }
}