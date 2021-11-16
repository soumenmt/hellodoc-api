const Doctor_Office_Availiability = require("../models/Doctor_Office_Avaliability");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all doctor availiabilities
// @route     GET /api/v1/doctoravailiabilities
// @access    Public
exports.getDoctorAvailiabilities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
// @desc      Get doctor availiabilities based on their id
// @route     GET /api/v1/doctoravailiabilities/:id
// @access    Public
exports.findDoctorAvailById = async (req, res, next) => {
  try {
    const doctoravail = await Doctor_Office_Availiability.findById(
      req.params.id
    ).populate("availSlots");
    if (!doctoravail) {
      return next(
        new ErrorResponse(
          `doctoravail not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: doctoravail });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update doctor availiabilities  based on their id
// @route     PUT /api/v1/doctoravailiabilities/:id
// @access    Public
exports.updateOneDoctorAvailById = async (req, res, next) => {
  try {
    const doctoravail = await Doctor_Office_Availiability.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doctoravail) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: doctoravail });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New doctoravailiabilities
// @route     POST /api/v1/doctoravailiabilities
// @access    Public
exports.createDoctorAvail = async (req, res, next) => {
  var newdoctoravail = new Doctor_Office_Availiability({
    doctoroffice: req.body.doctoroffice,
    avaliable_date: req.body.avaliable_date,
    day_of_week: req.body.day_of_week,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  });
  try {
    const doctoravail = await newdoctoravail.save();

    res.status(201).json({
      success: true,
      data: doctoravail,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      delete doctoravail profile based on their id
// @route     DELETE /api/v1/doctoravailiabilities/:id
// @access    Public
exports.deleteDoctorAvailById = async (req, res, next) => {
  try {
    const doctoravail = await Doctor_Office_Availiability.findByIdAndDelete(
      req.params.id
    );
    if (!doctoravail) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: doctoravail });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
