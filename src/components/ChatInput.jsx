import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
import MessageLoadingSpinner from "../assets/loading-spinner.gif";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [isLoading, setIsLoading] = useState(false);

  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            src={MessageLoadingSpinner}
            className="chat-message-loading-spinner"
          ></img>
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      if (isLoading || inputText === "") {
        return;
      }
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        name="chatInput"
        className="chat-input"
        placeholder="Send a message to Chatbot "
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}
