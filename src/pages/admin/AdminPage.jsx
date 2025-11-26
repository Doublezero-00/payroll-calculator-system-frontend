import React, { useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { useLocation, Outlet } from 'react-router-dom';
import ManageUsers from './manageUsers';
import UserSalaries from './userSalaries';
import AdminDashboard from './adminDashboard';
import Unauthorized from '../../components/Unauthorized';

export default function AdminPage() {
  const [activePanel, setActivePanel] = useState('dashboard');
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <AiOutlineLineChart />, key: 'dashboard' },
    { name: 'Manage Users', icon: <FaRegUser />, key: 'users' },
    { name: 'Manage Salaries', icon: <CiMoneyCheck1 />, key: 'salaries' },
    { name: 'Logout', icon: <FaRegUser />, key: 'logout' },
  ];

  const renderMainContent = () => {
    switch (activePanel) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users': 
        return <ManageUsers />;
      case 'salaries':
        return <UserSalaries />;
    }
  }

  const role = Number(localStorage.getItem("role"));

  if(role !== 1) {
    return <Unauthorized />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login'; 
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-blue-600 text-white flex flex-col shadow-lg">
        <div className="h-16 flex items-center justify-center text-2xl font-bold tracking-wide border-b border-blue-500">
          Admin Panel
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button key={item.key} onClick={() =>{if(item.key === 'logout') {handleLogout();} else {setActivePanel(item.key)} } } className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors text-left ${
              activePanel === item.key ? 'bg-blue-800' : 'hover: bg-blue-500'
            }`}> 
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[80vh]">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}
