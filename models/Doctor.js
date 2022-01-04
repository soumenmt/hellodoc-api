const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a firstname"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
    required: [true, "Please add a lastname"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  about: {
    type: String,
  },
  registration_details: {
    type: String,
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
  recommendation_count: {
    type: Number,
  },
  review_count: {
    type: Number,
  },
  image: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

DoctorSchema.virtual("doctorOffices", {
  ref: "Doctor_Office", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "doctor", // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
DoctorSchema.set("toObject", { virtuals: true });
DoctorSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Doctor", DoctorSchema);
