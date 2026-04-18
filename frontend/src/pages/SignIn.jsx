import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      type: type,
    };

    // console.log(userData);
    try{
        const res = await axios.post('http://localhost:5000/api/users/signup', userData);
        console.log(res);

        console.log(res.data)
        localStorage.setItem("token", res.data.token);
    }
    catch(err){
      console.log(err);
    }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role */}
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
