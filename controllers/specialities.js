const Specialities = require("../models/Specialities");
const Speciality_Item = require("../models/Speciality_Item");

const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all specialities
// @route     GET /api/v1/specialities
// @access    Public
exports.getSpecialities = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};
// @desc      Get specialities profile based on their id
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.findSpecialitiesById = async (req, res, next) => {
  try {
    const speciality = await Specialities.findById(req.params.id).populate(
      "specialities"
    );
    if (!speciality) {
      return next(
        new ErrorResponse(
          `speciality not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: speciality });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update specialities profile based on their id
// @route     PUT /api/v1/specialities/:id
// @access    Public
exports.updateSpecialitiesById = async (req, res, next) => {
  try {
    const speciality = await Specialities.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!speciality) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: speciality });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New specialities
// @route     POST /api/v1/specialities
// @access    Public
exports.createSpecialities = async (req, res, next) => {
  const specialityItemsIds = Promise.all(
    req.body.specialities.map(async (specialityItem) => {
      let newSpecialityItem = new Speciality_Item({
        name: specialityItem.name,
        id: specialityItem.id,
        checked: specialityItem.checked,
      });

      newSpecialityItem = await newSpecialityItem.save();

      return newSpecialityItem._id;
    })
  );

  const specialityItemsIdsResolved = await specialityItemsIds;

  let newspecialities = new Specialities({
    doctor: req.body.doctor,
    specialities: specialityItemsIdsResolved,
  });
  try {
    const specialities = await newspecialities.save();

    res.status(201).json({
      success: true,
      data: specialities,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update Specialities based on their id
// @route     DELETE /api/v1/Specialities/:id
// @access    Public
exports.deleteSpecialitiesById = async (req, res, next) => {
  try {
    const speciality = await Specialities.findByIdAndDelete(req.params.id);
    if (!speciality) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: speciality });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
