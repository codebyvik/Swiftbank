const User = require("../db/models/user");
const Auth = require("../db/models/auth");
const Accounts = require("../db/models/accounts");

const bcrypt = require("bcrypt");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");

module.exports.signup = catchAsyncError(async (req, res, next) => {
  // destructured data from req.body
  const {
    user_type,
    first_name,
    last_name,
    email,
    phone_number,
    phone_pin,
    avatar,
    user_gender,
    nationality,
    user_age,
    user_dateOfBirth,
    user_profession,
    user_maritalStatus,
    address,
    password,
  } = req.body;

  try {
    // check if user exists , if users exists return with 409
    const userExists = await User.findOne({ where: { email: email, phone_number: phone_number } });

    // console.log(userExists);

    if (userExists) {
      return next(new AppError("email or phone number already exists", 409));
    }

    const newUser = await User.create({
      user_type,
      first_name,
      last_name,
      email,
      phone_pin,
      phone_number,
      avatar,
      user_gender,
      nationality,
      user_age,
      user_dateOfBirth,
      user_profession,
      user_maritalStatus,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
    });

    //   Hash password and insert into auth table
    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return next(new AppError("Something went wrong , please try again later", 500));
      }

      await Auth.create({
        user_id: newUser.id,
        email,
        phone_pin,
        phone_number,
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
        account_type: "savings",
        transaction_PIN: "1234",
      });
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
  return res.status(200).json("signin success");
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
