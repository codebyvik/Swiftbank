// send default pin mail and account activation/deactiavtion
const nodemailer = require("../config/nodemailer");

module.exports.accountCreated = async (data) => {
  let mailOptions = {
    from: "Swiftbank.official@gmail.com",
    to: data.to,
    subject: "Swiftbank - Welcome",
    html: `<h1 style="color:blue;text-align:center;" > Welcome to Swiftbank </h1> <br/> <p> Your account has been created </p> <br/><p> Your default transaction pin is 1234  </p> <br/> <p>Change the transaction pin after signing in</p>  <br/> <p> Once account is activated you'll be notified </p> <br/> <p> Regards <br/> Swiftbank </p>`,
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

module.exports.accountStatus = async (data) => {
  let mailOptions = {
    from: "Swiftbank.official@gmail.com",
    to: data.to,
    subject: `Swiftbank - Account ${data.message}`,
    html: `<p> Your account has been ${data.message} </p>  <br/> <p> Regards <br/> Swiftbank </p>`,
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
