const express = require("express");
const {
  getPatients,
  findPatientById,
  updateOnePatientById,
  createPatient,
  deletePatientById,
} = require("../controllers/patients");

const router = express.Router();

router.route("/").get(getPatients).post(createPatient);

router
  .route("/:id")
  .get(findPatientById)
  .put(updateOnePatientById)
  .delete(deletePatientById);

module.exports = router;
