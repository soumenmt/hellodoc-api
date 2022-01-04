const mongoose = require("mongoose");
const QualificationsSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  qualifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qualification_Item",
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

QualificationsSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Qualifications", QualificationsSchema);
