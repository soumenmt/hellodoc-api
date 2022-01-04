const Qualifications = require("../models/Qualifications");
const Qualification_Item = require("../models/Qualification_Item");

const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all Qualifications
// @route     GET /api/v1/Qualifications
// @access    Public
exports.getQualifications = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};
// @desc      Get Qualifications profile based on their id
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.findQualificationsById = async (req, res, next) => {
  try {
    const qualification = await Qualifications.findById(req.params.id).populate(
      "Qualifications",
      "name",
      "id",
      "checked"
    );
    if (!qualification) {
      return next(
        new ErrorResponse(
          `qualification not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: qualification });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update Qualifications profile based on their id
// @route     PUT /api/v1/Qualifications/:id
// @access    Public
exports.updateQualificationsById = async (req, res, next) => {
  try {
    const qualification = await Qualifications.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!qualification) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: qualification });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New Qualifications
// @route     POST /api/v1/Qualifications
// @access    Public
exports.createQualifications = async (req, res, next) => {
  let spls = req.body.qualifications;
  const qualificationItemsIds = Promise.all(
    spls.map(async (qualificationItem) => {
      let newqualificationItem = new Qualification_Item({
        name: qualificationItem.name,
        id: qualificationItem.id,
        checked: qualificationItem.checked,
      });
      newqualificationItem = await newqualificationItem.save();

      return newqualificationItem._id;
    })
  );

  const qualificationItemsIdsResolved = await qualificationItemsIds;

  let newQualifications = new Qualifications({
    doctor: req.body.doctor,
    qualifications: qualificationItemsIdsResolved,
  });
  try {
    const Qualifications = await newQualifications.save();

    res.status(201).json({
      success: true,
      data: Qualifications,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update Qualifications based on their id
// @route     DELETE /api/v1/Qualifications/:id
// @access    Public
exports.deleteQualificationsById = async (req, res, next) => {
  try {
    const qualification = await Qualifications.findByIdAndDelete(req.params.id);
    if (!qualification) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: qualification });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
