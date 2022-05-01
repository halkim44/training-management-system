const db = require("../models");

const Course = db.course;
const Subject = db.subject;

exports.create = (req, res) => {
  if (!req.body?.subjects?.length) {
    res.status(500).send({ message: "must specify at least one subject." });
    return;
  }
  Subject.find(
    {
      name: { $in: req.body.subjects },
    },
    (err, subjects) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      const course = new Course({
        name: req.body.name,
        subjects: subjects.map((subject) => subject._id),
        lastModifiedBy: req.userId,
        type: req.body.type,
      });
      course.save((err, course) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Course was added successfully!", id: course.id });
      });
    }
  );
};

exports.getAll = async (req, res) => {
  const filter = req?.query?.filter || {};
  const subjectFilter = filter?.subject;
  const streamFilter = filter?.stream;
  const typeFilter = filter?.type;
  const aggregatePipe = [];
  aggregatePipe.push({
    $lookup: {
      from: "subjects",
      localField: "subjects",
      foreignField: "_id",
      as: "subjects",
    },
  });
  if (subjectFilter?.length) {
    aggregatePipe.push({
      $match: {
        "subjects.name": subjectFilter,
      },
    });
  }
  if (streamFilter?.length) {
    aggregatePipe.push({
      $match: {
        "subjects.stream": streamFilter,
      },
    });
  }
  if (typeFilter?.length) {
    aggregatePipe.push({
      $match: {
        type: typeFilter,
      },
    });
  }

  const courses = await Course.aggregate(aggregatePipe).exec();

  if (!courses?.length) {
    res.status(404).send({ message: " No courses Found!" });
    return;
  }
  res.send({
    courses,
  });
};
