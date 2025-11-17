import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaUserTie, FaMoneyBillWave } from "react-icons/fa";

export default function AdminDashboard() {
    
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEmployees: 0,
        totalSalaries: 0,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.get(`${backendUrl}/api/dashboard/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setStats(res.data);
        }).catch((err) => {
            console.log(err);
    });}, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm">Total Users</h2>
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <FaUsers className="text-blue-500 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm">Total Employees</h2>
              <p className="text-3xl font-bold text-green-600">{stats.totalEmployees}</p>
            </div>
            <FaUserTie className="text-green-500 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm">Total Salaries</h2>
              <p className="text-3xl font-bold text-purple-600">{stats.totalSalaries}</p>
            </div>
            <FaMoneyBillWave className="text-purple-500 text-4xl" />
          </div>
        </div>

      </div>

    </div>
  );
}
