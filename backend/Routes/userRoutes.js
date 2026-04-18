import express from "express";
import { signup, login, resetPasswordRequest, resetPassword } from "../Logics/userController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);

export default router;