const mongoose = require("mongoose");

const Doctor_OfficeSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
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
});

module.exports = mongoose.model("Doctor_Office", Doctor_OfficeSchema);
