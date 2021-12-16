const express = require("express");
const {
  getReviews,
  findReviewById,
  updateReviewById,
  createReview,
  deleteReviewById,
} = require("../controllers/review");
const Review = require("../models/Review");

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");

router.route("/").get(advancedResults(Review), getReviews).post(createReview);

router
  .route("/:id")
  .get(findReviewById)
  .put(updateReviewById)
  .delete(deleteReviewById);

module.exports = router;
