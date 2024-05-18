const express = require("express");
const catchAsyncError = require("./utils/catchAsyncError");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/error");
const dotenv = require("dotenv").config();
const sequelize = require("./config/connectToDB");

// session
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalStrategy = require("./config/passport-local-strategy");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const myStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 1000 * 60 * 100,
});

app.use(
  session({
    name: "Swiftbank",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: myStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
