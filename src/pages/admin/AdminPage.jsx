import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';

export default function AdminPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${backendUrl}/api/auth/all-users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const users_data = res.data.usersData;
      setUsers(users_data);
    })
    .catch(() => {
      toast.error("Can't fetch users");
    })
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      <table className="w-full max-w-5xl border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Id</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.filter((user) => user.role === 2).map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">{user.id}</td>
              <td className="p-3 capitalize">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 flex gap-3">

                <button className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  <BiEdit size={18} />
                  <span>Edit</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  <FiDelete size={18} />
                  <span>Delete</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  <FaCalculator size={18} />
                  <span>Calculate Salary</span>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
