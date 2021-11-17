const express = require("express");
const {
  createPatientAppointment,
} = require("../controllers/patientappointment");

const router = express.Router();

router.route("/").post(createPatientAppointment);

module.exports = router;
