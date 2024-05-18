const express = require("express");
const catchAsyncError = require("./utils/catchAsyncError");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/error");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/index"));

app.use(
  "*",
  catchAsyncError(async (req, res, next) => {
    throw new AppError("route doesn't exist", 404);
  })
);

// handle errors
app.use(globalErrorController);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server is running at port : ${process.env.SERVER_PORT}`);
});
