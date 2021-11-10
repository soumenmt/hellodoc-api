const express = require("express");
const {
  getDoctorAvailiabilities,
  findDoctorAvailById,
  updateOneDoctorAvailById,
  createDoctorAvail,
  deleteDoctorAvailById,
} = require("../controllers/doctor_office_avaliability");

const router = express.Router();

router.route("/").get(getDoctorAvailiabilities).post(createDoctorAvail);

router
  .route("/:id")
  .get(findDoctorAvailById)
  .put(updateOneDoctorAvailById)
  .delete(deleteDoctorAvailById);

module.exports = router;
