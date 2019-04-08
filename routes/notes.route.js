const express = require('express');
const router = express.Router();

const noteController = require('../controllers/note.controller');
const validator = require('../middleware/validator');

router.use(validator.varifyToken);

router.post('/create', validator.createNote(), validator.result, noteController.create);
router.get('/', noteController.getAll);
router.patch('/:id', noteController.updateOne);
router.delete('/:id', noteController.deleteOne);

module.exports = router;