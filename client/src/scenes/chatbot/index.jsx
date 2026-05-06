import React, { useState } from "react";
import Header from "components/Header";
import { Box } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Welcome! Ask me about complaints, SOS, or app usage. (Hindi / Hinglish supported)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎤 Speech Recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition
    ? new SpeechRecognition()
    : null;

  if (recognition) {
    recognition.lang = "hi-IN";
    recognition.continuous = false;
  }

  const startListening = () => {
    if (!recognition) return alert("Voice not supported");

    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInput(voiceText);
    };
  };

  // 🔊 Text to Speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    if (/[\u0900-\u097F]/.test(text)) {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-US";
    }

    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = { role: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);

      speak(data.reply); // 🔊 speak response
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Server error. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="CHATBOT FOR CRIME MANAGEMENT"
        subtitle="Ask questions about filing complaints, SOS, or using the app"
      />

      {/* Chat */}
      <Box
        mt="2rem"
        sx={{
          backgroundColor: "#111",
          border: "1px solid #1e3a8a",
          borderRadius: "12px",
          padding: "1.5rem",
          height: "60vh",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: "75%",
              marginBottom: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              backgroundColor:
                msg.role === "user" ? "#2563eb" : "rgba(37,99,235,0.2)",
              color: msg.role === "user" ? "#000" : "#fff",
              marginLeft: msg.role === "user" ? "auto" : "0",
            }}
          >
            {msg.text}
          </Box>
        ))}

        {loading && (
          <Box sx={{ color: "gray", fontSize: "14px" }}>
            Bot is typing...
          </Box>
        )}
      </Box>

      {/* Input */}
      <Box mt="1rem" display="flex" gap="10px">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask in English, Hindi or Hinglish..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #1e3a8a",
            backgroundColor: "#000",
            color: "#fff",
          }}
        />

        {/* 🎤 Mic */}
        <button
          onClick={startListening}
          style={{
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#22c55e",
            border: "none",
            cursor: "pointer",
          }}
        >
          🎤
        </button>

        {/* Send */}
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </Box>
    </Box>
  );
};

export default Chatbot;