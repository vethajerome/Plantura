// import React from "react";

// const ChatbotComponent = () => {
//   return (
//     <div style={styles.container}>
//       <iframe
//         title="Dialogflow Chatbot"
//         width="350"
//         height="430"
//         allow="microphone;"
//         src="https://console.dialogflow.com/api-client/demo/embedded/8d423b83-e863-4dac-a4b1-7ee2d87b745a"
//         // src="https://console.dialogflow.com/api-client/demo/embedded/fffba606-fce0-4dca-83e6-a055f3ce4103"
//         style={styles.iframe}
//       ></iframe>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     position: "fixed", // Fixed position to stay in place
//     top: "50%", // Center vertically
//     right: "0", // Align to the right
//     transform: "translateY(-50%)", // Adjust for vertical center
//     zIndex: 1000, // Ensure it stays on top of other elements
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "10px",
//     backgroundColor: "#fff", // Background color around the iframe
//     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
//     borderRadius: "8px", // Rounded corners
//   },
//   iframe: {
//     border: "none",
//     borderRadius: "8px",
//   },
// };

// export default ChatbotComponent;

import React from "react";

const ChatbotComponent = ({ src }) => {
  return (
    <div style={styles.container}>
      <iframe
        title="Dialogflow Chatbot"
        width="350"
        height="430"
        allow="microphone;"
        src={src}
        style={styles.iframe}
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: "50%",
    right: "0",
    transform: "translateY(-50%)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
  },
  iframe: {
    border: "none",
    borderRadius: "8px",
  },
};

export default ChatbotComponent;

