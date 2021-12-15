const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  reviewer_account_id: {
    type: String,
  },
  reviewer_name: {
    type: String,
  },
  is_review_anonymous: {
    type: Boolean,
  },
  is_doctor_recommended: {
    type: String,
  },
  review: {
    type: String,
  },
  waittime: {
    type: Number,
  },
  issue_for_visit: {
    type: String,
  },
  most_happy_about: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
