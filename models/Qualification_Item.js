const mongoose = require("mongoose");
const QualificationSchema = mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Qualification_Item", QualificationSchema);
