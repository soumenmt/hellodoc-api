const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a firstname"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please add a lastname"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  about: {
    type: String,
    maxlength: [5000, "Description can not be more than 5000 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
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
  address: {
    type: String,
  },
  qualification: {
    type: String,
  },
  specialities: {
    type: String,
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
