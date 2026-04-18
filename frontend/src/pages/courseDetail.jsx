import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, FileText, PlayCircle, Loader2, BookOpen } from "lucide-react";

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

  const handleAddToCart = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        { courseId: id },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Add to Cart Response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (course.length === 0) {
    return (
      <div className="flex items-center justify-center py-32 gap-2 text-gray-400">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading course...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <BookOpen size={28} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
            {course.courseDetails && (
              <p className="text-indigo-100 text-sm leading-relaxed">{course.courseDetails}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(id)}
          className="mt-6 flex items-center gap-2 bg-white text-indigo-600 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all shadow"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      {/* Videos */}
      {course.videos?.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <PlayCircle size={20} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Video Lessons</h2>
            <span className="ml-auto text-xs text-gray-400">{course.videos.length} video{course.videos.length > 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-4">
            {course.videos.map((videoUrl, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
                  <PlayCircle size={14} className="text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">Lesson {index + 1}</span>
                </div>
                <video
                  className="w-full"
                  style={{ maxHeight: '420px' }}
                  controls
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PDFs */}
      {course.pdfs?.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Course Materials</h2>
            <span className="ml-auto text-xs text-gray-400">{course.pdfs.length} document{course.pdfs.length > 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-4">
            {course.pdfs.map((pdfUrl, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
                  <FileText size={14} className="text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">Document {index + 1}</span>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-indigo-600 hover:underline"
                  >
                    Open in new tab
                  </a>
                </div>
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                  className="block"
                >
                  <div className="flex items-center justify-center py-12 text-gray-500 text-sm gap-2">
                    <FileText size={16} />
                    <span>Unable to display PDF. </span>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                      Download PDF
                    </a>
                  </div>
                </object>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseDetail;
