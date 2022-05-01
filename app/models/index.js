const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const user = require("./user.model");
const role = require("./role.model");
const subject = require("./subject.model");
const course = require("./course.model");
const ROLES = ["user", "admin"];

module.exports = {
  mongoose,
  user,
  role,
  subject,
  ROLES,
  course,
};
