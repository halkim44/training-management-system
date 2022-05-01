const db = require("../models");
const { body } = require("express-validator");

const Subject = db.subject;

const createBodyValidators = [
  body("name").not().isEmpty().trim().escape(),
  body("stream").not().isEmpty().trim().escape(),
];

const checkDuplicateSubject = (req, res, next) => {
  Subject.findOne({
    name: req.body.name,
  }).exec((err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (subject) {
      res.status(400).send({
        message:
          "Oops, Failed add new Subject! Subject name is already in use!",
      });
      return;
    }
    next();
  });
};

module.exports = {
  checkDuplicateSubject,
  createBodyValidators,
};
