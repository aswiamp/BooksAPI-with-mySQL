const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/').post(bookController.createBook).get(bookController.getAllBooks);

router.route('/:id').get(bookController.getBook).delete(bookController.deleteBook).patch(bookController.updateBook);

//router.route('/uploads').post(uploadBookImage);

module.exports = router;

