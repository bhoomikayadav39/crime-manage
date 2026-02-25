import React, { useState } from "react";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Welcome! Ask me how to file a complaint or use the app. (आप हिंदी में भी पूछ सकते हैं)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Server error. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-8">
          Crime Assistance Chatbot
        </h1>

        <div className="bg-gray-900 rounded-2xl p-6 border border-blue-800/40 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-xl text-sm ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-black font-medium"
                  : "bg-blue-600/20 border border-blue-500/30"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 text-sm">Bot is typing...</div>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask in English or Hindi..."
            className="flex-1 bg-black border border-blue-700/40 rounded-xl px-4 py-3 text-sm"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl bg-blue-600 text-black font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}