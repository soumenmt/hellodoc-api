const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctoroffice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor_Office",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  appointment_date: {
    type: Date,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
