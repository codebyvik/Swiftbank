const Branch = require("../db/models/branch");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const Accounts = require("../db/models/accounts");
const { Op } = require("sequelize");

// add branch
module.exports.addBranch = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type !== "admin") {
      return next(new AppError("Not authorised ", 401));
    }
    const branch = await Branch.findOne({
      where: { IFSC: { [Op.iLike]: `%${req.body.IFSC}%` } },
    });

    if (branch) {
      return next(new AppError("IFSC code already exists", 403));
    }

    const newBranch = await Branch.create(req.body);

    return res.status(200).json({
      status: "success",
      message: "branch added",
      branch: newBranch,
    });
  } catch (error) {
    console.log("error in adding branch", error);
    return next(new AppError("something went wrong while ading branch", 500));
  }
});

// get all branches
module.exports.getAllBranches = catchAsyncError(async (req, res, next) => {
  try {
    const branches = await Branch.findAll();

    return res.status(200).json({
      status: "success",
      message: "branches fetched",
      branch: branches,
    });
  } catch (error) {
    console.log("error in fetching all branches", error);
    return next(new AppError("something went wrong while fetching all branches", 500));
  }
});

// get one branch details
module.exports.getBranchDetails = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type !== "admin") {
      return next(new AppError("Not authorised ", 401));
    }

    const branch = await Branch.findOne({ where: { branchId: req.params.id } });

    return res.status(200).json({
      status: "success",
      message: "branch fetched",
      branch,
    });
  } catch (error) {
    console.log("error in fetching branch details", error);
    return next(new AppError("something went wrong while fetching branch", 500));
  }
});

// delete the branch

module.exports.deleteBranch = catchAsyncError(async (req, res, next) => {
  const { new_branch, curr_branch } = req.body;
  try {
    if (req.user.user_type !== "admin") {
      return next(new AppError("Not authorised ", 401));
    }

    // to delete a branch first all the accounts in current branch should be migrated to new branch

    await Accounts.update({ branch_id: new_branch }, { where: { branch_id: curr_branch } });

    await Branch.destroy({ where: { branch_id: curr_branch } });

    return res.status(200).json({
      status: "success",
      message: "branch deleted",
    });
  } catch (error) {
    console.log("error in deleting branch ", error);
    return next(new AppError("something went wrong while deleting branch", 500));
  }
});

module.exports.updateBranchDetails = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type !== "admin") {
      return next(new AppError("Not authorised ", 401));
    }

    const branch = await Branch.findOne({
      where: { branchId: req.params.id },
    });

    if (!branch) {
      return next(new AppError("branch doesn't exist", 404));
    }

    branch.update(req.body, { where: { branchId: req.params.id } });

    return res.status(200).json({
      status: "success",
      message: "branch updated",
      branch,
    });
  } catch (error) {
    return next(new AppError("something went wrong while updating branch", 500));
  }
});
