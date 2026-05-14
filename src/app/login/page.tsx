"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleAuth() {
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Check your email to confirm your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#0a0a0a",
      color: "#f0ede8",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "400px", padding: "24px" }}>
        <a href="/" style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "20px", color: "#f0ede8",
          textDecoration: "none", display: "block",
          textAlign: "center", marginBottom: "40px",
        }}>
          SupplyGuard
        </a>

        <div style={{
          background: "rgba(240,237,232,0.03)",
          border: "1px solid rgba(240,237,232,0.08)",
          borderRadius: "20px", padding: "36px",
        }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "28px", color: "#f0ede8", marginBottom: "8px",
          }}>
            {isSignUp ? "Create account" : "Welcome back"}
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(240,237,232,0.4)", marginBottom: "28px", fontWeight: 300 }}>
            {isSignUp ? "Start your free trial" : "Sign in to your account"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "13px 16px",
                background: "rgba(240,237,232,0.05)",
                border: "1px solid rgba(240,237,232,0.1)",
                borderRadius: "12px", color: "#f0ede8",
                fontSize: "14px", fontFamily: "inherit",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              style={{
                width: "100%", padding: "13px 16px",
                background: "rgba(240,237,232,0.05)",
                border: "1px solid rgba(240,237,232,0.1)",
                borderRadius: "12px", color: "#f0ede8",
                fontSize: "14px", fontFamily: "inherit",
              }}
            />
            {message && (
              <p style={{ fontSize: "13px", color: message.includes("Check") ? "#4ade80" : "#dc503c" }}>
                {message}
              </p>
            )}
            <button
              onClick={handleAuth}
              disabled={loading || !email || !password}
              style={{
                width: "100%", padding: "13px",
                background: email && password && !loading ? "#dc503c" : "rgba(240,237,232,0.06)",
                color: email && password && !loading ? "#fff" : "rgba(240,237,232,0.25)",
                border: "none", borderRadius: "100px",
                fontSize: "14px", fontWeight: 500,
                cursor: email && password && !loading ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "all 0.2s",
                marginTop: "4px",
              }}
            >
              {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
            </button>
          </div>

          <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.35)", textAlign: "center", marginTop: "24px" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: "none", border: "none",
                color: "#f0ede8", fontSize: "13px",
                cursor: "pointer", fontFamily: "inherit",
                textDecoration: "underline",
              }}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}