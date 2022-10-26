const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const { authorizePermissions } = require("../middleware/authorization");

const Router = express.Router();

Router.route("/:id")
    .get(purchaseController.checkAvailability)
    .post(purchaseController.purchaseBook);
Router.route("/").get(
    authorizePermissions("admin"),
    purchaseController.purchaseReport
);

module.exports = Router;
