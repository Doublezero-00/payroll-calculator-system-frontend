import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/auth/login/`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Login successful");
        localStorage.setItem("token", res.data.data.token);
        const user = res.data.user;
        if(user.role === 1) {
          setTimeout(() => navigate("/admin"), 1500);
        }else {
          setTimeout(() => navigate("/home"), 1500);
        }
        

      })
      .catch((error) => {
        toast.error("Login failed");
      });
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <form className="relative z-10 w-[400px] flex flex-col gap-5 bg-white/90 backdrop-blur-lg p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Login
        </h2>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Email address
          </label>
          <input
            type="text"
            value={email}
            placeholder="Enter email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={handleOnSubmit}
          className="mt-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm mt-2">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
