const express = require("express");
const {
  getReviews,
  findReviewById,
  updateReviewById,
  createReview,
  deleteReviewById,
} = require("../controllers/review");

const router = express.Router();

router.route("/").get(getReviews).post(createReview);

router
  .route("/:id")
  .get(findReviewById)
  .put(updateReviewById)
  .delete(deleteReviewById);

module.exports = router;
