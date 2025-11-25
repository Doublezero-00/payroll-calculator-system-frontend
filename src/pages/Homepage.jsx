import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Report from "./Report.jsx";

export default function Homepage() {
  const [activePanel, setActivePanel] = useState("home");

  const navItems = [
    { name: "Home", key: "home" },
    { name: "Profile", key: "profile" },
    { name: "Report", key: "report" },
    { name: "Login", key: "login" },
    { name: "Signup", key: "signup" },
  ];

  const renderMainContent = () => {
    switch (activePanel) {
      case "home":
        return <Home />;
      case "profile":
        return <Profile />;
      case "report":
        return <Report />;
      case "login":
        return <Login setActivePanel={setActivePanel} />;
      case "signup":
        return <Signup setActivePanel={setActivePanel}/>;
    }
  };
  return (
    <div>
      <Header activePanel={activePanel} setActivePanel={setActivePanel} />
      {renderMainContent()}
    </div>
  );
}
