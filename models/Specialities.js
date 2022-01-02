const mongoose = require("mongoose");

const SpecialitySchema = new mongoose.Schema(
  { name: String },
  { id: String },
  { checked: Boolean }
);

const SpecialitiesSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  specialities: [SpecialitySchema],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Specialities", SpecialitiesSchema);
