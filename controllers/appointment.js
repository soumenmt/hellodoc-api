const Appointment = require("../models/Appointment");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all patients
// @route     GET /api/v1/appointments
// @access    Public
exports.getAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res
      .status(200)
      .json({ success: true, count: appointments.length, data: appointments });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Get appointment profile based on their id
// @route     GET /api/v1/appointments/:id
// @access    Public
exports.findAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return next(
        new ErrorResponse(
          `appointment not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update appointments profile based on their id
// @route     PUT /api/v1/appointments/:id
// @access    Public
exports.updateAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!appointment) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New appointment Profile
// @route     POST /api/v1/appointments
// @access    Public
exports.createAppointment = async (req, res, next) => {
  var newappointment = new Appointment({
    doctor_office_id: req.body.doctor_office_id,
    patient_id: req.body.patient_id,
    appointment_date: req.body.appointment_date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  });
  try {
    const appointment = await newappointment.save();

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update appointment profile based on their id
// @route     DELETE /api/v1/appointments/:id
// @access    Public
exports.deleteAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
