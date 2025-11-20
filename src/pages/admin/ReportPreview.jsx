import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ReportPreview() {
    const location = useLocation();
    const salaryId = location.state?.salaryId;

    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [salary, setSalary] = useState(null);
    const [user, setUser] = useState(null);
    const [pdfPath, setPdfPath] = useState("");

    useEffect(() => {
        if (!salaryId) return;

        axios.get(`${backendUrl}/api/salary/preview/${salaryId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setSalary(res.data.salary);
            setUser(res.data.user);
        })
        .catch((err) => console.error("Error preview:", err));
    }, [salaryId]);

    const generatePDF = () => {
        axios.post(`${backendUrl}/api/salary/create-pdf/${salaryId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setPdfPath(res.data.file_path))
        .catch((err) => console.error("PDF error:", err));
    };

    if (!salary || !user)
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;

    return (
        <div className="p-8 bg-gradient-to-br from-blue-100 to-gray-100 min-h-screen flex items-center justify-center">

            <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-blue-200 rounded-2xl p-10">

                <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900 tracking-wide drop-shadow">
                    Salary Report Preview
                </h1>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue-800 mb-3 border-b pb-2">Employee Details</h2>

                    <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <p><span className="font-semibold text-blue-900">Name:</span> {user.name}</p>
                        <p><span className="font-semibold text-blue-900">Employee ID:</span> {salary.employee_id}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-blue-800 mb-3 border-b pb-2">Salary Details</h2>

                    <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <p><span className="font-semibold text-blue-900">Base Salary:</span> Rs {salary.base_salary}</p>
                        <p><span className="font-semibold text-blue-900">Allowance:</span> Rs {salary.allowance}</p>
                        <p><span className="font-semibold text-blue-900">Deductions:</span> Rs {salary.deductions}</p>
                        <p><span className="font-semibold text-blue-900">OT Hours:</span> {salary.overtime_hours}</p>
                        <p><span className="font-semibold text-blue-900">OT Rate:</span> Rs {salary.overtime_rate}</p>
                        <p><span className="font-semibold text-blue-900">Net Salary:</span> Rs {salary.net_salary}</p>
                    </div>
                </div>

                <button
                    onClick={generatePDF}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 mt-8 rounded-xl text-lg font-semibold transition shadow-lg hover:shadow-xl"
                >
                    Generate PDF
                </button>

                {pdfPath && (
                    <a
                        href={backendUrl + pdfPath}
                        download
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 mt-4 rounded-xl text-lg font-semibold transition shadow-lg hover:shadow-xl"
                    >
                        Download PDF
                    </a>
                )}
            </div>
        </div>
    );
}
