const express = require("express");
const {
  getDoctorOffices,
  findDoctorOfficeById,
  updateOneDoctorOfficeById,
  createDoctorOffice,
  deleteDoctorOfficeById,
} = require("../controllers/doctor_office");

const router = express.Router();

router.route("/").get(getDoctorOffices).post(createDoctorOffice);

router
  .route("/:id")
  .get(findDoctorOfficeById)
  .put(updateOneDoctorOfficeById)
  .delete(deleteDoctorOfficeById);

module.exports = router;
