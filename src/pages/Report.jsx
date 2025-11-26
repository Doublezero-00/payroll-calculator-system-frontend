import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Report() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/api/salary/my-salary`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        toast.success("Fetched salary details successfully");
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Can't get salary details");
      });
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/salary/my-salary/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "My_Salary_Report.pdf");
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      toast.error("Error downloading PDF");
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading salary report...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          My Salary Report
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> {data.user.name}</p>
          <p><span className="font-semibold">Base Salary:</span> Rs. {data.salary.base_salary}</p>
          <p><span className="font-semibold">Allowance:</span> Rs. {data.salary.allowance}</p>
          <p><span className="font-semibold">Deductions:</span> Rs. {data.salary.deductions}</p>
          <p><span className="font-semibold">Net Salary:</span> Rs. {data.salary.net_salary}</p>
        </div>

        <button
          onClick={handleDownload}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md transition-all duration-300"
        >
          Download Payslip PDF
        </button>
      </div>
    </div>
  );
}
