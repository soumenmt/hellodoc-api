const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @access    Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Get reviews profile based on their id
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.findReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(`patient not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: review });
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
exports.updateReviewById = async (req, res, next) => {
  try {
    const review = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New review
// @route     POST /api/v1/reviews
// @access    Public
exports.createReview = async (req, res, next) => {
  console.log("new review req", req.body);
  var newreview = new Review({
    doctor: req.body.doctor,
    reviewer_name: req.body.reviewer_name,
    is_doctor_recommended: req.body.is_doctor_recommended,
    review: req.body.review,
    issue_for_visit: req.body.issue_for_visit,
    most_happy_about: req.body.most_happy_about,
  });
  try {
    const review = await newreview.save();

    res.status(201).json({
      success: true,
      data: review,
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
exports.deleteReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
