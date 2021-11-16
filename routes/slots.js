const express = require("express");
const {
  getSlots,
  findSlotById,
  updateSlotById,
  createSlot,
  deleteSlotById,
} = require("../controllers/slots");

const router = express.Router();

router.route("/").get(getSlots).post(createSlot);

router
  .route("/:id")
  .get(findSlotById)
  .put(updateSlotById)
  .delete(deleteSlotById);

module.exports = router;
