const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    name: {type: String, required: true, max: 100},
    isImportant: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    userId: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);
