const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
var bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const twilio = require("twilio");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
const connectDB = async () => {
  console.log("inside", process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
connectDB();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

//Route Files
const doctors = require("./routes/doctors");
const patients = require("./routes/patients");
const doctoroffices = require("./routes/doctor_office");
const doctoravailiabilities = require("./routes/doctor_office_avaliability");
const appointments = require("./routes/appointment");
const slots = require("./routes/slots");
const patientappointment = require("./routes/createpatientappointment");
const user = require("./routes/user");
const review = require("./routes/review");

const app = express();

app.use(bodyParser.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//call twilio api for sending message

app.post("/api/messages", (req, res) => {
  console.log(req.body);
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: `${TWILIO_PHONE_NUMBER}`,
      to: req.body.to,
      body: req.body.message,
    })
    .then((message) => {
      console.log(message.body);
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//app.use(logger);

app.use("/api/v1/doctors", doctors);
app.use("/api/v1/patients", patients);
app.use("/api/v1/doctoroffices", doctoroffices);
app.use("/api/v1/doctoravailiabilities", doctoravailiabilities);
app.use("/api/v1/appointments", appointments);
app.use("/api/v1/slots", slots);
app.use("/api/v1/patientappointment", patientappointment);
app.use("/api/v1/users", user);
app.use("/api/v1/reviews", review);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
