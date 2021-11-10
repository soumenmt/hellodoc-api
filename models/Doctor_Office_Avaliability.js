const mongoose = require("mongoose");

const Doctor_Office_Availiability_Schema = new mongoose.Schema({
  doctor_office_id: {
    type: String,
  },
  avaliable_date: {
    type: Date,
  },
  day_of_week: {
    type: String,
  },
  start_time: {
    type: Number,
  },
  end_time: {
    type: Number,
  },
});

module.exports = mongoose.model(
  "Doctor_Office_Availiability",
  Doctor_Office_Availiability_Schema
);
