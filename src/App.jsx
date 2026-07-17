import { useEffect, useState } from "react";
import { Chatbot } from 'supersimpledev';
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";

import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([]);


  useEffect(() => {
    // console.log("Running effect");

    Chatbot.addResponses({
      Almsaodi: "Hi! , I'm Abdullah Almsoadi.",
    });

    // console.log(Chatbot.additionalResponses);
  }, []);



  return (
    <div className="app-container">
      {chatMessages.length === 0 ? (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      ) : (
        <ChatMessages chatMessages={chatMessages} />
      )}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
