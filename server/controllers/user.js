const User = require("../db/models/user");
const Auth = require("../db/models/auth");
const Accounts = require("../db/models/accounts");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");

// get current user
module.exports.sendCurrentUser = catchAsyncError(async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "user fetched",
      user: req.user,
    });
  } catch (error) {
    console.log("error in sending current user", error);
    return next(new AppError("You are not authorised ", 401));
  }
});

// get user through id
module.exports.getUser = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type != "admin") {
      return next(new AppError("You are not authorised ", 401));
    }
    const user = await User.findOne({ where: { id: req.params.id } });
    return res.status(200).json({
      status: "success",
      message: "user fetched",
      user,
    });
  } catch (error) {
    console.log("error getting user profile", error);
    return next(new AppError("Error while getting user profile ", 500));
  }
});

// ADMIN - GET ALL USERS
module.exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const page = req.query.page || 1; //current page
  const limit = 10; // limit is set to 10

  const offset = (parseInt(page) - 1) * limit; // calculate how many to skip
  const order = req.query.sort || "DESC"; //   sorting , by default descending

  try {
    if (req.user.user_type != "admin") {
      return next(new AppError("You are not authorised ", 401));
    }
    const users = await User.findAndCountAll({
      where: { user_type: "customer" },
      limit,
      offset,
      order: [["createdAt", order]],
    });

    return res.status(200).json({
      status: "success",
      message: "user fetched",
      totalCustomers: users?.count,
      totalPages: Math.ceil(parseInt(users?.count) / limit),
      users: users.rows,
    });
  } catch (error) {
    console.log("error getting all users", error);
    return next(new AppError("Error while getting all users ", 500));
  }
});

// UPDATE PROFILE

module.exports.updateProfile = catchAsyncError(async (req, res, next) => {
  console.log("body", req.body);
  console.log("file", req.file);
  const AVATAR_PATH = path.join("/uploads/users/avatars");

  try {
    if (req.params.id != req.user.id) {
      return next(new AppError("You are not authorised ", 401));
    }

    const user = await User.findOne({ where: { id: req.user.id } });

    if (req.file) {
      // console.log(fs.existsSync(path.join(__dirname, "..", AVATAR_PATH, "/", user.avatar)));
      // if avatar present delete the avatar
      if (user.avatar && fs.existsSync(path.join(__dirname, "..", AVATAR_PATH, "/", user.avatar))) {
        fs.unlinkSync(path.join(__dirname, "..", AVATAR_PATH, "/", user.avatar));
      }

      // this is saving the path of the uploaded file into the avatr field in the UserModel
      user.avatar = req.file.filename;
    }

    await user.update(req.body, { where: { id: req.user.id } });

    await user.save();

    if (req.body.curr_password) {
      const CurrentPasswordinDB = await Auth.findOne({ where: { user_id: req.user.id } });

      const PasswordMatches = await bcrypt.compare(
        req.body.curr_password,
        CurrentPasswordinDB.password
      );

      if (!PasswordMatches) {
        return new AppError("Current Password is incorrect", 401);
      }

      const hash = await bcrypt.hash(req.body.new_password, 10);
      await Auth.update({ password: hash }, { where: { user_id: req.user.id } });
    }
    return res.status(200).json({
      status: "success",
      message: "updated successfully",
      user,
    });
  } catch (error) {
    console.log("error getting user", error);
    return next(new AppError("Error while updating profile ", 500));
  }
});

module.exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return next(new AppError("User doesn't exist ", 404));
    }

    const hash = await bcrypt.hash(req.body.new_password, 10);
    await Auth.update({ password: hash }, { where: { user_id: user.id } });
    return res.status(200).json({
      status: "success",
      message: "updated successfully",
    });
  } catch (error) {
    console.log("error getting user", error);
    return next(new AppError("Error while updating profile ", 500));
  }
});
