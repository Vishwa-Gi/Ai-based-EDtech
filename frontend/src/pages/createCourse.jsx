import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
//   const { token } = useContext(UserContext);
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

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Course Name"
          className="w-full border p-2"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Course Details"
          className="w-full border p-2"
          onChange={(e) => setCourseDetails(e.target.value)}
          required
        />

        <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        <input type="file" onChange={(e) => setPdf(e.target.files[0])} />
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
