import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignIn from './pages/SignIn.jsx';
import CreateCourse from './pages/createCourse.jsx';
import Course from './pages/course.jsx';
import CourseDetail from './pages/courseDetail.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<div className="App">Hello World</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/home' element={<div className="App">

          <object
  data={"https://res.cloudinary.com/dn071sfsj/raw/upload/v1769015962/course_pdfs/cfez2sdfogawrm2nba6e.pdf"}
  type="application/pdf"
  width="100%"
  height="600px"
>
  <p>
    Unable to display PDF.
    <a href={"https://res.cloudinary.com/dn071sfsj/raw/upload/v1769015962/course_pdfs/cfez2sdfogawrm2nba6e.pdf"} target="_blank" rel="noopener noreferrer">
      Download PDF
    </a>
  </p>
</object>

        </div>} />
        <Route path='/course' element={<Course />} />
        <Route path='/cart' element={<div className="App">Cart Page</div>} />
        <Route path='/course/:id' element={<CourseDetail />} />
        <Route path='/createCourse' element={<CreateCourse />} />
      </Routes>
    </>
  )
}

export default App


