const User = require("../db/models/user");
const Auth = require("../db/models/auth");
const Accounts = require("../db/models/accounts");
const ForgotPassword = require("../db/models/forgotpassword");

const bcrypt = require("bcrypt");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");
const { accountCreated, accountStatus } = require("../mail/account_mail");
const sendResetLinkMail = require("../mail/forgot_password");

module.exports.signup = catchAsyncError(async (req, res, next) => {
  // destructured data from req.body
  const { email, phone_pin, phone_number, password, user_type } = req.body;

  try {
    // check if user exists , if users exists return with 409
    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: email,
          },
          {
            phone_number: phone_number,
          },
        ],
      },
    });

    if (userExists) {
      return next(new AppError("email or phone number already exists", 409));
    }

    let newUser;

    if (user_type === "admin") {
      newUser = await User.create({ ...req.body, isActive: true });
    } else {
      newUser = await User.create({ ...req.body, isActive: false });
    }

    //   Hash password and insert into auth table
    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return next(new AppError("Something went wrong , please try again later", 500));
      }

      await Auth.create({
        user_id: newUser.id,
        email,
        phone_pin: phone_pin,
        phone_number: phone_number,
        password: hash,
      });
    });

    //     // if user type is customer then generate account number and add it to accounts table

    if (user_type === "customer") {
      // generate account number
      const newAccountnumber = `${phone_pin}${phone_number}`;

      await Accounts.create({
        user_id: newUser.id,
        account_number: newAccountnumber,
        balance: 0.0,
        account_type: req.body.account_type,
        transaction_PIN: "1234",
        branch_id: req.body.branch_id,
      });

      // send mail
      await accountCreated();
    }

    return res.status(200).json({
      status: "success",
      message: "user created succesfully",
      user: newUser,
    });
  } catch (err) {
    console.log("error in signup controller", err);

    return next(new AppError("Error while creating user", 500));
  }
});

// create session
module.exports.signin = catchAsyncError(async (req, res) => {
  return res
    .status(200)
    .json({ status: "success", message: "signed in successfully", user: req.user });
});

// signout user
module.exports.signout = catchAsyncError(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log("error signing out");
      return next(new AppError("Error while signing out ", 500));
    }
  });

  return res.status(200).json({
    status: "success",
    message: "signed out successfully",
  });
});

// send reset link
module.exports.sendResetLink = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  try {
    // check if user exists and if not send error
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return next(new AppError("User doesn't exist ", 404));
    }

    // if user exists then build mail template

    let digits = "0123456789";

    let OTP = "";
    let len = digits.length;
    // Function to generate OTP
    for (let i = 0; i < 4; i++) {
      OTP += await digits[Math.floor(Math.random() * len)];
    }

    const mailBody = {
      body: `<h1>Password Reset Instructions</h1> <br/> OTP : ${OTP} <br/>  <a href="http://localhost:3000/reset/${user.id}">Click here <a/>`,
    };

    const MailStatus = sendResetLinkMail(mailBody);
    if (!MailStatus) {
      return next(new AppError("Error while sending reset link ", 500));
    }

    const otpExists = await ForgotPassword.findOne({ where: { email: email } });

    if (otpExists) {
      await ForgotPassword.update({ OTP: OTP }, { where: { email: email } });
    } else {
      await ForgotPassword.create({ email: email, OTP: OTP });
    }

    return res.status(200).json({
      status: "success",
      message: "updated successfully",
    });
  } catch (error) {
    console.log("error getting user", error);
    return next(new AppError("Error while sending reset link ", 500));
  }
});

// toggle user status
module.exports.toggleUserStatus = catchAsyncError(async (req, res, next) => {
  const { isActive, id } = req.body;
  try {
    if (req.user.type === "customer") {
      return next(new AppError("Not authorised", 401));
    }
    // check if user exists and if not send error
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return next(new AppError("User doesn't exist ", 404));
    }

    user.update({ isActive: isActive });

    if (isActive === "true") {
      await accountStatus({ message: "Activated" });
    } else {
      await accountStatus({ message: "Deactivated" });
    }
    console.log(isActive === "true");

    return res.status(200).json({
      status: "success",
      message: "toggled successfully",
    });
  } catch (error) {
    console.log("error setting user status", error);
    return next(new AppError("Error while setting user status ", 500));
  }
});
