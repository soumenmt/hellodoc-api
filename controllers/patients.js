const Patient = require("../models/Patient");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all patients
// @route     GET /api/v1/patients
// @access    Public
exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res
      .status(200)
      .json({ success: true, count: patients.length, data: patients });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Get patient profile based on their id
// @route     GET /api/v1/patients/:id
// @access    Public
exports.findPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return next(
        new ErrorResponse(`patient not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update patient profile based on their id
// @route     PUT /api/v1/patients/:id
// @access    Public
exports.updateOnePatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New patient Profile
// @route     POST /api/v1/patients
// @access    Public
exports.createPatient = async (req, res, next) => {
  console.log("new patient req", req.body);
  var newpatient = new Patient({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  try {
    const patient = await newpatient.save();

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update patient profile based on their id
// @route     DELETE /api/v1/patients/:id
// @access    Public
exports.deletePatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
