const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      return res.json({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user._id,

      });
    })
    .catch((error) => {
      return res.status(400).json({
        err: "NOT able to save user in DB",
        message: error.message,
      });
    });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match",
        });
      }
      // create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      // put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      // send response to front end
      const { _id, name, lastname, email, role } = user;
      res.json({
        token,
        user: { _id, name, lastname, email, role },
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "USER email does not exists",
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};

// protected routers
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  // next is built-in in this middleware
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: "You are not ADMIN, ACCESS DENIED",
    });
  }
  next();
};
