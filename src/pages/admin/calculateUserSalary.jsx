import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function CalculateUserSalary() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || {};

  const [baseSalary, setBaseSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [netSalary, setNetSalary] = useState("");

  const calculateNet = () => {
    const net =
      Number(baseSalary) +
      Number(allowance) +
      Number(overtimeHours) * Number(overtimeRate) -
      Number(deduction);
    setNetSalary(net);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      await axios.post(
        `${backendUrl}/api/salary/calculate`,
        {
          employee_id: user.id,
          base_salary: baseSalary,
          allowance,
          deductions: deduction,
          overtime_hours: overtimeHours,
          overtime_rate: overtimeRate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Salary calculated successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Error calculating salary");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 shadow-lg rounded bg-white">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Calculate Salary for {user.email}
      </h2>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Base Salary"
          value={baseSalary}
          onChange={(e) => setBaseSalary(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Allowance"
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Deductions"
          value={deduction}
          onChange={(e) => setDeduction(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Overtime Hours"
          value={overtimeHours}
          onChange={(e) => setOvertimeHours(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Overtime Rate"
          value={overtimeRate}
          onChange={(e) => setOvertimeRate(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={calculateNet}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Calculate Net
        </button>
        <p className="text-center font-bold text-lg">
          Net Salary: Rs.{netSalary || "-"}
        </p>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Save Salary
        </button>
      </div>
    </div>
  );
}
