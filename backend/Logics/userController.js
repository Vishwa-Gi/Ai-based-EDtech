// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// const User = require('../Models/user.js');
import User from '../Models/user.js';
// const Otp = require('../Models/otp.js');
import Otp from '../Models/otp.js';
// const {sendEmail} = require('../utils/sendEmail.js');
import sendEmail from '../utils/sendEmail.js';
// const otpGenerator = require('otp-generator');
import otpGenerator from 'otp-generator';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, type} = req.body;
    //console.log(req.body);

    if(!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      type,
    });

    res.status(201).json({ message: "User created successfully", userId: user._id, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    if(!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const otpCode = otpGenerator.generate(6, {digits: true, upperCaseAlphabets: false, specialChars: false, alphabets: false, lowerCaseAlphabets: false});
    const otp = new Otp({ email, otp: otpCode, expiresAt: Date.now() + 15 * 60 * 1000 });
    await otp.save();
    console.log(otp);
    await sendEmail(email, "Password Reset OTP", `Your OTP code is: ${otpCode}`);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne({ email }, { password: hashedPassword });
    await Otp.deleteOne({ _id: otpRecord._id });
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};