const express = require("express");
const {
  getAppointment,
  findAppointmentById,
  updateAppointmentById,
  createAppointment,
  deleteAppointmentById,
} = require("../controllers/appointment");
const advancedResults = require("../middleware/advancedResults");

const Appointment = require("../models/Appointment");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Appointment, "patient"), getAppointment)
  .post(createAppointment);

router
  .route("/:id")
  .get(findAppointmentById)
  .put(updateAppointmentById)
  .delete(deleteAppointmentById);

module.exports = router;
