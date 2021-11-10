const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctor_office_id: {
    type: String,
  },
  patient_id: {
    type: String,
  },
  appointment_date: {
    type: Date,
  },
  start_time: {
    type: Number,
  },
  end_time: {
    type: Number,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
