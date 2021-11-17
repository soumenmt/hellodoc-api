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

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
connectDB();

//Route Files
const doctors = require("./routes/doctors");
const patients = require("./routes/patients");
const doctoroffices = require("./routes/doctor_office");
const doctoravailiabilities = require("./routes/doctor_office_avaliability");
const appointments = require("./routes/appointment");
const slots = require("./routes/slots");
const patientappointment = require("./routes/createpatientappointment");

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

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//app.use(logger);

app.use("/api/v1/doctors", doctors);
app.use("/api/v1/patients", patients);
app.use("/api/v1/doctoroffices", doctoroffices);
app.use("/api/v1/doctoravailiabilities", doctoravailiabilities);
app.use("/api/v1/appointments", appointments);
app.use("/api/v1/slots", slots);
app.use("/api/v1/patientappointment", patientappointment);

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
