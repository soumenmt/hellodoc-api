const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get user profile based on their id
// @route     GET /api/v1/user/:id
// @access    Public
exports.findUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return next(
        new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};

// @desc      Create New User Profile
// @route     POST /api/v1/users
// @access    Public
exports.createUser = async (req, res, next) => {
  console.log(req.body);
  var newuser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
  });
  try {
    const user = await newuser.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      success: false,
    });
  }
};

// @desc      Update user profile based on their id
// @route     PUT /api/v1/user/:id
// @access    Public
exports.updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc      Update user profile based on their id
// @route     DELETE /api/v1/users/:id
// @access    Public
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.userLogin = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    return res.status(400).send("The user not found");
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      secret,
      { expiresIn: "1d" }
    );
    console.log("token", token);
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong!");
  }
};
