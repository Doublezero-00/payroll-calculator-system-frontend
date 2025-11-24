import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from "react-hot-toast"
import AdminPage from "./pages/admin/AdminPage.jsx"
import UpdateUsers from './pages/admin/updateUsers.jsx'
import CalculateUserSalary from './pages/admin/calculateUserSalary.jsx'
import ManageUsers from './pages/admin/manageUsers.jsx'
import UserSalaries from './pages/admin/userSalaries.jsx'
import UpdateSalary from './pages/admin/updateSalary.jsx'
import ReportPreview from './pages/admin/ReportPreview.jsx'
import Profile from './pages/Profile.jsx'
import Report from './pages/Report.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/report" element={<Report />}/>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/users/edit" element={<UpdateUsers />} />
          <Route path="/admin/users/calculate-salary" element={<CalculateUserSalary />} />
          <Route path="/admin/salaries" element={<UserSalaries />}/>
          <Route path="/admin/salaries/edit" element={<UpdateSalary />}/>
          <Route path="/admin/report-preview" element={<ReportPreview />}/>

        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  )
}

export default App
