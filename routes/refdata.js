const express = require("express");
const {
  getReferenceData,
  findReferenceDataById,
  updateReferenceDataById,
  createReferenceData,
  deleteReferenceDataById,
} = require("../controllers/refdata");
const ReferenceData = require("../models/RefData");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(ReferenceData), getReferenceData)
  .post(createReferenceData);

router
  .route("/:id")
  .get(findReferenceDataById)
  .put(updateReferenceDataById)
  .delete(deleteReferenceDataById);

module.exports = router;
