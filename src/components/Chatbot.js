import { useState, useRef, useEffect } from "react";
import api from "../api/axios";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask anything about College Tracker 😊" }
  ]);
  const [input, setInput] = useState("");

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setTyping(true);

    try {
      const res = await api.post("/ai/ask", { question: userMsg.text });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.answer }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again." }
      ]);
    }

    setTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-button" onClick={() => setOpen(true)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body" ref={chatRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {typing && <div className="typing">Assistant is typing...</div>}
          </div>

          <div className="chatbot-footer">
            <input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
