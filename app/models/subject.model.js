const mongoose = require("mongoose");

const Subject = mongoose.model(
  "Subject",
  new mongoose.Schema(
    {
      name: String,
      stream: String,
      lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  )
);
module.exports = Subject;
