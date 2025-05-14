"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid credentials");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans px-4">
      <div className="max-w-md w-full space-y-8 bg-[#23234a] p-8 rounded-2xl shadow-xl border border-[#3b3b5c]">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Sign in to SkillCraft</h2>
          <p className="text-gray-400 mb-6">Welcome back! Log in to continue your learning journey.</p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 mb-2 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition" disabled>
          <span>🔵</span> Sign in with Google (coming soon)
        </button>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#18182f] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#18182f] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <Link href="/forgot-password" className="text-blue-400 hover:underline">Forgot password?</Link>
            <Link href="/signup" className="text-gray-400 hover:text-blue-400">Don't have an account? Sign up</Link>
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 text-center mt-4">{error}</div>}
      </div>
    </main>
  );
}