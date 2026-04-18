  // const mongoose = require("mongoose");
  import mongoose from "mongoose";

  const courseSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      courseDetails: {
        type: String,
        required: true,
      },

      videos: [
        {
          type: String, // video URL (YouTube / S3 / Cloudinary)
        },
      ],

      thumbnails: [
        {
          type: String, // Image URL
        },
      ],

      pdfs: [
        {
          type: String, // PDF URL
        },
      ],

      ratings: [
        {
          type: Number,
          default: 0,
        },
      ],

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // FK reference
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Course = mongoose.model("Course", courseSchema);
export default Course; // ✅ correct ES module export