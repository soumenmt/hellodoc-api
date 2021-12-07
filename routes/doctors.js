const express = require("express");
const {
  getDoctors,
  findDoctorById,
  updateOneDoctorById,
  createDoctor,
  deleteDoctorById,
} = require("../controllers/doctors");
const Doctor = require("../models/Doctor");

// const multer = require("multer");
// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error("invalid image type");
//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     console.log("fileoriginalname", file.originalname);
//     console.log("fileextension", file.mimetype);

//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(advancedResults(Doctor, "doctorOffices"), getDoctors)
  .post(createDoctor);

router
  .route("/:id")
  .get(findDoctorById)
  .put(uploadOptions.single("image"), updateOneDoctorById)
  .delete(deleteDoctorById);

module.exports = router;
