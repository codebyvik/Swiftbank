const User = require("../db/models/user");
const Auth = require("../db/models/auth");
const Accounts = require("../db/models/accounts");

const bcrypt = require("bcrypt");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");

module.exports.getUser = catchAsyncError(async (req, res, next) => {
  try {
    if (req.params.id != req.user.id || req.user.user_type != "customer") {
      return next(new AppError("You are not authorised ", 401));
    }
    return res.status(200).json({
      status: "success",
      message: "user fetched",
      user: req.user,
    });
  } catch (error) {
    console.log("error getting user", error);
    return next(new AppError("Error while updating profile ", 500));
  }
});

// ADMIN - GET ALL USERS
module.exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type != "admin") {
      return next(new AppError("You are not authorised ", 401));
    }
    const users = await User.findAll({ where: { user_type: "customer" } });

    return res.status(200).json({
      status: "success",
      message: "user fetched",
      users,
    });
  } catch (error) {
    console.log("error getting all users", error);
    return next(new AppError("Error while getting all users ", 500));
  }
});

// UPDATE PROFILE

module.exports.updateProfile = catchAsyncError(async (req, res, next) => {
  try {
    if (req.params.id != req.user.id) {
      return next(new AppError("You are not authorised ", 401));
    }

    await User.update(req.body, { where: { id: req.user.id } });

    const user = await User.findOne({ where: { id: req.user.id } });

    return res.status(200).json({
      status: "success",
      message: "profile updated successfully",
      user,
    });
  } catch (error) {
    console.log("error getting user", error);
    return next(new AppError("Error while updating profile ", 500));
  }
});

module.exports.updatePassword = catchAsyncError(async (req, res, next) => {
  try {
    if (req.params.id != req.user.id) {
      return next(new AppError("You are not authorised ", 401));
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    await Auth.update({ password: hash }, { where: { id: req.user.id } });
    return res.status(200).json({
      status: "success",
      message: "password updated successfully",
    });
  } catch (error) {
    console.log("error getting user", error);
    return next(new AppError("Error while updating profile ", 500));
  }
});
