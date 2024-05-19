const User = require("../db/models/user");
const Auth = require("../db/models/auth");
const Accounts = require("../db/models/accounts");
const Beneficiary = require("../db/models/beneficiaries");

const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");

module.exports.addBenefeciary = catchAsyncError(async (req, res, next) => {
  const { name, bank_name, account_number, transfer_limit } = req.body;

  try {
    if (req.params.id != req.user.id || req.user.user_type != "customer") {
      return next(new AppError("Not authorised", 401));
    }

    const account = await Accounts.findOne({ where: { account_number: account_number } });

    if (!account) {
      return next(new AppError("Account doesn't exist", 404));
    }

    if (account.user_id === req.user.id) {
      return next(new AppError("you can't add your account as beneficiary", 404));
    }

    const checkBeneficiary = await Beneficiary.findOne({
      where: { account_number: account_number, customer_id: req.user.id },
    });

    if (checkBeneficiary) {
      return next(new AppError("Account number already added to another beneficiary", 404));
    }

    const beneficiary = await Beneficiary.create({
      customer_id: req.user.id,
      name,
      bank_name,
      account_number,
      transfer_limit,
    });

    //  customer_id = user
    //  transfer_limit = set it here

    return res.status(200).json({
      status: "success",
      message: "beneficiary added successfully",
      beneficiary,
    });
  } catch (error) {
    console.log("Error while adding beneficiary", error);
    return next(new AppError("Error while adding beneficiary", 404));
  }
});

module.exports.getAllBeneficiaries = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type != "customer") {
      return next(new AppError("Not authorised", 401));
    }
    const beneficiaries = await Beneficiary.findAll({ where: { customer_id: req.user.id } });

    return res.status(200).json({
      status: "success",
      message: "beneficiaries fetched successfully",
      beneficiaries,
    });
  } catch (error) {
    console.log("Error while adding beneficiary", error);
    return next(new AppError("Error while adding beneficiary", 404));
  }
});

module.exports.deleteBeneficiary = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type != "customer") {
      return next(new AppError("Not authorised", 401));
    }

    const beneficiary = await Beneficiary.findOne({
      where: { beneficiary_id: req.params.id, customer_id: req.user.id },
    });

    if (!beneficiary) {
      return next(new AppError("Beneficiary doesn't exist", 401));
    }

    await beneficiary.destroy();
    return res.status(200).json({
      status: "success",
      message: "beneficiary deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting beneficiary", error);
    return next(new AppError("Error while deleting beneficiary", 404));
  }
});

module.exports.updateBeneficiary = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type != "customer") {
      return next(new AppError("Not authorised", 401));
    }

    const beneficiary = await Beneficiary.findOne({
      where: { beneficiary_id: req.params.id, customer_id: req.user.id },
    });

    if (!beneficiary) {
      return next(new AppError("Beneficiary doesn't exist", 401));
    }

    const updatedBeneficiary = await beneficiary.update(req.body);

    // const beneficiaries = Beneficiary.findAll({ where: { customer_id: req.user.id } });

    return res.status(200).json({
      status: "success",
      message: "beneficiary updated successfully",
      beneficiary: updatedBeneficiary,
    });
  } catch (error) {
    console.log("Error while deleting beneficiary", error);
    return next(new AppError("Error while updating beneficiary", 404));
  }
});
