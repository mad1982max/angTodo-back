const Note = require('../models/note.model');
const ErrorClass = require('../libs/errClass')

module.exports = {
  createNote: async(data) => {
    try {
      let fields = {
        name: data.name,
        userId: data.userId,
      };
      const note = await Note.create(fields);
      return note;

    } catch(err) {
      throw new ErrorClass({
        message: err.message,
        code: err.code,
      })
    }
  },

  getAll: async(userId) => {
    try {
      let notes = await Note.find({userId: userId});
      return notes;
    } catch(err) {
      throw new ErrorClass({
        message: err.message,
        code: err.code,
      })
    }
  },

  deleteOne: async(noteId, userId) => {
    try {
      let note = await Note.findOneAndDelete({_id: noteId, userId: userId});
      if(!note) {
        throw new Error('note doesn\'t exist');
      }
      return note;
    } catch(err) {
      throw new ErrorClass({
        message: err.message,
        code: err.code,
        name: err.name
      })
    }
  },

  updateOne: async(noteId, userId, updateObj) => {
    try {
      let note = await Note.findOneAndUpdate({_id: noteId, userId: userId}, {$set: updateObj}, {new: true});
      if(!note) {
        throw new Error('note doesn\'t exist');
      }
      return note;
    } catch(err) {
      throw new ErrorClass({
        message: err.message,
        code: err.code,
        name: err.name
      })
    }
  },
}