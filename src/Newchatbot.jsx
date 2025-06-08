import React, { useEffect } from 'react';

// DialogflowMessenger Component
const Newchatbot = () => {
  useEffect(() => {
    // Dynamically load the Dialogflow Messenger script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Plantura"
      agent-id="8d423b83-e863-4dac-a4b1-7ee2d87b745a"
      language-code="en"
    ></df-messenger>
  );
};

export default Newchatbot;
