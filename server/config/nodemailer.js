const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "Swiftbank.official@gmail.com",
    pass: "nqnx oago blps zlbj",
  },
});

module.exports = {
  transporter: transporter,
};
