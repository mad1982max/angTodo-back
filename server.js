const express = require('express');
const bodyParser = require('body-parser');
const notesRoute = require('./routes/notes.route');
const usersRoute = require('./routes/users.route');
const cors = require('cors');
const mongoose = require('mongoose');
const errJSON = require('./services/errJSON');
const ErrorClass = require('./libs/errClass');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cors());

app.use('/users', usersRoute);
app.use('/notes', notesRoute);

// app.use((req, res, next) => {
//   const err = {};
//   err.code = 404;
//   err.message = 'Page not found';
//   errJSON(err, req, res, next);       
// });//TODO:

app.use(ErrorClass.error404);

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  reconnectTries: 5
};
const db = mongoose.connection;

mongoose.connect(process.env.DB_URL, dbOptions)
db.on('open', () => {
  console.log('...connected to db');
  
  app.listen(process.env.DB_PORT, () => console.log('...listening port', process.env.DB_PORT)); 
});
db.on('error', (err) => console.log('--err:', err.message));


