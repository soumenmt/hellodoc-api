const Doctor = require("../models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all doctors
// @route     GET /api/v1/doctors
// @access    Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  // const reqQuery = { ...req.query };
  // console.log(" before exclude reqQuery", reqQuery);
  // //Fields to exclude
  // const removeFields = ["select"];
  // // loop over removeFields array and delete them from reqQuery
  // removeFields.forEach((param) => delete reqQuery[param]);
  // console.log(" after exclude reqQuery", reqQuery);
  // console.log(req.query.select);
  // let fields = "";
  // if (req.query.select) {
  //   console.log("inside select");
  //   fields = req.query.select.split(",").join(" ");
  //   console.log(" inside fields", fields);
  // }
  //try {
  // console.log(" outside fields", fields);

  // const doctors = await Doctor.find().select(fields).sort("firstname");
  res.status(200).json(res.advancedResults);
  //}
  // catch (err) {
  //   res.status(400).json({
  //     success: false,
  //   });
  // }
});

// @desc      Get doctor profile based on their id
// @route     GET /api/v1/doctors/:id
// @access    Public
exports.findDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
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
  var newdoctor = new Doctor({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    about: req.body.about,
    address: req.body.address,
    qualification: req.body.qualification,
    specialities: req.body.specialities,
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
