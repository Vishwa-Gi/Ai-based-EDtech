import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Course from '../Models/course.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



export const createCourse = async (req, res) => {
  try {
    const { name, courseDetails } = req.body;
    if(!name || !courseDetails) {
      return res.status(400).json({ message: 'Name and Course Details are required' });
    }

    const createdBy = req.user._id;
    if(req.user.type !== 'teacher') {
      return  res.status(403).json({ message: 'Only teachers can create courses' });
    }
    console.log("Files:", req.body);
    console.log(req.files);
    
    const videoFiles = req.files['videos'] || [];
    const pdfFiles = req.files['pdfs'] || [];
    const thumbnailFiles = req.files['thumbnails'] || [];
    console.log("Video Files:", videoFiles, "PDF Files:", pdfFiles, "Thumbnail Files:", thumbnailFiles);

    let videoUrl=null, pdfUrl=null, thumbnailUrl=null;

    const videoPath = videoFiles?.[0]?.path;
    if (videoPath) {
      const uploadedVideo = await cloudinary.uploader.upload(videoPath, { resource_type: "auto" ,
  use_filename: true,
  unique_filename: false,});
      console.log("Video uploaded:", uploadedVideo);
      videoUrl = uploadedVideo.secure_url;
    }

    const pdfPath = pdfFiles?.[0]?.path;
    if (pdfPath) {
    const uploadedPdf = await cloudinary.uploader.upload(pdfPath, { resource_type: "raw",
  format: "pdf",
  folder: "course_pdfs" });
    pdfUrl = uploadedPdf.secure_url;
    console.log("PDF uploaded:", uploadedPdf);
    }

    const thumbnailPath = thumbnailFiles?.[0]?.path;
    if (thumbnailPath) {
    const uploadedThumbnail = await cloudinary.uploader.upload(thumbnailPath, { resource_type: "auto" ,
  use_filename: true,
  unique_filename: false,});
    thumbnailUrl = uploadedThumbnail.secure_url;
    }
    console.log(videoUrl, pdfUrl, thumbnailUrl);

    console.log("Uploaded to Cloudinary");
    
    const course = await Course.create({
      name,
      courseDetails,
        createdBy,
        videos: videoUrl ? [videoUrl] : [],
        pdfs: pdfUrl ? [pdfUrl] : [],
        thumbnails: thumbnailUrl ? [thumbnailUrl] : [],
    });
    res.status(201).json({ message: 'Course created successfully', course });
    // res.status(201).json("submisted")  }
    }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    console.log("Courses fetched:", courses);
    res.status(200).json({ courses });
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('createdBy', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ course });
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse = async (req, res) => {
  try{
    const { id } = req.params;
    const createdBy = req.user._id;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if(course.createdBy.toString() !== createdBy.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: 'Course deleted successfully' });
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, courseDetails } = req.body;
    const createdBy = req.user._id;
    const videoFiles = req.files['videos'] || [];
    const pdfFiles = req.files['pdfs'] || [];
    const thumbnailFiles = req.files['thumbnails'] || [];

    const videoPath = videoFiles?.[0]?.path;
    if (videoPath) {
      await cloudinary.uploader.upload(videoPath, { resource_type: "auto" });
    }

    const pdfPath = pdfFiles?.[0]?.path;
    if (pdfPath) {
      await cloudinary.uploader.upload(pdfPath, { resource_type: "raw" });
    }

    const thumbnailPath = thumbnailFiles?.[0]?.path;
    if (thumbnailPath) {
      await cloudinary.uploader.upload(thumbnailPath, { resource_type: "image" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if(course.createdBy.toString() !== createdBy.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    course.name = name || course.name;
    course.courseDetails = courseDetails || course.courseDetails;
    if (videoPath) {
      course.videos.push(videoFiles[0].path);
    }
    if (pdfPath) {
      course.pdfs.push(pdfFiles[0].path);
    }
    if (thumbnailPath) {
      course.thumbnails.push(thumbnailFiles[0].path);
    }
    await course.save();
    res.status(200).json({ message: 'Course updated successfully', course });
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};