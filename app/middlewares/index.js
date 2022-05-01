const authJwt = require("./auth-jwt");
const verifySignUp = require("./verify-signup");
const verifySubject = require("./verify-subject");
const verifyCourse = require("./verify-course");

module.exports = {
  authJwt,
  verifySignUp,
  verifySubject,
  verifyCourse,
};
