const Doctor = require("../models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all doctors
// @route     GET /api/v1/doctors
// @access    Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get doctor profile based on their id
// @route     GET /api/v1/doctors/:id
// @access    Public
exports.findDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "doctorOffices"
    );
    if (!doctor) {
      return next(
        new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update doctor profile based on their id
// @route     PUT /api/v1/doctors/:id
// @access    Public
exports.updateOneDoctorById = async (req, res, next) => {
  try {
    const file = req.file;
    let imagepath;

    if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      imagepath = `${basePath}${fileName}`;
      req.body.image = imagepath;
    }

    console.log("request", req.body);
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New Doctor Profile
// @route     POST /api/v1/doctors
// @access    Public
exports.createDoctor = async (req, res, next) => {
  console.log(" doctor profile request", req.body);

  // console.log("req ", req);
  // const file = req.file;
  // //if (!file) return res.status(400).send('No image in the request');
  // const fileName = file.filename;
  // console.log("filename", fileName);
  // //console.log("request", req.body);

  // const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  var newdoctor = new Doctor({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    about: req.body.about,
    address: req.body.address,
    registration_details: req.body.registration_details,
    qualification: req.body.qualification,
    specialities: req.body.specialities,
    image: req.body.image,
  });
  try {
    const doctor = await newdoctor.save();

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update doctor profile based on their id
// @route     DELETE /api/v1/doctors/:id
// @access    Public
exports.deleteDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
