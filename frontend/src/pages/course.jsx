import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Loader2 } from 'lucide-react';

const Course = () => {
  const [courseData, setCourseData] = useState(null);
  const [search, setSearch] = useState('');
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

  const filtered = courseData?.courses?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Explore Courses</h1>
        <p className="text-gray-500 text-sm">Find something new to learn today</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Loading */}
      {!courseData && (
        <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading courses...</span>
        </div>
      )}

      {/* Empty */}
      {courseData && filtered?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <BookOpen size={40} strokeWidth={1.5} />
          <p className="text-sm">No courses found.</p>
        </div>
      )}

      {/* Grid */}
      {filtered && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/course/${course._id}`)}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-indigo-50 overflow-hidden">
                {course.thumbnails ? (
                  <img
                    src={course.thumbnails}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={36} className="text-indigo-300" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
                  {course.name}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                  {course.courseDetails}
                </p>
                <div className="mt-4">
                  <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    View Course →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Course;
