const resJSON = require('./resJSON');

module.exports = (err, req, res, next) => {

  switch(err.name) {
    case 'MongoError':
    err.message = 'error in mongoDB';
    err.code = 500;
    break;
    case 'CastError':
    err.message = 'error in mongoDB or wrong id';
    break;    
  }
  
  resJSON({
    res, 
    msg: err.message, 
    code: err.code || 500, 
    success: false
  })
}