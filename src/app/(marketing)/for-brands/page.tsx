import type { Metadata } from "next";
import { CheckCircle2, Search, BarChart3, MessageSquare } from "lucide-react";

export const metadata: Metadata = { title: "For Brands" };

export default function ForBrandsPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="relative py-28 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 text-[#10b981] text-sm mb-8">
            <span>●</span> For Brands & Agencies
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
            Find creators who <span className="text-[#10b981]">actually convert.</span>
          </h1>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Every Creasume profile is a live, verified media kit. Stop asking for screenshots — browse
            real analytics from real creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              placeholder="Enter your work email"
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#10b981]/50 transition-colors w-full sm:w-72"
            />
            <button className="bg-[#10b981] text-black text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-[#10b981]/90 transition-opacity whitespace-nowrap">
              Join the Waitlist →
            </button>
          </div>
          <p className="text-white/25 text-xs mt-4">Free for brands during beta. No credit card.</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: Search,
            title: "Verified Analytics",
            description: "Every stat on a Creasume profile is pulled directly from the platform API. No inflated numbers.",
            color: "#10b981",
          },
          {
            icon: BarChart3,
            title: "Audience Breakdown",
            description: "See age, gender, location, and city-level breakdowns before you reach out.",
            color: "#a855f7",
          },
          {
            icon: MessageSquare,
            title: "Direct Inquiry",
            description: "Send a collaboration request directly through their Influence Card. Creators respond faster.",
            color: "#f97316",
          },
        ].map(({ icon: Icon, title, description, color }) => (
          <div key={title} className="card-dark p-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: color + "18" }}>
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <h3 className="font-heading font-bold text-white mb-2">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </section>

      {/* Why brands love it */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-white mb-12">Why brands love Creasume</h2>
        <ul className="space-y-4 text-left">
          {[
            "Live data — no stale PDF decks",
            "Audience demographics at a glance",
            "Portfolio of past brand collaborations",
            "Direct inquiry with package details built in",
            "Creator availability and contact info in one place",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
              <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
