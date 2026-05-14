export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <a href="/" className="text-xl font-bold text-zinc-900">SupplyGuard AI</a>
      </nav>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">Welcome to SupplyGuard!</h1>
        <p className="text-zinc-600 mb-8">Your subscription is active. Start rewriting your supplement copy below.</p>
        <a href="/rewrite" className="bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-700">
          Go to rewriter →
        </a>
      </div>
    </div>
  );
}