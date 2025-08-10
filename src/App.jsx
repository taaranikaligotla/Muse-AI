import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("museChatSessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    if (currentChatId !== null) {
      localStorage.setItem(
        `museChatHistory_${currentChatId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, currentChatId]);

  useEffect(() => {
    if (currentChatId !== null) {
      const savedMessages = localStorage.getItem(`museChatHistory_${currentChatId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, [currentChatId]);

  const startNewChat = () => {
    const newId = Date.now();
    const updatedHistory = [
      { id: newId, title: `Muse Chat - ${new Date().toLocaleTimeString()}` },
      ...chatHistory,
    ];
    setChatHistory(updatedHistory);
    localStorage.setItem("museChatSessions", JSON.stringify(updatedHistory));
    setMessages([]);
    setCurrentChatId(newId);
  };

  const loadChat = (id) => {
    setCurrentChatId(id);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, darling ☀️";
    if (hour < 18) return "Good afternoon, my sunshine 🌸";
    return "Good evening, love 🌙";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/muse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const museMessage = { role: "muse", text: data.response };
      setMessages((prev) => [...prev, museMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "muse", text: "Muse is feeling a little moody... Try again later." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className={`main-layout ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar">
        <h2>Muse 💫</h2>
        <button className="new-chat-btn" onClick={startNewChat}>+ New Chat</button>
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="chat-history-item"
            onClick={() => loadChat(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>

      <div className="app-container">
        <div className="chat-box">
          <div className="header">
            {messages.length === 0
              ? `${getGreeting()} Welcome to Muse AI 💫`
              : "Muse AI 💬"}
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              style={{ marginLeft: '1rem', cursor: 'pointer' }}
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role}`}
              >
                {msg.role === 'muse' && <strong>Muse: </strong>}
                {msg.text}
              </div>
            ))}
            {loading && <div className="loading">Muse is thinking...</div>}
          </div>
        </div>

        <form onSubmit={handleSend} className="input-area">
          <input
            type="text"
            placeholder="Ask Muse anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
