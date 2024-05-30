const Accounts = require("../db/models/accounts");
const Branch = require("../db/models/branch");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");
const Transactions = require("../db/models/transactions");
const { Op } = require("sequelize");
const User = require("../db/models/user");

// update transaction pin
module.exports.updateTransactionPin = catchAsyncError(async (req, res, next) => {
  const { current_PIN, new_PIN } = req.body;
  try {
    // if user is admin throw error
    if (req.user.user_type != "customer") {
      return next(new AppError("should be a customer to update pin", 401));
    }

    // check if current pin and old pin matches
    const account = await Accounts.findOne({ where: { user_id: req.user.id } });

    if (account?.transaction_PIN !== current_PIN) {
      return next(new AppError("new pin and previous pin doesn't match", 404));
    }
    // update the pin and send success message
    await Accounts.update({ transaction_PIN: new_PIN }, { where: { user_id: req.user.id } });

    return res.status(200).json({
      status: "success",
      message: "Pin updated succesfuuly",
    });
  } catch (error) {
    console.log("error updating transaction pin", error);
    return next(new AppError("Something went wrong while updating transaction pin", 500));
  }
});

// get details for customer dashboard

module.exports.dashboard = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type === "customer") {
      const account = await Accounts.findOne({
        where: { user_id: req.user.id },
        attributes: { exclude: ["transaction_PIN"] },
        include: Branch,
      });

      const transactions = await Transactions.findAll({
        offset: 0,
        limit: 5,
        order: [["createdAt", "DESC"]],
        where: {
          [Op.or]: [
            {
              from_account_id: account.account_id,
            },
            {
              to_account_id: account.account_id,
            },
          ],
        },
        include: [
          {
            model: Accounts,
            as: "To_account_id",
            attributes: { exclude: ["transaction_PIN"] },
            include: {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          },
          {
            model: Accounts,
            as: "From_account_id",
            attributes: { exclude: ["transaction_PIN"] },
            include: {
              model: User,
              attributes: ["first_name", "last_name"],
            },
            required: true,
          },
        ],
      });

      return res.status(200).json({
        status: "success",
        message: "fetched accounts and transactions",
        account,
        transactions,
      });
    } else if (req.user.user_type === "admin") {
      const accounts = await Accounts.findAll({
        offset: 0,
        limit: 5,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["transaction_PIN"] },
        include: Branch,
      });

      const transactions = await Transactions.findAll({
        offset: 0,
        limit: 5,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Accounts,
            as: "To_account_id",
            attributes: { exclude: ["transaction_PIN"] },
            include: {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          },
          {
            model: Accounts,
            as: "From_account_id",
            attributes: { exclude: ["transaction_PIN"] },
            include: {
              model: User,
              attributes: ["first_name", "last_name"],
            },
            required: true,
          },
        ],
      });

      return res.status(200).json({
        status: "success",
        message: "fetched accounts and transactions",
        accounts,
        transactions,
      });
    } else {
      return next(new AppError("User not authorised", 401));
    }
  } catch (error) {
    console.log("error getting dashboard details", error);
    return next(new AppError("Something went wrong while fetching dashboard details", 500));
  }
});

// get single account
module.exports.getSingleAccount = catchAsyncError(async (req, res, next) => {
  try {
    let account;

    if (req.user.user_type === "customer") {
      if (req.params.id !== req.user.id) {
        return next(new AppError("You are not authorised to get other accounts", 401));
      }
      account = await Accounts.findOne({
        where: { user_id: req.user.id },
        attributes: { exclude: ["transaction_PIN"] },
        include: Branch,
      });
    } else {
      account = await Accounts.findOne({
        where: { user_id: req.params.id },
        attributes: { exclude: ["transaction_PIN"] },
        include: [Branch, User],
      });
    }

    return res.status(200).json({
      status: "success",
      message: "fetched accounts details",
      account,
    });
  } catch (error) {
    console.log("error getting account details", error);
    return next(new AppError("Something went wrong while fetching account details", 500));
  }
});

// ADMIN : get all accounts

module.exports.getAllAccounts = catchAsyncError(async (req, res, next) => {
  try {
    if (req.user.user_type === "customer") {
      return next(new AppError("You are not Authorised ", 401));
    }

    // pagination , sends 10 results each time
    const page = req.query.page || 1; // current page
    const limit = 10; // limit is set to 10
    const offset = (parseInt(page) - 1) * limit; // calculate how many to skip
    //   sorting , by default descending
    const order = req.query.sort || "DESC";
    const name = req.query.name || "";

    const accounts = await Accounts.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", order]],
      attributes: { exclude: ["transaction_PIN"] },
      include: [
        {
          model: Branch,
          attributes: ["branch_name"],
        },
        {
          model: User,
          attributes: ["first_name", "last_name"],
          where: {
            [Op.or]: [
              { first_name: { [Op.iLike]: `%${name}%` } },
              { last_name: { [Op.iLike]: `%${name}%` } },
            ],
          },
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      message: "fetched all accounts details",
      totalPages: Math.ceil(accounts?.count / limit),
      totalEntries: accounts?.count,
      accounts: accounts?.rows,
    });
  } catch (error) {
    console.log("error getting account details", error);
    return next(new AppError("Something went wrong while fetching account details", 500));
  }
});
