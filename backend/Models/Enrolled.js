const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // FK to Course
      required: true,
      unique: true, // one doc per course
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // FK to User
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
