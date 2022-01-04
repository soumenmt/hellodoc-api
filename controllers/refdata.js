const ReferenceData = require("../models/RefData");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @access    Public
exports.getReferenceData = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};
// @desc      Get reviews profile based on their id
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.findReferenceDataById = async (req, res, next) => {
  try {
    const refdata = await ReferenceData.findById(req.params.id);
    if (!refdata) {
      return next(
        new ErrorResponse(`patient not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: refdata });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update review profile based on their id
// @route     PUT /api/v1/reviews/:id
// @access    Public
exports.updateReferenceDataById = async (req, res, next) => {
  try {
    const refdata = await ReferenceData.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!refdata) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: refdata });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New review
// @route     POST /api/v1/reviews
// @access    Public
exports.createReferenceData = async (req, res, next) => {
  console.log("new ReferenceData req", req.body);
  var newrefdata = new ReferenceData({
    name: req.body.name,
    id: req.body.id,
    category: req.body.category,
    value: req.body.value,
  });
  console.log("newrefdata", newrefdata);
  try {
    const refdata_new = await newrefdata.save();
    console.log("refdata_new", refdata_new);

    res.status(201).json({
      success: true,
      data: refdata_new,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update review based on their id
// @route     DELETE /api/v1/reviews/:id
// @access    Public
exports.deleteReferenceDataById = async (req, res, next) => {
  try {
    const refdata = await ReferenceData.findByIdAndDelete(req.params.id);
    if (!refdata) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: refdata });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
