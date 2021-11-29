const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a lastname"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  phone: {
    type: String,
    maxlength: [10, "Phone number can not be longer than 10 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
