// const express = require("express");
import express from "express";
const app = express();
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;

// const userRoutes = require("./Routes/userRoutes");
import userRoutes from "./Routes/userRoutes.js";
// const courseRoutes = require("./Routes/courseRoutes");
import courseRoutes from "./Routes/courseRoutes.js";

import cartRouter from "./Routes/cartRouter.js";

// const connectDB = require("./config/config");
import connectDB from "./config/config.js";
//const protectedRoutes = require("./middleware/protectedRoutes");
import protectedRoutes from "./middleware/protectedRoutes.js";
import cors from "cors";
// Connect to MongoDB

connectDB();
app.use(cors());

app.use(express.json());
// console.log(userRoutes);
app.use("/api/users", userRoutes);
// console.log(courseRoutes);
app.use("/api/course", courseRoutes);

app.use("/api/cart", cartRouter);

app.get("/test",protectedRoutes, (req, res) => {
  console.log(req.user);
  res.send("Protected route accessed");
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
