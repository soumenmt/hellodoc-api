const express = require("express");
const {
  getDoctorOffices,
  findDoctorOfficeById,
  updateOneDoctorOfficeById,
  createDoctorOffice,
  deleteDoctorOfficeById,
} = require("../controllers/doctor_office");
const Doctor_Office = require("../models/Doctor_Office");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Doctor_Office, "officeAvail"), getDoctorOffices)
  .post(createDoctorOffice);

router
  .route("/:id")
  .get(findDoctorOfficeById)
  .put(updateOneDoctorOfficeById)
  .delete(deleteDoctorOfficeById);

module.exports = router;
