const express = require("express");
const {
  getAppointment,
  findAppointmentById,
  updateAppointmentById,
  createAppointment,
  deleteAppointmentById,
} = require("../controllers/appointment");

const router = express.Router();

router.route("/").get(getAppointment).post(createAppointment);

router
  .route("/:id")
  .get(findAppointmentById)
  .put(updateAppointmentById)
  .delete(deleteAppointmentById);

module.exports = router;
