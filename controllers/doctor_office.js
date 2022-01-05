const Doctor_Office = require("../models/Doctor_Office");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all Doctor_Offices
// @route     GET /api/v1/doctoroffices
// @access    Public
exports.getDoctorOffices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get doctoroffice profile based on their id
// @route     GET /api/v1/doctoroffices/:id
// @access    Public
exports.findDoctorOfficeById = async (req, res, next) => {
  try {
    const doctoroffice = await Doctor_Office.findById(req.params.id).populate(
      "officeAvail"
    );
    if (!doctoroffice) {
      return next(
        new ErrorResponse(
          `doctoroffice not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: doctoroffice });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update doctoroffice profile based on their id
// @route     PUT /api/v1/doctoroffices/:id
// @access    Public
exports.updateOneDoctorOfficeById = async (req, res, next) => {
  try {
    const doctoroffice = await Doctor_Office.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doctoroffice) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: doctoroffice });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New doctoroffice Profile
// @route     POST /api/v1/doctoroffices
// @access    Public
exports.createDoctorOffice = async (req, res, next) => {
  console.log(req.body);
  var newdoctoroffice = new Doctor_Office({
    doctor: req.body.doctor,
    office_name: req.body.office_name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    phone: req.body.phone,
  });
  try {
    const doctoroffice = await newdoctoroffice.save();

    res.status(201).json({
      success: true,
      data: doctoroffice,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      delete doctoroffice profile based on their id
// @route     DELETE /api/v1/doctoroffices/:id
// @access    Public
exports.deleteDoctorOfficeById = async (req, res, next) => {
  try {
    const doctoroffice = await Doctor_Office.findByIdAndDelete(req.params.id);
    if (!doctoroffice) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: doctoroffice });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
