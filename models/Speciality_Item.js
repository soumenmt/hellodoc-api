const mongoose = require("mongoose");
const SpecialitySchema = mongoose.Schema({
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

module.exports = mongoose.model("Speciality_Item", SpecialitySchema);
