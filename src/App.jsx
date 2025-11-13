import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from "react-hot-toast"
import AdminPage from "./pages/admin/AdminPage.jsx"
import UpdateUsers from './pages/admin/updateUsers.jsx'
import CalculateUserSalary from './pages/admin/calculateUserSalary.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users/edit" element={<UpdateUsers />} />
          <Route path="/admin/users/calculate-salary" element={<CalculateUserSalary />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  )
}

export default App
