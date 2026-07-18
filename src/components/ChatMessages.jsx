import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";
export function ChatMessages({ chatMessages }) {
  // const chatMessagesRef = React.useRef(null);
  // React.useEffect(() => {
  //   const containerElem = chatMessagesRef.current;

  //   if (containerElem) {
  //     containerElem.scrollTop = containerElem.scrollHeight;
  //   }
  // }, [chatMessages]);

  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            key={chatMessage.id}
            time={chatMessage.time}
            message={chatMessage.message}
            sender={chatMessage.sender}
          />
        );
      })}
    </div>
  );
}

// AutoScroll Custome Hook
function useAutoScroll(dependencies) {
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElem = containerRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}
