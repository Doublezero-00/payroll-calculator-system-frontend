import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${backendUrl}/api/auth/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success("Users fetched successfully");
        const users_data = res.data.usersData || [];
        setUsers(users_data);
      })
      .catch(() => {
        toast.error("Can't fetch users");
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  async function DeleteUser(userId) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${backendUrl}/api/auth/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Can't delete user");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">No users found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="flex justify-center items-center text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3 capitalize">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate("/admin/users/edit", { state: { user } })}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    <BiEdit size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => DeleteUser(user.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <MdDelete size={18} />
                    Delete
                  </button>

                  {user.role === 2 && (
                    <button
                      onClick={() => navigate("/admin/users/calculate-salary", { state: { user } })}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      <FaCalculator size={18} />
                      Calculate Salary
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
