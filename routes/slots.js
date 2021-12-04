const express = require("express");
const {
  getSlots,
  findSlotById,
  updateSlotById,
  createSlot,
  deleteSlotById,
} = require("../controllers/slots");
const Slot = require("../models/Slots");

const router = express.Router();

router.route("/").get(advancedResults(Slot), getSlots).post(createSlot);

router
  .route("/:id")
  .get(findSlotById)
  .put(updateSlotById)
  .delete(deleteSlotById);

module.exports = router;
