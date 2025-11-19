import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdateSalary() {
    const location = useLocation();
    const salary = location.state?.salary || {};
    const navigate = useNavigate();

    const [id, setId] = useState(salary.id || "");
    const [employeeId, setEmployeeId] = useState(salary.employee_id || "");
    const [baseSalary, setBaseSalary] = useState(salary.base_salary || "");
    const [allowance, setAllowance] = useState(salary.allowance || "");
    const [deductions, setDeductions] = useState(salary.deductions || "");
    const [overtimeHours, setOvertimeHours] = useState(salary.overtime_hours || "");
    const [overtimeRate, setOvertimeRate] = useState(salary.overtime_rate || "");
    const [netSalary, setNetSalary] = useState(salary.net_salary || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const total = Number(baseSalary) + Number(allowance) + Number(overtimeHours) * Number(overtimeRate) - Number(deductions);
        setNetSalary(total);
    }, [baseSalary, allowance, deductions, overtimeHours, overtimeRate])

    const handleUpdateSalary = () => {
        if(!baseSalary || !allowance || !deductions) {
            toast.error("Base salary, allowance and deductions cannot be empty");
            return;
        }

        setLoading(true);

        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.put(`${backendUrl}/api/salary/edit/${id}`, {
            base_salary: baseSalary,
            allowance: allowance,
            deductions: deductions,
            overtime_hours: overtimeHours,
            overtime_rate: overtimeRate,
            net_salary: netSalary
        }, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success("Salary updated successfully");
            setTimeout(() => navigate("/admin"), 1000);
        }).catch((err) => {
            toast.error("Can't update salary");
        }).finally(() => setLoading(false));
    }

  return (
    <div className="h-screen w-full flex flex-row justify-center items-center p-6 bg-gray-100">
      <div className="h-[650px] w-[400px] mx-auto bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Salary
        </h1>
        <div className="flex flex-col gap-3">
            <input disabled type="number" onChange={(e) => setId(e.target.value)} value={id} placeholder="ID" className="p-3 border rounded-md" />
            <input disabled type="number" onChange={(e) => setEmployeeId(e.target.value)} value={employeeId} placeholder="Employee ID" className="p-3 border rounded-md" />
            <input type="number" onChange={(e) => setBaseSalary(e.target.value)} value={baseSalary} placeholder="Base Salary" className="p-3 border rounded-md" />
            <input type="number" onChange={(e) => setAllowance(e.target.value)} value={allowance} placeholder="Allowance" className="p-3 border rounded-md" />
            <input type="number" onChange={(e) => setDeductions(e.target.value)} value={deductions} placeholder="Deductions" className="p-3 border rounded-md" />
            <input type="number" onChange={(e) => setOvertimeHours(e.target.value)} value={overtimeHours} placeholder="Overtime Hours" className="p-3 border rounded-md" />
            <input type="number" onChange={(e) => setOvertimeRate(e.target.value)} value={overtimeRate} placeholder="Overtime Rate" className="p-3 border rounded-md" />
            <input type="number" onChange={(e) => setNetSalary(e.target.value)} value={netSalary} placeholder="Net Salary" className="p-3 border rounded-md" />
            <div className="flex justify between gap-4">
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition" onClick={handleUpdateSalary} disabled={loading}>
                    {loading ? "Updating..." : "Update Salary"}
                </button>
                <button className="w-full bg-gray-300 text-black py-3 rounded-md hover:bg-gray-400 transition" onClick={() => navigate("/admin")}>Cancel</button>
            </div>
        </div>
     </div>
    </div>
  )
}
