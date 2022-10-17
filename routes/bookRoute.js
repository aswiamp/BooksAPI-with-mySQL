const express = require('express');
const router = express.Router();
const ValidationMiddleware = require("../middleware/joiValidator")
const bookController = require('../controllers/bookController');

router.route('/').post(ValidationMiddleware,bookController.createBook).get(bookController.getAllBooks);

router.route('/:id').get(bookController.getBook).delete(bookController.deleteBook).patch(bookController.updateBook);

//router.route('/uploads').post(uploadBookImage);

module.exports = router;

