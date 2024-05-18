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

    return res.status(201).json(newUser);
  } catch (err) {
    console.log("error in signup controller", err);
    return next(new AppError("Error while creating user", 500));
  }
});

module.exports.getUsers = async (req, res) => {
  try {
    const account = await Accounts.findAll({ include: User });
    return res.status(200).json(account);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

// signin user

module.exports.signin = async (req, res) => {
  // destructured data from req.body
  //   const { email, password } = req.body;
  //   try {
  //     // check if user exists in database
  //     const user = await knex("auth").where({ email: email });
  //     //    if user exists proceed else return 404 , user not found
  //     if (user[0]) {
  //       // hash password and compare the has with database
  //       await bcrypt.compare(password, user[0].password, async function (err, result) {
  //         if (err) {
  //           console.log("error", err);
  //           return handleError(500, "Something went wrong , please try again later", res);
  //         }
  //         // if password and hash matched then get user from database and send user
  //         if (result) {
  //           const userData = await knex("users").where({ email: email });
  //           return res.status(200).json({ user: userData, message: "success" });
  //         } else {
  //           // if password not matched return error with
  //           return handleError(404, "Email & password doesn't match", res);
  //         }
  //       });
  //     } else {
  //       return handleError(404, "Email & password doesn't match", res);
  //     }
  //   } catch (error) {
  //     console.log("error while fetching user", error);
  //     return handleError(500, "Something went wrong while fetching user", res);
  //   }
};

// signout user
// TODO;
