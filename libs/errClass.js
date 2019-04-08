const errJSON = require('../services/errJSON');

class ErrorClass extends Error {
  constructor({message, code = 500, name}) {
    super(message);
    this.name = name;
    this.code = code
  }

  static error404(req, res, next) { 
    const err = new ErrorClass({message: 'not found', code: '404'})   
    errJSON(err, req, res);
  }
}

module.exports = ErrorClass;