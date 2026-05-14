"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, []);

  async function handleCheckout(plan: string) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    window.location.href = data.url;
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
        .hero-glow {
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(220,80,60,0.12) 0%, transparent 60%);
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(220,80,60,0.4);
          color: #dc503c;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 32px;
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #dc503c;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .headline {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #f0ede8;
          margin-bottom: 24px;
        }
        .headline em {
          font-style: italic;
          color: #dc503c;
        }
        .subhead {
          font-size: 17px;
          line-height: 1.6;
          color: rgba(240,237,232,0.55);
          max-width: 480px;
          margin: 0 auto 40px;
          font-weight: 300;
        }
        .btn-primary {
          background: #dc503c;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: #c4442f; transform: translateY(-1px); }
        .btn-ghost {
          background: transparent;
          color: rgba(240,237,232,0.6);
          border: 1px solid rgba(240,237,232,0.15);
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: rgba(240,237,232,0.4); color: #f0ede8; }
        .divider {
          border: none;
          border-top: 1px solid rgba(240,237,232,0.08);
          margin: 0;
        }
        .feature-card {
          background: rgba(240,237,232,0.03);
          border: 1px solid rgba(240,237,232,0.08);
          border-radius: 16px;
          padding: 36px;
          transition: border-color 0.2s;
        }
        .feature-card:hover { border-color: rgba(240,237,232,0.16); }
        .feature-icon {
          font-size: 28px;
          margin-bottom: 20px;
        }
        .feature-title {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          color: #f0ede8;
          margin-bottom: 12px;
        }
        .feature-desc {
          font-size: 15px;
          color: rgba(240,237,232,0.5);
          line-height: 1.65;
          font-weight: 300;
        }
        .pricing-card {
          background: rgba(240,237,232,0.03);
          border: 1px solid rgba(240,237,232,0.08);
          border-radius: 20px;
          padding: 36px;
          transition: all 0.2s;
        }
        .pricing-card:hover { border-color: rgba(240,237,232,0.16); }
        .pricing-card.featured {
          background: rgba(220,80,60,0.08);
          border-color: rgba(220,80,60,0.3);
        }
        .pricing-card.featured:hover { border-color: rgba(220,80,60,0.5); }
        .plan-name {
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.4);
          margin-bottom: 16px;
        }
        .plan-price {
          font-family: 'Instrument Serif', serif;
          font-size: 52px;
          color: #f0ede8;
          line-height: 1;
          margin-bottom: 4px;
        }
        .plan-period {
          font-size: 13px;
          color: rgba(240,237,232,0.35);
          margin-bottom: 20px;
        }
        .plan-desc {
          font-size: 14px;
          color: rgba(240,237,232,0.45);
          line-height: 1.6;
          margin-bottom: 28px;
          font-weight: 300;
        }
        .btn-plan {
          width: 100%;
          padding: 13px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          border: 1px solid rgba(240,237,232,0.2);
          background: transparent;
          color: #f0ede8;
        }
        .btn-plan:hover { border-color: rgba(240,237,232,0.5); }
        .btn-plan.featured {
          background: #dc503c;
          border-color: #dc503c;
          color: #fff;
        }
        .btn-plan.featured:hover { background: #c4442f; border-color: #c4442f; }
        .popular-tag {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #dc503c;
          margin-bottom: 8px;
        }
        .stat-number {
          font-family: 'Instrument Serif', serif;
          font-size: 48px;
          color: #f0ede8;
          line-height: 1;
        }
        .stat-label {
          font-size: 13px;
          color: rgba(240,237,232,0.4);
          margin-top: 6px;
          font-weight: 300;
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px", borderBottom: "1px solid rgba(240,237,232,0.08)",
        position: "sticky", top: 0, background: "rgba(10,10,10,0.9)",
        backdropFilter: "blur(12px)", zIndex: 100,
      }}>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", color: "#f0ede8" }}>
          SupplyGuard
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="/login" style={{ fontSize: "14px", color: "rgba(240,237,232,0.5)", textDecoration: "none" }}>
            Log in
          </a>
          <a href="/rewrite" className="btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }}>
            Try free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef} className="hero-glow" style={{
        padding: "120px 48px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="badge">
          <span className="badge-dot"></span>
          Built for supplement brands
        </div>
        <h1 className="headline">
          Stop writing copy that<br />gets you <em>FDA letters</em>
        </h1>
        <p className="subhead">
          SupplyGuard rewrites your supplement copy to be FDA-compliant in seconds.
          Drop our AI advisor on your store and watch conversions climb.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/rewrite" className="btn-primary">Rewrite my copy →</a>
          <a href="#pricing" className="btn-ghost">See pricing</a>
        </div>
      </div>

      <hr className="divider" />

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px", background: "rgba(240,237,232,0.08)",
        borderTop: "1px solid rgba(240,237,232,0.08)",
        borderBottom: "1px solid rgba(240,237,232,0.08)",
      }}>
        {[
          { n: "2s", l: "Average rewrite time" },
          { n: "100%", l: "FDA compliant output" },
          { n: "$0", l: "Compliance attorney fees" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "48px 36px", textAlign: "center",
            background: "#0a0a0a",
          }}>
            <div className="stat-number">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "100px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "#f0ede8", marginBottom: "16px",
          }}>
            Two tools. One subscription.
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(240,237,232,0.45)", fontWeight: 300 }}>
            Everything your supplement brand needs to stay compliant and convert more.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <div className="feature-title">FDA Compliance Rewriter</div>
            <p className="feature-desc">
              Paste any product copy and get a compliant version back in two seconds.
              Catches disease claims, missing disclaimers, and banned language before the FDA does.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <div className="feature-title">AI Supplement Advisor</div>
            <p className="feature-desc">
              A chatbot that lives on your store. Customers describe their goals,
              it recommends your products. More sales, zero extra work.
            </p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Pricing */}
      <div id="pricing" style={{ padding: "100px 48px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "#f0ede8", marginBottom: "16px",
          }}>Simple pricing</h2>
          <p style={{ fontSize: "16px", color: "rgba(240,237,232,0.45)", fontWeight: 300 }}>
            No contracts. Cancel anytime.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {[
            { name: "Starter", price: "$149", desc: "Compliance rewriter. Up to 50 rewrites per month.", plan: "starter", featured: false },
            { name: "Growth", price: "$349", desc: "Rewriter plus AI advisor widget. Unlimited rewrites.", plan: "growth", featured: true },
            { name: "Pro", price: "$799", desc: "Everything plus white-label widget and priority support.", plan: "pro", featured: false },
          ].map((p) => (
            <div key={p.plan} className={`pricing-card ${p.featured ? "featured" : ""}`}>
              {p.featured && <div className="popular-tag">Most popular</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{p.price}</div>
              <div className="plan-period">/month</div>
              <p className="plan-desc">{p.desc}</p>
              <button
                onClick={() => handleCheckout(p.plan)}
                className={`btn-plan ${p.featured ? "featured" : ""}`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(240,237,232,0.08)",
        padding: "32px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
      }}>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "16px", color: "rgba(240,237,232,0.3)" }}>
          SupplyGuard
        </span>
        <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.2)" }}>
          &copy; 2026 SupplyGuard AI
        </span>
      </footer>
    </div>
  );
}