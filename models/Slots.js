const mongoose = require("mongoose");

const SlotsSchema = new mongoose.Schema({
  doctorofficeavailiability: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor_Office_Availiability",
  },
  slottime: {
    type: String,
    trim: true,
  },
  slotstatus: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Slots", SlotsSchema);
