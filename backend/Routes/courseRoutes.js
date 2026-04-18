// const express = require('express');
import express from "express";
import { createCourse , getAllCourses, getCourseById, deleteCourse, updateCourse } from "../Logics/courseController.js";
// const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../Logics/courseController');
// const protectedRoutes = require('../middleware/protectedRoutes');
import protectedRoutes from "../middleware/protectedRoutes.js";
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/createCourse', protectedRoutes, upload.fields(
    [{
        name:"videos", maxCount: 1
    },
    {
        name:"pdfs", maxCount: 1
    },
    {
        name:"thumbnails", maxCount: 1
    }
    ]
) , createCourse);
router.get('/getCourses', getAllCourses);
router.get('/courses/:id', getCourseById);
router.put('/courses/:id', protectedRoutes, upload.fields(
    [{
        name:"videos", maxCount: 1
    },
    {
        name:"pdfs", maxCount: 1
    }
    ]
) , updateCourse);
router.delete('/courses/:id', protectedRoutes, deleteCourse);

export default router;