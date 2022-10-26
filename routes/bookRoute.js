const express = require("express");
const router = express.Router();
const ValidationMiddleware = require("../middleware/joiValidator");
const { authorizePermissions } = require("../middleware/authorization");
const bookController = require("../controllers/bookController");

router
    .route("/")
    .post(
        authorizePermissions("admin"),
        ValidationMiddleware,
        bookController.createBook
    )
    .get(bookController.getAllBooks);

router
    .route("/:id")
    .get(bookController.getBook)
    .delete(authorizePermissions("admin"), bookController.deleteBook)
    .patch(authorizePermissions("admin"), bookController.updateBook);

//router.route('/uploads').post(uploadBookImage);

module.exports = router;
