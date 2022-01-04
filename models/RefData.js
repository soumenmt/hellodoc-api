const mongoose = require("mongoose");

const RefDataSchema = mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  category: {
    type: String,
  },
  value: {
    type: String,
  },
});

module.exports = mongoose.model("ReferenceData", RefDataSchema);
