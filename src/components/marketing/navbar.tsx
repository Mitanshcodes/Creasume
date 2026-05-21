"use client";

import Link from "next/link";
import { LogoMark } from "@/components/ui/brand-icons";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2.5">
        <LogoMark className="h-7 w-7" />
        <span className="font-heading text-lg font-bold text-white">Creasume</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/for-brands"
          className="text-sm font-medium text-[#10b981] hover:text-[#10b981]/80 transition-colors"
        >
          For Brands
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="brand-gradient text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Get Your Resume Free →
        </Link>
      </div>

      {/* Mobile CTA */}
      <Link
        href="/signup"
        className="md:hidden brand-gradient text-white text-xs font-semibold px-4 py-1.5 rounded-full"
      >
        Get Started
      </Link>
    </nav>
  );
}
