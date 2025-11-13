import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/auth/signup/`, {
        name,
        email,
        password,
      })
      .then(() => {
        toast.success("User registered successfully");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error registering user");
      });
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <form
        onSubmit={handleOnSubmit}
        className="relative z-10 w-[400px] flex flex-col gap-5 bg-white/90 backdrop-blur-lg p-10 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Create Account
        </h2>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Email address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          Register
        </button>

        <p className="text-center text-gray-600 text-sm mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
