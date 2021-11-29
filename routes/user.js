const express = require("express");
const {
  getUsers,
  findUserById,
  updateUserById,
  createUser,
  deleteUserById,
  userLogin,
} = require("../controllers/user");
const User = require("../models/User");

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");

router.route("/login").post(userLogin);

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router
  .route("/:id")
  .get(findUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
