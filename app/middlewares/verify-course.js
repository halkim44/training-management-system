const db = require("../models");
const Course = db.course;

const checkDuplicateCourse = (req, res, next) => {
  Course.findOne({
    name: req.body.name,
  }).exec((err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (subject) {
      res.status(400).send({
        message: "Oops, Failed add new Course! Course name is already in use!",
      });
      return;
    }
    next();
  });
};

module.exports = {
  checkDuplicateCourse,
};
