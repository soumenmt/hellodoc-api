const mongoose = require("mongoose");

const Doctor_Office_Availiability_Schema = new mongoose.Schema({
  doctoroffice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor_Office",
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
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

Doctor_Office_Availiability_Schema.virtual("availSlots", {
  ref: "Slots", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "doctorofficeavailiability", // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
Doctor_Office_Availiability_Schema.set("toObject", { virtuals: true });
Doctor_Office_Availiability_Schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model(
  "Doctor_Office_Availiability",
  Doctor_Office_Availiability_Schema
);
