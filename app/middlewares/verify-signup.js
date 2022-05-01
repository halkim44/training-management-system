const db = require("../models");
const { body } = require("express-validator");

const ROLES = db.ROLES;
const User = db.user;

const signupValidators = [
  body("username").notEmpty().trim().escape(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    ...(req?.userId?.length ? { _id: { $ne: req?.userId } } : {}),
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({
        message: "Oops, Failed to register! Username is already in use!",
      });
      return;
    }

    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({
          message: "Oops, Failed to register! Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Oops, Request failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  signupValidators,
};
module.exports = verifySignUp;
