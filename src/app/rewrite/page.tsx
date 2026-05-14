"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Rewrite() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const limit = 3;

  async function handleRewrite() {
    setLoading(true);
    setResult("");

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers,
      body: JSON.stringify({ copy: input }),
    });

    if (res.status === 429) {
      setResult("FREE_LIMIT_REACHED");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setResult(data.result);
    if (data.usageCount) setUsageCount(data.usageCount);
    if (data.isPaidUser) setUsageCount(0);
    setLoading(false);
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#0a0a0a",
      color: "#f0ede8",
      minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus, input:focus { outline: none; }
        textarea { resize: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(240,237,232,0.15); border-radius: 2px; }
      `}</style>

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px", borderBottom: "1px solid rgba(240,237,232,0.08)",
        position: "sticky", top: 0, background: "rgba(10,10,10,0.9)",
        backdropFilter: "blur(12px)", zIndex: 100,
      }}>
        <a href="/" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", color: "#f0ede8", textDecoration: "none" }}>
          SupplyGuard
        </a>
        <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Compliance Rewriter
        </span>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 48px" }}>
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "#f0ede8", marginBottom: "12px",
          }}>
            FDA Compliance Rewriter
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(240,237,232,0.45)", fontWeight: 300 }}>
            Paste your supplement copy. Get a compliant version back in seconds.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          alignItems: "start",
        }}>
          {/* Input */}
          <div style={{
            background: "rgba(240,237,232,0.03)",
            border: "1px solid rgba(240,237,232,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(240,237,232,0.06)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(240,237,232,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Original copy
              </span>
              {input && (
                <button onClick={() => setInput("")} style={{
                  background: "none", border: "none", color: "rgba(240,237,232,0.3)",
                  fontSize: "12px", cursor: "pointer", fontFamily: "inherit",
                }}>
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Our supplement cures fatigue and treats depression naturally..."
              style={{
                width: "100%", height: "280px", padding: "20px",
                background: "transparent", border: "none",
                color: "#f0ede8", fontSize: "15px", lineHeight: "1.6",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              }}
            />
            <div style={{ padding: "0 20px 12px", display: "flex", justifyContent: "flex-end" }}>
              <span style={{ fontSize: "12px", color: "rgba(240,237,232,0.3)" }}>
                {usageCount >= limit ? "Upgrade for unlimited rewrites" : `${limit - usageCount} free rewrites remaining`}
              </span>
            </div>
            <div style={{ padding: "0 20px 20px" }}>
              <button
                onClick={handleRewrite}
                disabled={loading || !input}
                style={{
                  width: "100%", padding: "13px",
                  background: input && !loading ? "#dc503c" : "rgba(240,237,232,0.06)",
                  color: input && !loading ? "#fff" : "rgba(240,237,232,0.25)",
                  border: "none", borderRadius: "100px",
                  fontSize: "14px", fontWeight: 500,
                  cursor: input && !loading ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                {loading ? "Rewriting..." : "Rewrite for FDA compliance →"}
              </button>
            </div>
          </div>

          {/* Output */}
          <div style={{
            background: "rgba(240,237,232,0.03)",
            border: `1px solid ${result && result !== "FREE_LIMIT_REACHED" ? "rgba(220,80,60,0.25)" : "rgba(240,237,232,0.08)"}`,
            borderRadius: "16px",
            overflow: "hidden",
            transition: "border-color 0.3s",
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(240,237,232,0.06)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(240,237,232,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Compliant version
              </span>
              {result && result !== "FREE_LIMIT_REACHED" && (
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  style={{
                    background: "none", border: "none", color: "rgba(240,237,232,0.3)",
                    fontSize: "12px", cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Copy
                </button>
              )}
            </div>
            <div style={{
              height: "320px", padding: "20px", overflowY: "auto",
              display: "flex",
              alignItems: loading || !result ? "center" : "flex-start",
              justifyContent: loading || !result ? "center" : "flex-start",
            }}>
              {loading && (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "24px", height: "24px", border: "2px solid rgba(240,237,232,0.1)",
                    borderTopColor: "#dc503c", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
                  }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.3)" }}>Analyzing your copy...</p>
                </div>
              )}
              {result === "FREE_LIMIT_REACHED" && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p style={{ fontSize: "18px", color: "#dc503c", marginBottom: "8px", fontFamily: "'Instrument Serif', serif" }}>
                    You've used your 3 free rewrites
                  </p>
                  <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.4)", marginBottom: "24px", fontWeight: 300 }}>
                    Sign up to get unlimited rewrites
                  </p>
                  <a href="/#pricing" style={{
                    background: "#dc503c", color: "#fff",
                    padding: "10px 24px", borderRadius: "100px",
                    fontSize: "13px", fontWeight: 500, textDecoration: "none",
                  }}>
                    Get full access →
                  </a>
                </div>
              )}
              {result && result !== "FREE_LIMIT_REACHED" && (
                <pre style={{
                  whiteSpace: "pre-wrap", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px", lineHeight: "1.7", color: "rgba(240,237,232,0.8)",
                  fontWeight: 300,
                }}>
                  {result}
                </pre>
              )}
              {!loading && !result && (
                <p style={{ fontSize: "14px", color: "rgba(240,237,232,0.2)", fontWeight: 300 }}>
                  Your compliant copy will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}