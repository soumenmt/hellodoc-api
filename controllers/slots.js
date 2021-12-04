const Slot = require("../models/Slots");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all slots
// @route     GET /api/v1/slots
// @access    Public
exports.getSlots = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};
// @desc      Get slot profile based on their id
// @route     GET /api/v1/slots/:id
// @access    Public
exports.findSlotById = async (req, res, next) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return next(
        new ErrorResponse(`patient not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: slot });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update slot profile based on their id
// @route     PUT /api/v1/patients/:id
// @access    Public
exports.updateSlotById = async (req, res, next) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!slot) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: slot });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New patient Profile
// @route     POST /api/v1/patients
// @access    Public
exports.createSlot = async (req, res, next) => {
  var newslot = new Slot({
    doctorofficeavailiability: req.body.doctorofficeavailiability,
    slottime: req.body.slottime,
    slotstatus: req.body.slotstatus,
    slotOrder: req.body.slotorder,
  });
  try {
    const slot = await newslot.save();

    res.status(201).json({
      success: true,
      data: slot,
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
exports.deleteSlotById = async (req, res, next) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: slot });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
