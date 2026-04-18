import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:5000/api/course/courses/${id}`);
      console.log("Course Detail Data:", res.data.course);
      setCourse(res.data.course);
    };
    fetchCourse();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add',
        { courseId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      console.log("Add to Cart Response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

 if (course.length == 0) {
            <p>No course found.</p>
}



  return (
    <div className="max-w-4xl mx-auto mt-10">
        <div>{course.name}</div>
        {course.courseDetails && <p>{course.courseDetails}</p>}
        {
            course.videos?.map((videoUrl, index) => (
                <div key={index} className="my-4">
                    <video width="100%" height="400" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ))
        }

        {
            course.pdfs?.map((pdfUrl, index) => (
                <div key={index} className="my-4">
                    <object
                        data={pdfUrl}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    >
                        <p>
                            Unable to display PDF.
                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                                Download PDF
                            </a>
                        </p>
                    </object>
                </div>
            ))
        }

        <div onClick={handleAddToCart}>Add to Cart</div>
    </div>
  );
};

export default CourseDetail;
