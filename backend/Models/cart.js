const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // FK to User
        required: true,
        unique: true, // one cart per user
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
      }
    ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);