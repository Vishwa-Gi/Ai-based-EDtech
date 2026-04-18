import React, { useState , useEffect} from 'react'
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const course = () => {

  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/course/getCourses');
        console.log("Course Data:", response.data);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {courseData ? (
        <ul>
          {courseData.courses.map(course => (
            <li key={course._id}>
              <h2>{course.name}</h2>
              <p>{course.courseDetails}</p>
              <img src={course.thumbnails} onClick={() => navigate(`/course/${course._id}`)} alt="" />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading courses...</p>
      )}
    </div>
  )
}

export default course
