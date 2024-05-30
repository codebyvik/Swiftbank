const nodemailer = require("../config/nodemailer");

const sendResetLinkMail = async (data) => {
  console.log("data", data);
  let mailOptions = {
    from: "vikasvickycoorg@gmail.com",
    to: data.to,
    subject: "Swiftbank - Reset password",
    html: data.body,
  };

  const info = await nodemailer.transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      return false;
    } else {
      return true;
    }
  });

  console.log("Message sent:", info);
};

module.exports = sendResetLinkMail;
