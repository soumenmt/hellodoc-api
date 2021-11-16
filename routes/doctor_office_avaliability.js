const express = require("express");
const {
  getDoctorAvailiabilities,
  findDoctorAvailById,
  updateOneDoctorAvailById,
  createDoctorAvail,
  deleteDoctorAvailById,
} = require("../controllers/doctor_office_avaliability");

const Doctor_Office_Availiability = require("../models/Doctor_Office_Avaliability");

const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(Doctor_Office_Availiability, "availSlots"),
    getDoctorAvailiabilities
  )
  .post(createDoctorAvail);

router
  .route("/:id")
  .get(findDoctorAvailById)
  .put(updateOneDoctorAvailById)
  .delete(deleteDoctorAvailById);

module.exports = router;
