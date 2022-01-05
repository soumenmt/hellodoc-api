const mongoose = require("mongoose");

const Doctor_OfficeSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  office_name: {
    type: String,
  },
  street_address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  country: {
    type: String,
  },
  full_address: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

Doctor_OfficeSchema.virtual("officeAvail", {
  ref: "Doctor_Office_Availiability", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "doctoroffice", // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
Doctor_OfficeSchema.set("toObject", { virtuals: true });
Doctor_OfficeSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Doctor_Office", Doctor_OfficeSchema);
