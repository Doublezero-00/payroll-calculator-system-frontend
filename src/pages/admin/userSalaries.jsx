import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

export default function UserSalaries() {

  const [isLoading, setIsLoading] = useState(true);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios.get(`${backendUrl}/api/salary/all-salaries`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setSalaries(res.data.userSalaries || []);
      setIsLoading(false);
      toast.success("Salaries fetched successfully");

    }).catch((err) => {
      setSalaries([]);
      setIsLoading(false);
      toast.error("Can't fetch salaries");
    })
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading salaries...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full p-4">
      <div>
        <h1 className="flex justify-center items-center text-3xl font-bold text-gray-800 mb-6">User Salaries Page</h1>
      </div>
      <div className="bg-white">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="p-3 text-left">Salary ID</th>
                    <th className="p-3 text-left">Employee ID</th>
                    <th className="p-3 text-left">Base Salary</th>
                    <th className="p-3 text-left">Allowance</th>
                    <th className="p-3 text-left">Deductions</th>
                    <th className="p-3 text-left">Overtime Hours</th>
                    <th className="p-3 text-left">Overtime Rate</th>
                    <th className="p-3 text-left">NetSalary</th>
                    <th className="p-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {salaries.map((salary) => (
                  <tr key={salary.id} className="bg-white hover:bg-gray-100">
                    <td className="p-3">{salary.id}</td>
                    <td className="p-3">{salary.employee_id}</td>
                    <td className="p-3">{salary.base_salary}</td>
                    <td className="p-3">{salary.allowance}</td>
                    <td className="p-3">{salary.deductions}</td>
                    <td className="p-3">{salary.overtime_hours}</td>
                    <td className="p-3">{salary.overtime_rate}</td>
                    <td className="p-3">{salary.net_salary}</td>
                    <td className="p-3 flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                        <BiEdit size={18} />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        <MdDelete size={18} />
                        Delete
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        <HiOutlineDocumentReport size={18} />
                        Generate Report
                      </button>

                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}
