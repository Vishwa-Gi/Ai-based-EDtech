// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    type: {
      type: String,
      enum: ["student", "admin", "teacher"],
      default: "student",
    },

    profilePic: {
      type: String, // URL or file path
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;