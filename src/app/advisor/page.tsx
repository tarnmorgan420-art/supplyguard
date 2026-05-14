"use client";
import { useState, useRef, useEffect } from "react";

const defaultProducts = [
  { name: "EnergyBoost Pro", description: "B-vitamins and iron to support healthy energy levels" },
  { name: "SleepWell", description: "Magnesium and melatonin to support healthy sleep" },
  { name: "ImmuneShield", description: "Vitamin C, D and zinc to support immune health" },
  { name: "JointFlex", description: "Glucosamine and collagen to support joint comfort" },
  { name: "FocusMind", description: "Lions mane and bacopa to support cognitive function" },
];

export default function Advisor() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Hi! Tell me how you're feeling or what your health goals are and I'll recommend the right products for you." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#0a0a0a",
      color: "#f0ede8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(240,237,232,0.15); border-radius: 2px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .msg { animation: fadeUp 0.2s ease; }
      `}</style>

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px", borderBottom: "1px solid rgba(240,237,232,0.08)",
        background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)",
      }}>
        <a href="/" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", color: "#f0ede8", textDecoration: "none" }}>
          SupplyGuard
        </a>
        <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Supplement Advisor
        </span>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", width: "100%", padding: "48px 24px 0", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(28px, 3vw, 40px)",
            color: "#f0ede8", marginBottom: "8px",
          }}>
            AI Supplement Advisor
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(240,237,232,0.4)", fontWeight: 300 }}>
            Describe your goals and get personalized product recommendations.
          </p>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", display: "flex",
          flexDirection: "column", gap: "16px", paddingBottom: "24px",
          minHeight: "400px",
        }}>
          {messages.map((msg, i) => (
            <div key={i} className="msg" style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "rgba(220,80,60,0.2)", border: "1px solid rgba(220,80,60,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", marginRight: "10px", flexShrink: 0, marginTop: "2px",
                }}>
                  ✦
                </div>
              )}
              <div style={{
                maxWidth: "75%",
                padding: "14px 18px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: msg.role === "user" ? "#dc503c" : "rgba(240,237,232,0.06)",
                border: msg.role === "user" ? "none" : "1px solid rgba(240,237,232,0.08)",
                fontSize: "14px",
                lineHeight: "1.65",
                color: msg.role === "user" ? "#fff" : "rgba(240,237,232,0.85)",
                fontWeight: 300,
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "rgba(220,80,60,0.2)", border: "1px solid rgba(220,80,60,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px",
              }}>✦</div>
              <div style={{
                padding: "14px 18px",
                background: "rgba(240,237,232,0.06)",
                border: "1px solid rgba(240,237,232,0.08)",
                borderRadius: "18px 18px 18px 4px",
                display: "flex", gap: "4px", alignItems: "center",
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "rgba(240,237,232,0.3)",
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
                <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          position: "sticky", bottom: 0,
          background: "#0a0a0a",
          paddingBottom: "32px", paddingTop: "16px",
          borderTop: "1px solid rgba(240,237,232,0.06)",
        }}>
          <div style={{
            display: "flex", gap: "10px",
            background: "rgba(240,237,232,0.04)",
            border: "1px solid rgba(240,237,232,0.1)",
            borderRadius: "100px", padding: "8px 8px 8px 20px",
          }}>
            <textarea
              rows={1}
              placeholder="e.g. I feel tired all the time..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              style={{
                flex: 1, background: "transparent", border: "none",
                color: "#f0ede8", fontSize: "14px", fontFamily: "inherit",
                resize: "none", lineHeight: "1.5", paddingTop: "6px",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? "#dc503c" : "rgba(240,237,232,0.08)",
                color: input.trim() && !loading ? "#fff" : "rgba(240,237,232,0.2)",
                border: "none", borderRadius: "100px",
                padding: "8px 20px", fontSize: "13px", fontWeight: 500,
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}