import React from "react";

export default function ChatbotUI() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-300 text-sm">
            AI‑Powered Citizen Safety Assistant
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-400 tracking-tight">
            Crime Assistance Chatbot
          </h1>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            A secure, anonymous and intelligent platform that helps local citizens
            understand emergencies, report crimes, and connect with authorities —
            all in one place.
          </p>
        </header>

        {/* Main Container */}
        <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-blue-800/40 shadow-2xl p-6 sm:p-10 overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Chat Area */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <h2 className="text-lg font-semibold text-blue-300">Live Guidance</h2>
              </div>

              <div className="flex-1 bg-black/50 rounded-2xl p-5 border border-blue-700/30 space-y-4">
                <div className="max-w-[85%] bg-blue-600/20 border border-blue-500/30 px-4 py-3 rounded-xl text-sm">
                  👋 Welcome! I’m your virtual crime‑assistance guide.
                  <br />
                  I’ll help you understand what to do in unsafe or suspicious situations.
                </div>

                <div className="ml-auto max-w-[85%] bg-blue-600 text-black px-4 py-3 rounded-xl text-sm font-medium">
                  I’m scared. Someone is acting suspicious near my area.
                </div>

                <div className="max-w-[85%] bg-blue-600/20 border border-blue-500/30 px-4 py-3 rounded-xl text-sm">
                  You can safely report this anonymously.
                  <br />
                  If there is immediate danger, use the SOS button or call emergency services.
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <input
                  disabled
                  placeholder="Ask about safety, reporting crimes, or emergencies…"
                  className="flex-1 bg-black/60 border border-blue-700/40 rounded-xl px-4 py-3 text-sm text-gray-400 placeholder-gray-500"
                />
                <button
                  disabled
                  className="px-6 py-3 rounded-xl bg-blue-600 text-black font-semibold opacity-60 cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Right: Info Panels */}
            <div className="space-y-6">
              <div className="bg-black/40 border border-blue-700/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">What this app offers</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✔ Anonymous crime reporting</li>
                  <li>✔ Emergency SOS & quick contacts</li>
                  <li>✔ Location sharing during danger</li>
                  <li>✔ Suspect & criminal image uploads</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-blue-700/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">How citizens should use it</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                  <li>Start by chatting to understand your situation</li>
                  <li>Report crimes without revealing identity</li>
                  <li>Use SOS only in real emergencies</li>
                  <li>Upload images only if it is safe</li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-blue-700/20 to-black border border-blue-600/40 rounded-2xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">⚠ Important Safety Note</h4>
                <p className="text-xs text-gray-300">
                  This system assists law enforcement but does not replace emergency services.
                  In life‑threatening situations, always call local emergency numbers immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-500">
          Smart Crime Management System • Secure • Anonymous • Citizen‑First Design
        </footer>
      </div>
    </div>
  );
}
