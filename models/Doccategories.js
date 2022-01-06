const mongoose = require("mongoose");

const DoccategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  doctoravail: {
    type: String,
  },
  value: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

DoccategoriesSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Doccategories", DoccategoriesSchema);
