import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo_light from "../../assets/logo-black-png.png";
import logo_dark from "../../assets/logo-white-bg.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import ChatbotComponent from "./ChatbotComponent";

const Navbar = ({ theme, setTheme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isListening, setIsListening] = useState(false); // For Web Speech API state
  const navigate = useNavigate();
  const chatbotRef = useRef(null);

  const toggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/solution?search=${searchQuery}`);
    }
  };

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowLanguageMenu(true);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowChatbot(true);
    setShowLanguageMenu(false);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
    setShowLanguageMenu(false);
  };

  const getChatbotSrc = () => {
    switch (selectedLanguage) {
      case "English":
        return "https://bot.dialogflow.com/8d423b83-e863-4dac-a4b1-7ee2d87b745a";
      case "Tamil":
        return "https://console.dialogflow.com/api-client/demo/embedded/fffba606-fce0-4dca-83e6-a055f3ce4103";
      case "Hindi":
        return "https://console.dialogflow.com/api-client/demo/embedded/82b3f91e-dc4a-4958-b744-55a88ab217dc";
      case "Telugu":
        return "https://console.dialogflow.com/api-client/demo/embedded/6947745d-dc60-4805-83ed-93e36b76cd46";
      case "Kannada":
        return "https://console.dialogflow.com/api-client/demo/embedded/c61b5d80-1273-4fb2-893a-4298b45147de";
      default:
        return null;
    }
  };

  const startVoiceRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes("detector")) navigate("/home");
      if (transcript.includes("about")) navigate("/about");
      if (transcript.includes("feedback")) navigate("/feedback");
      if (transcript.includes("more diseases")) navigate("/solution");
      if (transcript.includes("logout")) navigate("/");
    };
    recognition.start();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setShowChatbot(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openLanguageMenu = Boolean(anchorEl);
  const id = openLanguageMenu ? "language-menu" : undefined;

  return (
    <div className="navbar">
      <div className="logo-container">
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="Logo"
          className="logo"
        />
        <span className="brand-name">
          <i>
            <b>PLANTURA</b>
          </i>
        </span>
        &emsp;
      </div>

      <ul>
        <li onClick={() => navigate("/home")}>Detector</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/feedback")}>FeedBack</li>
        <li onClick={() => navigate("/solution")}>More Diseases</li>
        <li onClick={handleLanguageClick}>AI</li>
        {/* Voice Recognition Button */}
        <li
          onClick={startVoiceRecognition}
          className={isListening ? "listening" : ""}
        >
          {isListening ? "Listening..." : "Navigate"}
        </li>
        <li onClick={() => navigate("/")}>Logout</li>
      </ul>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt="Search Icon"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>

      <img
        onClick={toggleMode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt="Toggle Icon"
        className="toggle-icon"
      />

      <Menu
        id={id}
        anchorEl={anchorEl}
        open={showLanguageMenu}
        onClose={handleCloseLanguageMenu}
      >
        <MenuItem onClick={() => handleLanguageSelect("English")}>
          English
        </MenuItem>
        <MenuItem onClick={() => handleLanguageSelect("Hindi")}>Hindi</MenuItem>
        <MenuItem onClick={() => handleLanguageSelect("Tamil")}>Tamil</MenuItem>
        <MenuItem onClick={() => handleLanguageSelect("Telugu")}>
          Telugu
        </MenuItem>
        <MenuItem onClick={() => handleLanguageSelect("Kannada")}>
          Kannada
        </MenuItem>
      </Menu>

      {showChatbot && (
        <div
          ref={chatbotRef}
          style={{ position: "absolute", bottom: 20, right: 20 }}
        >
          <ChatbotComponent src={getChatbotSrc()} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
