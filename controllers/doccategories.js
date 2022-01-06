const Doccategories = require("../models/Doccategories");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all doctors
// @route     GET /api/v1/doctors
// @access    Public
exports.getDoccategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Create New Doctor Profile
// @route     POST /api/v1/doctors
// @access    Public
exports.createDoccategories = async (req, res, next) => {
  console.log(" Doccategories profile request", req.body);
  var newdoccategories = new Doccategories({
    name: req.body.name,
    id: req.body.id,
    doctoravail: req.body.doctoravail,
    value: req.body.value,
    type: req.body.type,
    image: req.body.image,
  });
  try {
    const doccategories = await newdoccategories.save();

    res.status(201).json({
      success: true,
      data: doccategories,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
