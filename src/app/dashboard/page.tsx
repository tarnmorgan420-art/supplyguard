"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) setUserEmail(session.user.email);
    }
    loadUser();
  }, []);

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
        <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.35)" }}>
          {userEmail}
        </span>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 48px" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "13px", color: "#dc503c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
            ✦ Subscription active
          </p>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            color: "#f0ede8", marginBottom: "12px",
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(240,237,232,0.45)", fontWeight: 300 }}>
            Your tools are ready. Start rewriting your copy or set up your advisor widget.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          <a href="/rewrite" style={{ textDecoration: "none" }}>
            <div style={{
              background: "rgba(240,237,232,0.03)",
              border: "1px solid rgba(240,237,232,0.08)",
              borderRadius: "16px", padding: "32px",
              cursor: "pointer", transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(220,80,60,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,237,232,0.08)")}
            >
              <div style={{ fontSize: "28px", marginBottom: "16px" }}>✍️</div>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "20px", color: "#f0ede8", marginBottom: "8px",
              }}>
                Compliance Rewriter
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(240,237,232,0.4)", fontWeight: 300, lineHeight: 1.6 }}>
                Rewrite your supplement copy to be FDA compliant instantly.
              </p>
              <div style={{
                marginTop: "24px", fontSize: "13px", color: "#dc503c",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                Open tool →
              </div>
            </div>
          </a>

          <a href="/advisor" style={{ textDecoration: "none" }}>
            <div style={{
              background: "rgba(240,237,232,0.03)",
              border: "1px solid rgba(240,237,232,0.08)",
              borderRadius: "16px", padding: "32px",
              cursor: "pointer", transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(220,80,60,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,237,232,0.08)")}
            >
              <div style={{ fontSize: "28px", marginBottom: "16px" }}>🤖</div>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "20px", color: "#f0ede8", marginBottom: "8px",
              }}>
                AI Advisor Widget
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(240,237,232,0.4)", fontWeight: 300, lineHeight: 1.6 }}>
                Try the advisor and set up your product catalog.
              </p>
              <div style={{
                marginTop: "24px", fontSize: "13px", color: "#dc503c",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                Open tool →
              </div>
            </div>
          </a>

          <div style={{
            background: "rgba(240,237,232,0.03)",
            border: "1px solid rgba(240,237,232,0.08)",
            borderRadius: "16px", padding: "32px",
            opacity: 0.5,
          }}>
            <div style={{ fontSize: "28px", marginBottom: "16px" }}>📦</div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "20px", color: "#f0ede8", marginBottom: "8px",
            }}>
              Product Catalog
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(240,237,232,0.4)", fontWeight: 300, lineHeight: 1.6 }}>
              Upload your products so the advisor can recommend them to customers.
            </p>
            <div style={{ marginTop: "24px", fontSize: "13px", color: "rgba(240,237,232,0.3)" }}>
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}