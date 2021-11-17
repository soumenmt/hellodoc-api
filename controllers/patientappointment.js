const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

exports.createPatientAppointment = async (req, res, next) => {
  console.log(req.body);
  //get patient details from request create patient profile pass the patine id to next api call
  let patientid = "";
  var newpatient = new Patient({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
  });
  try {
    const patient = await newpatient.save();
    patientid = patient._id;
  } catch (err) {
    console.log("patient profile creation failed");
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
  //   if (patientid != "") {
  //     //call the create appointment api to create the appointment
  //     var newappointment = new Appointment({
  //       doctor_office_id: req.body.doctor_office_id,
  //       patient_id: patientid,
  //       appointment_date: req.body.appointment_date,
  //       start_time: req.body.start_time,
  //       end_time: req.body.end_time,
  //     });
  //     try {
  //       const appointment = await newappointment.save();

  //       res.status(201).json({
  //         success: true,
  //         data: appointment,
  //       });
  //     } catch (err) {
  //       res.status(400).json({
  //         success: false,
  //       });
  //     }
  //   } else {
  //     res.status(400).json({
  //       success: false,
  //     });
  //   }
};
