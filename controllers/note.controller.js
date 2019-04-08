const noteService = require('../services/note.service');
const resJSON = require('../services/resJSON');
const errJSON = require('../services/errJSON');

module.exports = {
  create: async(req, res, next) => {
    try {
      const data = Object.assign({}, req.body);
      data.userId = req.decodedToken._id;

      const note = await noteService.createNote(data);
      return resJSON({
        res,
        data: note,
        msg: 'note is created'
      });
    } catch(err) {
      errJSON(err, req, res);
    }
  },

  getAll: async(req, res, next) => {
    try {
      const userId = req.decodedToken._id;
      const notes = await noteService.getAll(userId);
      return resJSON({
        res,
        data: notes,
        msg: 'get all notes'
      });
    } catch(err) {
      err.code = 500;
      errJSON(err, req, res);
    }
  },
  
  updateOne: async(req, res, next) => {
    try {
      let noteId = req.params.id;
      let updateObj = req.body;
      let userId = req.decodedToken._id;
      const note = await noteService.updateOne(noteId, userId, updateObj);
      return resJSON({
        res,
        data: note,
        msg: 'update one note'
      });
    } catch(err) {
      err.code = 500;
      errJSON(err, req, res);
    }
  },

  deleteOne: async(req, res, next) => {
    try {
      let noteId = req.params.id;
      let userId = req.decodedToken._id;
      const note = await noteService.deleteOne(noteId, userId);
      return resJSON({
        res,
        data: note,
        msg: 'delete one note'
      });
    } catch(err) {
      err.code = 500;
      errJSON(err, req, res);
    }
  }
}