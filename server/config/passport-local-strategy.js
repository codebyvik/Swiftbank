const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../db/models/user"); // USER MODEL
const Auth = require("../db/models/auth");

// Local authentication using email and password using passport.js

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },

    // funtion to authenticate user
    async function (req, email, password, done) {
      try {
        const userAuth = await Auth.findOne({ where: { email: email } });

        if (userAuth) {
          // if user exists check password
          const isPasswordMatched = await bcrypt.compare(password, userAuth.password);
          if (isPasswordMatched) {
            const user = await User.findOne({ where: { email: email } });
            return done(null, user);
          }
          return done(null, false);
        }

        return done(null, false);
      } catch (error) {
        console.log("error in passport local", error);
        return done(error);
      }
    }
  )
);

// serialising the user to decide which key to keep in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// de-serialising the user to decide which key to keep in the cookies

passport.deserializeUser(async function (id, done) {
  try {
    User.findByPk(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        console.log("Error in local auth", err);
        return done(err);
      });
  } catch (error) {
    console.log("error in deserializeUser", error);
    return done(error);
  }
});

// creating checkAuthentication function to check if the user is logged in
passport.checkAuthentication = function (req, res, next) {
  // if user logged in then pass the request to nxt function (controller function)
  // isAuthenticated() is added to req by passport
  if (req.isAuthenticated()) {
    return next();
  }
  // if user is not logged in
  return res.status(401).json({
    status: "fail",
    message: "not authorised , please signin to continue",
  });
};

module.exports = passport;
