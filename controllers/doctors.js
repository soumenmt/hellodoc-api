const Doctor = require("../models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all doctors
// @route     GET /api/v1/doctors
// @access    Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get doctor profile based on their id
// @route     GET /api/v1/doctors/:id
// @access    Public
exports.findDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "doctorOffices"
    );
    if (!doctor) {
      return next(
        new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};
// @desc      Update doctor profile based on their id
// @route     PUT /api/v1/doctors/:id
// @access    Public
exports.updateOneDoctorById = async (req, res, next) => {
  try {
    const file = req.file;
    let imagepath;

    if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      imagepath = `${basePath}${fileName}`;
      req.body.image = imagepath;
    }

    console.log("request", req.body);
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Create New Doctor Profile
// @route     POST /api/v1/doctors
// @access    Public
exports.createDoctor = async (req, res, next) => {
  console.log("doctor profile creation request", req.body);
  // const file = req.file;
  // console.log("file", file);
  //const imageurl = "";
  // if (file != "undefined") {
  //   const fileName = file.filename;
  //   console.log("filename", fileName);
  //   console.log("request", req.body);
  //   const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  //   // const data = new FormData();
  //   // data.append('file', image);
  //   // data.append('upload_preset', 'hellodoc');
  //   // data.append("cloud_name", "dmewwcjro");
  //   // fetch("https://api.cloudinary.com/v1_1/dmewwcjro/image/upload", {
  //   //   method: "post",
  //   //   body: data
  //   // }).then(res => res.json()).
  //   //   then(data => {
  //   //     console.log('data',data);
  //   //     setImage(data.secure_url);
  //   //   }).catch(err => {
  //   //     console.log("An Error Occured While Uploading");
  //   //   })

  //   imageurl = `${basePath}${fileName}`;
  // } else {
  //   imageurl = req.body.image;
  // }

  var newdoctor = new Doctor({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    about: req.body.about,
    address: req.body.address,
    qualification: req.body.qualification,
    specialities: req.body.specialities,
    image: req.body.image,
  });
  try {
    const doctor = await newdoctor.save();

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      success: false,
    });
  }
};
// @desc      Update doctor profile based on their id
// @route     DELETE /api/v1/doctors/:id
// @access    Public
exports.deleteDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
