import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import ChatbotComponent from "./components/Navbar/ChatbotComponent";
import About from "./components/About";
import Solution from "./components/Solution";
import Feedback from "./components/Feedback";
import LandingPage from "./components/LandingPage";

const App = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  const handleProductsClick = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };

  const location = useLocation();
  const showHeaderFooter =
    location.pathname !== "/" &&
    (location.pathname === "/home" ||
      location.pathname === "/about" ||
      location.pathname === "/solution" ||
      location.pathname === "/feedback");

  return (
    <div className={`container ${theme}`}>
      {showHeaderFooter && (
        <>
          <Navbar
            theme={theme}
            setTheme={setTheme}
            onProductsClick={handleProductsClick}
          />
          {showChatbot && <ChatbotComponent />}
        </>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="/home" element={<Home theme={theme} />} />
        <Route path="/solution" element={<Solution theme={theme} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
