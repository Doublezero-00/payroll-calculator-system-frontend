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
      .post(`${backendUrl}/auth/signup/`, {
        name,
        email,
        password,
      })
      .then(() => {
        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Error registering user");
      });
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center backdrop-blur-lg"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661771004026-9e0f74a4ed39?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870')",
      }}
    >
      <form
        onSubmit={handleOnSubmit}
        className="bg-white/90 backdrop-blur-md w-full max-w-md h-[500px] rounded-2xl shadow-lg p-8 flex flex-col gap-3"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h2>

        <label className="text-gray-700 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <label className="text-gray-700 font-medium">Email address</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <label className="text-gray-700 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-md"
        >
          Register
        </button>

        <p className="text-center text-gray-600 text-sm mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
