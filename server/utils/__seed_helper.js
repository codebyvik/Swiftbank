const Accounts = require("../db/models/accounts");
const Branch = require("../db/models/branch");
const Transactions = require("../db/models/transactions");
const User = require("../db/models/user");
const Auth = require("../db/models/auth");
const Beneficiary = require("../db/models/beneficiaries");

const fs = require("node:fs");

const content = [
  { name: "vik", age: 20 },
  { name: "ram", age: 23 },
];

async function getAllUsersData(params) {
  try {
    const UsersData = await User.findAll();
    const AccountsData = await Accounts.findAll();
    const BranchData = await Branch.findAll();
    const TransactionsData = await Transactions.findAll();
    const AuthData = await Auth.findAll();

    const BeneficiaryData = await Beneficiary.findAll();

    const newData = {
      UsersData,
      AccountsData,
      BranchData,
      TransactionsData,
      AuthData,
      BeneficiaryData,
    };

    fs.writeFileSync("./test.json", JSON.stringify(newData));
    return;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { getAllUsersData };
// fs.writeFile("/Users/joe/test.txt", content, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // file written successfully
//   }
// });
