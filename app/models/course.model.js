const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      name: { required: true, type: String },
      subjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
      type: { required: true, type: String, enum: ["BASIC", "DETAILED"] },
      lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  )
);
module.exports = Course;
