export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <span className="text-xl font-bold text-zinc-900">SupplyGuard AI</span>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900">Login</a>
          <a href="#" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700">
            Start free trial
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
          <a href="#" className="bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-700">
            Start free trial
          </a>
          <a href="#" className="text-zinc-600 px-8 py-4 rounded-full text-lg border border-zinc-200 hover:bg-zinc-50">
            See how it works
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
      <section className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-12">Simple pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-200 rounded-2xl p-8">
            <h3 className="font-bold text-zinc-900 mb-2">Starter</h3>
            <div className="text-4xl font-bold text-zinc-900 mb-1">$149</div>
            <div className="text-zinc-500 text-sm mb-6">/month</div>
            <p className="text-zinc-600 text-sm">Compliance rewriter only. Up to 50 rewrites/month.</p>
          </div>
          <div className="border-2 border-zinc-900 rounded-2xl p-8 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-3 py-1 rounded-full">Most popular</span>
            <h3 className="font-bold text-zinc-900 mb-2">Growth</h3>
            <div className="text-4xl font-bold text-zinc-900 mb-1">$349</div>
            <div className="text-zinc-500 text-sm mb-6">/month</div>
            <p className="text-zinc-600 text-sm">Rewriter + AI advisor widget. Unlimited rewrites.</p>
          </div>
          <div className="border border-zinc-200 rounded-2xl p-8">
            <h3 className="font-bold text-zinc-900 mb-2">Pro</h3>
            <div className="text-4xl font-bold text-zinc-900 mb-1">$799</div>
            <div className="text-zinc-500 text-sm mb-6">/month</div>
            <p className="text-zinc-600 text-sm">Everything + white-label widget + priority support.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-8 py-8 text-center text-sm text-zinc-400">
        © 2026 SupplyGuard AI. All rights reserved.
      </footer>
    </div>
  );
}