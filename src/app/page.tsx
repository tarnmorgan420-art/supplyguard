"use client";

export default function Home() {
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
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <span className="text-xl font-bold text-zinc-900">SupplyGuard AI</span>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900">Login</a>
          <a href="/rewrite" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700">
            Try it free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Built for supplement brands
        </span>
        <h1 className="text-5xl font-bold text-zinc-900 leading-tight mb-6">
          Stop writing copy that gets you<br />
          <span className="text-red-500">FDA warning letters</span>
        </h1>
        <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10">
          SupplyGuard rewrites your supplement copy to be FDA-compliant in seconds.
          Plus an AI advisor that helps your customers find the right products.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/rewrite" className="bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-700">
            Try it free →
          </a>
          <a href="#pricing" className="text-zinc-600 px-8 py-4 rounded-full text-lg border border-zinc-200 hover:bg-zinc-50">
            See pricing
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-50 rounded-2xl p-8">
          <div className="text-3xl mb-4">✍️</div>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">FDA Compliance Rewriter</h2>
          <p className="text-zinc-600">
            Paste your product copy and get a compliant version back instantly.
            Flags disease claims, missing disclaimers, and banned language automatically.
          </p>
        </div>
        <div className="bg-zinc-50 rounded-2xl p-8">
          <div className="text-3xl mb-4">🤖</div>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">AI Supplement Advisor</h2>
          <p className="text-zinc-600">
            An embeddable chatbot for your store. Customers describe their goals,
            the AI recommends your products. More conversions, happier customers.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Simple pricing</h2>
        <p className="text-zinc-500 mb-12">Start free, upgrade when you're ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-200 rounded-2xl p-8 text-left">
            <h3 className="font-bold text-zinc-900 mb-2">Starter</h3>
            <div className="text-4xl font-bold text-zinc-900 mb-1">$149</div>
            <div className="text-zinc-500 text-sm mb-6">/month</div>
            <p className="text-zinc-600 text-sm mb-8">Compliance rewriter only. Up to 50 rewrites/month.</p>
            <button
              onClick={() => handleCheckout("starter")}
              className="w-full border border-zinc-900 text-zinc-900 py-3 rounded-xl font-medium hover:bg-zinc-50"
            >
              Get started
            </button>
          </div>
          <div className="border-2 border-zinc-900 rounded-2xl p-8 text-left relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-3 py-1 rounded-full">Most popular</span>
            <h3 className="font-bold text-zinc-900 mb-2">Growth</h3>
            <div className="text-4xl font-bold text-zinc-900 mb-1">$349</div>
            <div className="text-zinc-500 text-sm mb-6">/month</div>
            <p className="text-zinc-600 text-sm mb-8">Rewriter + AI advisor widget. Unlimited rewrites.</p>
            <button
              onClick={() => handleCheckout("growth")}
              className="w-full bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-700"
            >
              Get started
            </button>
          </div>
          <div className="border border-zinc-200 rounded-2xl p-8 text-left">
            <h3 className="font-bold text-zinc-900 mb-2">Pro</h3>
            <div className="text-4xl font-bold text-zinc-900 mb-1">$799</div>
            <div className="text-zinc-500 text-sm mb-6">/month</div>
            <p className="text-zinc-600 text-sm mb-8">Everything + white-label widget + priority support.</p>
            <button
              onClick={() => handleCheckout("pro")}
              className="w-full border border-zinc-900 text-zinc-900 py-3 rounded-xl font-medium hover:bg-zinc-50"
            >
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-8 py-8 text-center text-sm text-zinc-400">
        &copy; 2026 SupplyGuard AI. All rights reserved.
      </footer>
    </div>
  );
}