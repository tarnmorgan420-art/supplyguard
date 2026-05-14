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
    <div className="min-h-screen bg-white font-sans flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <a href="/" className="block text-xl font-bold text-zinc-900 mb-8 text-center">
          SupplyGuard AI
        </a>
        <div className="border border-zinc-200 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            {isSignUp ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-zinc-500 text-sm mb-6">
            {isSignUp ? "Start your free trial" : "Sign in to your account"}
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            {message && (
              <p className="text-sm text-red-500">{message}</p>
            )}
            <button
              onClick={handleAuth}
              disabled={loading || !email || !password}
              className="w-full bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-700 disabled:opacity-50"
            >
              {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
            </button>
          </div>

          <p className="text-sm text-zinc-500 text-center mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-zinc-900 font-medium hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}