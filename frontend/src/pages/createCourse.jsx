import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import { Video, FileText, Image, BookOpen, Upload } from "lucide-react";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [name, setName] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("courseDetails", courseDetails);
    formData.append("videos", video);
    formData.append("pdfs", pdf);
    formData.append("thumbnails", thumbnail);

    try {
      await axios.post(
        "http://localhost:5000/api/course/createCourse",
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // navigate("/courses");
    } catch (error) {
      console.error("Course creation failed");
    }
  };

  const FileInput = ({ label, icon: Icon, accept, onChange, file }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <label className={`flex items-center gap-3 w-full px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
        file ? "border-indigo-400 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 bg-white"
      }`}>
        <Icon size={18} className={file ? "text-indigo-600" : "text-gray-400"} />
        <span className={`text-sm ${file ? "text-indigo-700 font-medium" : "text-gray-500"}`}>
          {file ? file.name : `Choose ${label.toLowerCase()}...`}
        </span>
        <Upload size={14} className="ml-auto text-gray-400" />
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-indigo-100 p-2 rounded-xl">
            <BookOpen size={20} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create a Course</h1>
        </div>
        <p className="text-gray-500 text-sm ml-11">Share your knowledge with students</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Introduction to React"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Course Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Description</label>
            <textarea
              required
              rows={4}
              placeholder="Describe what students will learn in this course..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              onChange={(e) => setCourseDetails(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Upload Files</p>
            <div className="space-y-4">
              <FileInput
                label="Course Video"
                icon={Video}
                accept="video/*"
                file={video}
                onChange={(e) => setVideo(e.target.files[0])}
              />
              <FileInput
                label="Course PDF"
                icon={FileText}
                accept=".pdf"
                file={pdf}
                onChange={(e) => setPdf(e.target.files[0])}
              />
              <FileInput
                label="Thumbnail Image"
                icon={Image}
                accept="image/*"
                file={thumbnail}
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all mt-2"
          >
            Publish Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
