const Accounts = require("../db/models/accounts");
const transactionModel = require("../db/models/transactions");

const sequelize = require("../config/connectToDB");

const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/AppError");

//  Send money to beneificiary account
module.exports.sendMoney = catchAsyncError(async (req, res, next) => {
  const { amount, beneficiary, description, transaction_PIN } = req.body;

  // to apply transaction so if anything fails transaction can be rolled back
  const transaction = await sequelize.transaction();

  try {
    if (req.user.user_type != "customer") {
      return next(new AppError("should be a customer to send money", 401));
    }
    // get sender account info and receiver account info
    const senderAccount = await Accounts.findOne({ where: { user_id: req.user.id } });
    const receiverAccount = await Accounts.findOne({
      where: { account_number: beneficiary.account_number },
    });

    // check if sender and receiver are same
    if (senderAccount.user_id === receiverAccount.user_id) {
      return next(new AppError("use add money option", 401));
    }

    // check if user has enough balance
    if (parseFloat(amount) > parseFloat(senderAccount.balance)) {
      return next(new AppError("you don't have sufficient balance", 401));
    }

    // check for transaction pin
    if (transaction_PIN != senderAccount.transaction_PIN) {
      return next(new AppError("wrong transaction pin", 401));
    }

    // transfer money
    const newTransaction = await transactionModel.create(
      {
        user_id: req.user.id,
        from_account_id: senderAccount.account_id,
        to_account_id: receiverAccount.account_id,
        amount_transferred: amount,
        transaction_type: "debit",
        description,
      },
      {
        transaction: transaction,
      }
    );

    // update balance in both accounts
    const balance = {
      senderBalance: parseFloat(senderAccount.balance) - parseFloat(amount),
      receiverBalance: parseFloat(receiverAccount.balance) + parseFloat(amount),
    };

    await senderAccount.update({ balance: balance.senderBalance });
    await receiverAccount.update({ balance: balance.receiverBalance });

    // add transaction to transaction table
    await transaction.commit();

    return res.status(200).json({
      status: "success",
      message: "transaction successfull",
      newTransaction,
    });
  } catch (error) {
    await transaction.rollback();
    console.log("error sending money", error);
    return next(new AppError("Something went wrong while sending money", 500));
  }
});

// Add money to self account
module.exports.addMoney = catchAsyncError(async (req, res, next) => {
  const { amount, description, transaction_PIN } = req.body;
  // to apply transaction so if anything fails transaction can be rolled back
  const transaction = await sequelize.transaction();

  try {
    if (req.user.user_type != "customer") {
      return next(new AppError("should be a customer to add money", 401));
    }
    // get account info
    const account = await Accounts.findOne({ where: { user_id: req.user.id } });

    // check for transaction pin
    if (transaction_PIN != account.transaction_PIN) {
      return next(new AppError("wrong transaction pin", 401));
    }

    // transfer money
    const newTransaction = await transactionModel.create(
      {
        user_id: req.user.id,
        from_account_id: account.account_id,
        to_account_id: account.account_id,
        amount_transferred: amount,
        transaction_type: "credit",
        description,
      },
      {
        transaction: transaction,
      }
    );
    const balance = parseFloat(account.balance) + parseFloat(amount);

    // update the balance
    await account.update({ balance: balance });

    await transaction.commit();

    return res.status(200).json({
      status: "success",
      message: "transaction successfull",
      transaction: newTransaction,
    });
  } catch (error) {
    await transaction.rollback();
    console.log("error adding money", error);
    return next(new AppError("Something went wrong while adding money", 500));
  }
});

// get one transaction by ID
module.exports.getOneTransaction = catchAsyncError(async (req, res, next) => {
  try {
    let transaction;
    // if user is customer then get the transaction which belongs to user
    //  else if the user is admin get the transaction details
    if (req.user.user_type != "admin") {
      transaction = await transactionModel.findOne({
        where: { user_id: req.user.id, transaction_id: req.params.id },
      });
    } else {
      transaction = await transactionModel.findOne({
        where: { transaction_id: req.params.id },
      });
    }

    // if transaction doesn't exist throw error
    if (!transaction) {
      return next(new AppError("transaction not found", 404));
    }

    return res.status(200).json({
      status: "success",
      message: "fetched transaction ",
      transaction,
    });
  } catch (error) {
    console.log("error while fetching transaction ", error);
    return next(new AppError("Something went wrong while fetching transaction", 500));
  }
});

// get all transactions
module.exports.getAllTransactions = catchAsyncError(async (req, res, next) => {
  // pagination , sends 10 results each time
  const page = req.query.page || 1; // current page
  const limit = 10; // limit is set to 10
  const offset = (parseInt(page) - 1) * limit; // calculate how many to skip
  //   sorting , by default descending
  const order = req.query.sort || "DESC";

  //   add to where query if trnsaction type exists
  let whereCondition = {};
  if (req.query.transactionType) {
    whereCondition.transaction_type = req.query.transactionType;
  }

  try {
    let transaction;

    // if user is customer send all transactions which belong to  current customer
    // else if it's admin send all transactions

    if (req.user.user_type != "admin") {
      whereCondition.user_id = req.user.id;

      transaction = await transactionModel.findAndCountAll({
        offset,
        limit,
        where: whereCondition,
        order: [["createdAt", order]],
      });
    } else {
      transaction = await transactionModel.findAndCountAll({
        offset,
        limit,
        where: whereCondition,
        order: [["createdAt", order]],
      });
    }

    return res.status(200).json({
      status: "success",
      message: "fetched all transactions",
      totalPages: Math.ceil(transaction?.count / limit),
      totalEntries: transaction?.count,
      transactions: transaction?.rows,
    });
  } catch (error) {
    console.log("error while fetching all transactions ", error);
    return next(new AppError("Something went wrong while fetching all transactions", 500));
  }
});
