 const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Store OTPs temporarily
const otpStore = {};

// Gmail transporter
 const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("OTP Server is Running!");
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    // Remove OTP after 5 minutes
    setTimeout(() => {
      delete otpStore[email];
    }, 5 * 60 * 1000);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid OTP",
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});