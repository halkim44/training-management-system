const config = require("../config/auth.config");
const db = require("../models");
const jwt = require("jsonwebtoken");

const Subject = db.subject;
exports.create = (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    stream: req.body.stream,
    lastModifiedBy: req.userId,
  });
  subject.save((err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.json({ message: "Subject was added successfully!", id: subject.id });
  });
};

exports.getAll = async (req, res) => {
  const limit = parseInt(req?.query?.limit) || 10;
  const page = parseInt(req?.query?.page) || 1;
  const sort = req?.query?.sort || {};
  let isSortInvalid = false;
  Object.keys(sort).forEach((key) => {
    sort[key] = parseInt(sort[key]);
    if (![1, -1].includes(sort[key])) {
      isSortInvalid = true;
    }
  });
  if (isSortInvalid) {
    res.status(404).send({ message: "Sort value is not valid!" });
    return;
  }

  const subjects = await Subject.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sort)
    .exec();

  if (!subjects?.length) {
    res.status(404).send({ message: " No Subjects Found!" });
    return;
  }
  res.send({
    subjects,
    limit,
    page,
  });
};
