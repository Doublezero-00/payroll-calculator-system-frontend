import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
export default function UpdateUsers() {
    const location = useLocation();
    const user = location.state?.user || {};

  const [id, setId] = useState(user.id || "");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "");
  const navigate = useNavigate();

  async function handleUpdateUser(id) {
    try {
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        await axios.put(`${backendUrl}/api/auth/edit/${id}`, {
            name,
            email,
            role: Number(role)
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        toast.success("User updated successfully");
        setTimeout(() => { navigate("/admin") }, 1000);
    }catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center p-6 bg-gray-100">
      <div className="w-[400px] mx-auto bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update User
        </h1>
        <div className="flex flex-col gap-4">
          <input
            disabled
            type="number"
            onChange={(e) => setId(e.target.value)}
            value={id}
            placeholder="ID"
            className="p-3 border rounded-md"
          />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            className="p-3 border rounded-md"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="p-3 border rounded-md"
          />
          <input
            type="number"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            placeholder="Role"
            className="p-3 border rounded-md"
          />
          <div className="flex justify between gap-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition" onClick={() => handleUpdateUser(id)}>Update User</button>
            <button className="w-full bg-gray-300 text-black py-3 rounded-md hover:bg-gray-400 transition" onClick={() =>  navigate("/admin")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
