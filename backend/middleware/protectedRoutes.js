// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// const User = require('../Models/user.js');
import User from '../Models/user.js';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.userId);
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protectedRoutes;