"use client";
import { useState } from "react";

const defaultProducts = [
  { name: "EnergyBoost Pro", description: "B-vitamins and iron to support healthy energy levels" },
  { name: "SleepWell", description: "Magnesium and melatonin to support healthy sleep" },
  { name: "ImmuneShield", description: "Vitamin C, D and zinc to support immune health" },
  { name: "JointFlex", description: "Glucosamine and collagen to support joint comfort" },
  { name: "FocusMind", description: "Lions mane and bacopa to support cognitive function" },
];

export default function Advisor() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Hi! I'm your supplement advisor. Tell me how you're feeling or what your health goals are and I'll recommend the right products for you!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    const res = await fetch("/api/advisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, products: defaultProducts }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <a href="/" className="text-xl font-bold text-zinc-900">SupplyGuard AI</a>
        <span className="text-sm text-zinc-500">Supplement Advisor Demo</span>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">AI Supplement Advisor</h1>
        <p className="text-zinc-500 mb-8">Tell me your health goals and I'll find the right supplements for you.</p>

        {/* Chat */}
        <div className="border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-800"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 text-zinc-500 px-4 py-3 rounded-2xl text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-zinc-100 p-4 flex gap-3">
            <input
              type="text"
              placeholder="e.g. I feel tired all the time..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-zinc-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}