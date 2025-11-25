import React, { useState, useEffect } from 'react';

export default function Header(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    props.setActivePanel('login');
  };

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

      <nav className="hidden md:flex gap-8 mx-auto text-lg font-medium">
        <button 
          onClick={() => props.setActivePanel('home')}
          className="hover:text-blue-200 transition-colors hover:underline underline-offset-4"
        >
          Home
        </button>

        <button 
          onClick={() => props.setActivePanel('profile')}
          className="hover:text-blue-200 transition-colors hover:underline underline-offset-4"
        >
          Profile
        </button>

        <button 
          onClick={() => props.setActivePanel('report')}
          className="hover:text-blue-200 transition-colors hover:underline underline-offset-4"
        >
          Report
        </button>
      </nav>

      <div className="hidden md:flex gap-4 absolute right-6">
        {!token ? (
          <>
            <button
              onClick={() => props.setActivePanel('login')}
              className="
                px-4 py-1 rounded-lg bg-white text-blue-600 font-semibold
                shadow-sm hover:bg-blue-100 transition-all
              "
            >
              Login
            </button>

            <button
              onClick={() => props.setActivePanel('signup')}
              className="
                px-4 py-1 rounded-lg bg-green-400 text-white font-semibold
                shadow-md hover:bg-green-500 transition-all
              "
            >
              Register
            </button>
          </>
        ) : (
          <button 
            onClick={handleLogout} 
            className="
              px-4 py-1 rounded-lg bg-red-500 text-white font-semibold
              shadow-md hover:bg-red-600 transition-all
            "
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
