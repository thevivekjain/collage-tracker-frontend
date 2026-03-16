import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from "react-icons/fa";
import api from "../api/axios";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your AI Assistant. How can I help you today? 😊" }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await api.post("/ai/ask", { question: userMsg.text });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "I'm having trouble connecting. Try again later." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="premium-chatbot-container">
      {/* Rectangular Floating Button */}
      {!open && (
        <motion.div 
          className="chatbot-trigger-btn"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRobot className="bot-icon" />
          <span>Ask AI</span>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div 
            className="chatbot-premium-window"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
          >
            {/* Header */}
            <div className="chatbot-premium-header">
              <div className="header-info">
                <div className="online-indicator"></div>
                <FaRobot />
                <span>AI Support</span>
              </div>
              <div className="header-actions">
                <button onClick={() => setOpen(false)}><FaTimes /></button>
              </div>
            </div>

            {/* Body */}
            <div className="chatbot-premium-body" ref={chatRef}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  className={`premium-msg ${msg.sender}`}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="msg-content">{msg.text}</div>
                </motion.div>
              ))}
              {typing && (
                <div className="premium-typing">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="chatbot-premium-footer">
              <input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="send-btn" onClick={sendMessage}>
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;