"use client";
import { useState } from "react";

export default function Rewrite() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRewrite() {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ copy: input }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <a href="/" className="text-xl font-bold text-zinc-900">SupplyGuard AI</a>
        <span className="text-sm text-zinc-500">FDA Compliance Rewriter</span>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">FDA Compliance Rewriter</h1>
        <p className="text-zinc-500 mb-10">Paste your supplement copy below and get an FDA-compliant version instantly.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Your original copy</label>
            <textarea
              className="w-full h-64 p-4 border border-zinc-200 rounded-xl text-sm text-zinc-800 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="e.g. Our supplement cures fatigue and prevents heart disease. Treats anxiety and depression naturally..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleRewrite}
              disabled={loading || !input}
              className="mt-4 w-full bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Rewriting..." : "Rewrite for FDA compliance →"}
            </button>
          </div>

          {/* Output */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">FDA compliant version</label>
            <div className="w-full h-64 p-4 border border-zinc-200 rounded-xl text-sm text-zinc-800 overflow-y-auto bg-zinc-50">
              {loading && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-900"></div>
                  Analyzing your copy...
                </div>
              )}
              {result && <pre className="whitespace-pre-wrap font-sans">{result}</pre>}
              {!loading && !result && (
                <span className="text-zinc-400">Your compliant copy will appear here...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}