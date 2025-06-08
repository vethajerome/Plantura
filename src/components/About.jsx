// import React from "react";
// import { Box, Typography, Divider, Container } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const ThemedSection = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   padding: theme.spacing(4),
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? theme.palette.grey[900]
//       : theme.palette.grey[100],
//   color:
//     theme.palette.mode === "dark"
//       ? theme.palette.common.white
//       : theme.palette.text.primary,
//   borderRadius: theme.shape.borderRadius,
//   boxShadow:
//     theme.palette.mode === "dark"
//       ? `0 4px 8px ${theme.palette.grey[800]}`
//       : `0 4px 8px ${theme.palette.grey[300]}`,
// }));

// const About = ({ theme }) => {
//   return (
//     <div>
//       <br></br>
//       <br></br>
//       <Container maxWidth="lg">
//         <ThemedSection>
//           <Typography variant="h4" gutterBottom fontWeight={"bold"}>
//             Our Mission
//           </Typography>
//           <Typography variant="body1">
//             Our mission is to empower farmers and gardeners with an easy-to-use
//             tool for diagnosing plant diseases. By leveraging advanced AI and
//             machine learning technologies, we aim to improve crop yields and
//             promote sustainable agricultural practices.
//           </Typography>
//         </ThemedSection>
//         <Divider />
//         <ThemedSection>
//           <Typography variant="h4" gutterBottom fontWeight={"bold"}>
//             How to Use
//           </Typography>
//           <Typography variant="body1">
//             <ol>
//               <li>Click the Detector section on Top of Navbar</li>
//               <li>Take a clear photo of the affected plant area.</li>
//               <li>
//                 Upload the photo to our application by clicking the "Choose
//                 File" button.
//               </li>
//               <li>Wait a few moments for our AI to analyze the image.</li>
//               <li>Receive a diagnosis and suggested treatment options.</li>
//             </ol>
//           </Typography>
//         </ThemedSection>
//         <Divider />
//         <ThemedSection>
//           <Typography variant="h4" gutterBottom fontWeight={"bold"}>
//             Technology Used
//           </Typography>
//           <Typography variant="body1">
//             Our application uses advanced machine learning algorithms,
//             particularly convolutional neural networks (CNNs), Deep learning, to
//             accurately diagnose plant diseases. The model is trained on a
//             comprehensive dataset, enabling it to identify a wide variety of
//             diseases with high accuracy and speed.
//           </Typography>
//         </ThemedSection>
//       </Container>
//     </div>
//   );
// };

// export default About;

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message"; // Import the message icon
import ChatbotComponent from "./Navbar/ChatbotComponent";

const ThemedSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 4px 8px ${theme.palette.grey[800]}`
      : `0 4px 8px ${theme.palette.grey[300]}`,
}));

const About = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false); // State to control chatbot visibility

  const chatbotRef = useRef(null); // Ref for chatbot container

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowChatbot(true); // Show chatbot when a language is selected
    handleClose();
  };

  const toggleChatbot = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot); // Toggle chatbot visibility
  };

  const open = Boolean(anchorEl);
  const id = open ? "language-menu" : undefined;

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

  // Handle click outside of the chatbot component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setShowChatbot(false); // Close the chatbot if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <br />
      <br />
      <Container maxWidth="lg">
        <Menu id={id} anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleLanguageSelect("English")}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("Hindi")}>
            Hindi
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("Tamil")}>
            Tamil
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("Telugu")}>
            Telugu
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("Kannada")}>
            Kannada
          </MenuItem>
        </Menu>

        {showChatbot && (
          <div ref={chatbotRef}>
            {" "}
            {/* Attach ref to the chatbot container */}
            <ChatbotComponent src={getChatbotSrc()} />
          </div>
        )}

        <ThemedSection>
          <Typography variant="h4" gutterBottom fontWeight={"bold"}>
            Our Mission
          </Typography>
          <Typography variant="body1">
            Our mission is to empower farmers and gardeners with an easy-to-use
            tool for diagnosing plant diseases. By leveraging advanced AI and
            machine learning technologies, we aim to improve crop yields and
            promote sustainable agricultural practices.
          </Typography>
        </ThemedSection>
        <Divider />
        <ThemedSection>
          <Typography variant="h4" gutterBottom fontWeight={"bold"}>
            How to Use
          </Typography>
          <Typography variant="body1">
            <ol>
              <li>Click the Detector section on Top of Navbar</li>
              <li>Take a clear photo of the affected plant area.</li>
              <li>
                Upload the photo to our application by clicking the "Choose
                File" button.
              </li>
              <li>Wait a few moments for our AI to analyze the image.</li>
              <li>Receive a diagnosis and suggested treatment options.</li>
            </ol>
          </Typography>
        </ThemedSection>
        <Divider />
        <ThemedSection>
          <Typography variant="h4" gutterBottom fontWeight={"bold"}>
            Technology Used
          </Typography>
          <Typography variant="body1">
            Our application uses advanced machine learning algorithms,
            particularly convolutional neural networks (CNNs), Deep learning, to
            accurately diagnose plant diseases. The model is trained on a
            comprehensive dataset, enabling it to identify a wide variety of
            diseases with high accuracy and speed.
          </Typography>
        </ThemedSection>
      </Container>
    </div>
  );
};

export default About;
