import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignIn from './pages/SignIn.jsx';
import CreateCourse from './pages/createCourse.jsx';
import Course from './pages/course.jsx';
import CourseDetail from './pages/courseDetail.jsx';
import Cart from './pages/cart.jsx';
import Navbar from './components/Navbar.jsx';

const hideNavbarOn = ['/', '/login', '/signup'];

function App() {
  const { pathname } = useLocation();
  const showNav = !hideNavbarOn.includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/course' element={<Course />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/course/:id' element={<CourseDetail />} />
        <Route path='/createCourse' element={<CreateCourse />} />
      </Routes>
    </div>
  );
}

export default App;
