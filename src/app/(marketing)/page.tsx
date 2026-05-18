import Link from "next/link";
import { ArrowRight, BarChart3, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FauxInfluenceCard from "@/components/marketing/faux-influence-card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-md bg-[#080808]/80">
        <span className="brand-gradient-text text-xl font-bold tracking-tight">Creasume</span>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="brand-gradient text-white border-0 hover:opacity-90">
              Get started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 flex flex-col items-center text-center">
        {/* Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

        <Badge className="mb-6 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/10">
          Live analytics · Auto-updating · Shareable
        </Badge>

        <h1 className="max-w-4xl text-5xl sm:text-7xl font-bold tracking-tight leading-tight">
          The Resume for the{" "}
          <span className="brand-gradient-text">Creator Economy</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/50 leading-relaxed">
          Connect your Instagram and YouTube. Get a live, shareable Influence Card that updates
          automatically — built for creators pitching brands.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="brand-gradient text-white border-0 hover:opacity-90 text-base px-8 h-12"
            >
              Claim your /username
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-base px-8 h-12"
            >
              See a live example
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-white/30">Free forever · No credit card needed</p>
      </section>

      {/* Faux Influence Card Preview */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <div className="relative rounded-2xl border border-white/8 overflow-hidden shadow-2xl shadow-black/50">
          {/* Browser chrome */}
          <div className="bg-[#111] border-b border-white/5 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="mx-auto flex items-center gap-2 bg-white/5 rounded-md px-3 py-1 text-xs text-white/30">
              <span>🔒</span>
              <span>creasume.com/demo</span>
            </div>
          </div>
          <FauxInfluenceCard />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything brands need to{" "}
            <span className="brand-gradient-text">say yes</span>
          </h2>
          <p className="mt-3 text-white/40 max-w-md mx-auto">
            One link replaces the deck, the spreadsheet, and the follow-up email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Live Resume",
              desc: "Your Influence Card updates automatically every night. Share a link once — it's always current.",
            },
            {
              icon: BarChart3,
              title: "Real-Time Analytics",
              desc: "Followers, engagement rate, reach, top content — pulled direct from Instagram and YouTube APIs.",
            },
            {
              icon: Globe,
              title: "Influence Cards",
              desc: "A beautiful public profile at creasume.com/you. Hero, stats, demographics, campaigns, packages — the full media kit.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-white/6 bg-white/[0.02] p-6 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg brand-gradient flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your profile is waiting at{" "}
            <span className="brand-gradient-text">creasume.com/you</span>
          </h2>
          <p className="text-white/40 mb-8">Claim it before someone else does.</p>
          <Link href="/signup">
            <Button
              size="lg"
              className="brand-gradient text-white border-0 hover:opacity-90 text-base px-10 h-12"
            >
              Claim your Influence Card
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span className="brand-gradient-text font-bold">Creasume</span>
          <span>© 2025 Creasume. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/demo" className="hover:text-white transition-colors">
              Demo
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-white transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
