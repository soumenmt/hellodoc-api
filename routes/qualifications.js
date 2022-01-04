const express = require("express");
const {
  getQualifications,
  findQualificationsById,
  updateQualificationsById,
  createQualifications,
  deleteQualificationsById,
} = require("../controllers/qualifications");
const Qualifications = require("../models/Qualifications");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Qualifications, "qualifications"), getQualifications)
  .post(createQualifications);

router
  .route("/:id")
  .get(findQualificationsById)
  .put(updateQualificationsById)
  .delete(deleteQualificationsById);

module.exports = router;
