const express = require("express");
const {
  getDoccategories,
  createDoccategories,
} = require("../controllers/doccategories");
const Doccategories = require("../models/Doccategories");

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(advancedResults(Doccategories), getDoccategories)
  .post(createDoccategories);

module.exports = router;
