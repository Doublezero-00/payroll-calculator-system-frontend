import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="
      w-full h-[70px] shadow-lg 
      bg-gradient-to-r from-blue-600 to-blue-500 
      text-white flex items-center relative px-4
    ">

      <img 
        src="logo1.PNG" 
        alt="logo" 
        className="
          w-[60px] h-[60px] object-cover rounded-full border-2 border-white
          absolute left-4 shadow-md hover:scale-105 transition-transform
        "
      />

      <nav className="
        hidden md:flex gap-8 mx-auto text-lg font-medium
      ">
        <Link 
          to="/" 
          className="
            hover:text-blue-200 transition-colors 
            hover:underline underline-offset-4
          "
        >
          Home
        </Link>

        <Link 
          to="/profile" 
          className="
            hover:text-blue-200 transition-colors 
            hover:underline underline-offset-4
          "
        >
          Profile
        </Link>

        <Link 
          to="/report" 
          className="
            hover:text-blue-200 transition-colors 
            hover:underline underline-offset-4
          "
        >
          Report
        </Link>
      </nav>

      <div className="
        hidden md:flex gap-4 absolute right-6
      ">
        <Link 
          to="/login" 
          className="
            px-4 py-1 rounded-lg bg-white text-blue-600 font-semibold
            shadow-sm hover:bg-blue-100 transition-all
          "
        >
          Login
        </Link>

        <Link 
          to="/signup" 
          className="
            px-4 py-1 rounded-lg bg-green-400 text-white font-semibold
            shadow-md hover:bg-green-500 transition-all
          "
        >
          Register
        </Link>
      </div>

    </header>
  )
}
