const express = require("express");
const {
  getDoctors,
  findDoctorById,
  updateOneDoctorById,
  createDoctor,
  deleteDoctorById,
} = require("../controllers/doctors");
const Doctor = require("../models/Doctor");

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");

router.route("/").get(advancedResults(Doctor), getDoctors).post(createDoctor);

router
  .route("/:id")
  .get(findDoctorById)
  .put(updateOneDoctorById)
  .delete(deleteDoctorById);

module.exports = router;
