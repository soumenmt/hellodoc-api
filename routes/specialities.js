const express = require("express");
const {
  getSpecialities,
  findSpecialitiesById,
  updateSpecialitiesById,
  createSpecialities,
  deleteSpecialitiesById,
} = require("../controllers/specialities");
const Specialities = require("../models/Specialities");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Specialities, "specialities"), getSpecialities)
  .post(createSpecialities);

router
  .route("/:id")
  .get(findSpecialitiesById)
  .put(updateSpecialitiesById)
  .delete(deleteSpecialitiesById);

module.exports = router;
