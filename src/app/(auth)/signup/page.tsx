import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignupPage() {
  return (
    <div className="w-full max-w-md">
      <div className="card-dark p-8 rounded-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Create your card</h1>
          <p className="text-white/50 text-sm">Free forever. No credit card required.</p>
        </div>

        <button className="w-full flex items-center justify-center gap-3 border border-white/10 rounded-xl py-3 text-sm text-white/80 hover:border-white/20 hover:text-white transition-colors mb-6">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-white/30 text-xs">or sign up with email</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Alex Rivera"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">
                creasume.com/
              </span>
              <input
                type="text"
                placeholder="yourname"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-[118px] pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <p className="text-white/30 text-xs mt-1.5">3–30 chars, lowercase letters, numbers, hyphens only.</p>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full brand-gradient text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm mt-2"
          >
            Create My Influence Card →
          </button>
        </form>

        <p className="text-center text-xs text-white/30 mt-4">
          By signing up you agree to our{" "}
          <span className="text-white/50">Terms</span> and{" "}
          <span className="text-white/50">Privacy Policy</span>.
        </p>

        <p className="text-center text-sm text-white/40 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#a855f7] hover:text-[#a855f7]/80 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
