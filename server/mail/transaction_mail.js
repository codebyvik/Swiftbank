const nodemailer = require("../config/nodemailer");

module.exports.SentMail = async (data) => {
  let mailOptions = {
    from: "vikasvickycoorg@gmail.com",
    to: data.to,
    subject: "Swiftbank - New Transaction ",
    html: `<h6>tansaction successfull</h6> <br/> Rs.${data.amount} sent to  ${data.user}`,
  };

  const info = await nodemailer.transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      return false;
    } else {
      return true;
    }
  });
};

module.exports.ReceivedMail = async (data) => {
  let mailOptions = {
    from: "vikasvickycoorg@gmail.com",
    to: data.to,
    subject: "Swiftbank - New Transaction",
    html: `<h6> Rs.${data.amount}  Money Receieved from  ${data.user}</h6>  `,
  };

  const info = await nodemailer.transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      return false;
    } else {
      return true;
    }
  });
};
