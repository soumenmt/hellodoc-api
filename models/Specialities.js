const mongoose = require("mongoose");
const SpecialitiesSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  specialities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speciality_Item",
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

SpecialitiesSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Specialities", SpecialitiesSchema);
