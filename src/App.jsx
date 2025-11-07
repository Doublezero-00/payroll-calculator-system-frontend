import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from "react-hot-toast"
import AdminPage from "./pages/admin/AdminPage.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  )
}

export default App
