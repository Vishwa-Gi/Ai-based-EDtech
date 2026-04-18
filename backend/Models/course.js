  const mongoose = require("mongoose");

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

  module.exports = mongoose.model("Course", courseSchema);