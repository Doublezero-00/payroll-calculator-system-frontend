import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .get(`${backendUrl}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        toast.success("Profile loaded successfully");
      })
      .catch((err) => {
        console.error("PROFILE ERROR:", err.response?.data);
        setLoading(false);
        toast.error("Error loading profile");
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div
        className="
          bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full border border-gray-200 
          transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
          transform hover:-translate-y-1
        "
      >

        <div className="flex flex-col items-center">
          <div
            className="
              w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
              text-white flex items-center justify-center 
              text-5xl font-extrabold shadow-xl mb-5
              transform transition-all duration-300 hover:scale-110 hover:rotate-2
            "
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {user.name || "No Name"}
          </h1>

          <p className="text-gray-500 text-lg mt-1 italic">
            {user.email || "No Email"}
          </p>
        </div>

        <div className="w-full border-b my-6 border-gray-300"></div>

        <div className="space-y-5">
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold tracking-wide">User ID:</span>
            <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-xl shadow-sm">
              {user.id}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-semibold tracking-wide">Created At:</span>
            <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-xl shadow-sm">
              {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
