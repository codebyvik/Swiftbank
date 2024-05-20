const Accounts = require("../db/models/accounts");

const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");

// update transaction pin
module.exports.updateTransactionPin = catchAsyncError(async (req, res, next) => {
  try {
    // if user is admin throw error
    if (req.user.user_type != "customer") {
      return next(new AppError("should be a customer to update pin", 401));
    }

    // update the pin and send success message
    await Accounts.update(
      { transaction_PIN: req.body.transaction_PIN },
      { where: { user_id: req.user.id } }
    );

    return res.status(200).json({
      status: "success",
      message: "Pin updated succesfuuly",
    });
  } catch (error) {
    console.log("error updating transaction pin", error);
    return next(new AppError("Something went wrong while updating transaction pin", 500));
  }
});
