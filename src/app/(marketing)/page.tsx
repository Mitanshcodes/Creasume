import Link from "next/link";
import {
  BarChart3,
  Headphones,
  Link2,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";

/* ─── Hero browser mock ───────────────────────────────────────────────────── */
function BrowserMock() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-transparent rounded-3xl blur-3xl -z-10" />
      <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/40">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-1.5 bg-white/[0.06] rounded-md px-3 py-1 text-xs text-white/40">
              <span className="text-white/20">🔒</span>
              creasume.com/connect
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col items-center gap-5 min-h-[320px] justify-center bg-[#0a0a0a]">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899, #f97316)" }}
          >
            <InstagramIcon className="h-10 w-10 text-white" />
          </div>
          <div className="text-center space-y-1.5">
            <h3 className="text-xl font-heading font-bold text-white">Connect Instagram</h3>
            <p className="text-sm text-white/50">Generate your live influence card in seconds.</p>
          </div>
          <div className="w-full max-w-[220px] brand-gradient text-white text-sm font-semibold py-3 rounded-xl text-center cursor-pointer hover:opacity-90 transition-opacity">
            Connect Account
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="card-dark p-6 hover:border-white/[0.12] transition-colors">
      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5">
        <Icon className="h-6 w-6 text-purple-400" />
      </div>
      <h3 className="font-heading font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  color,
}: {
  step: number;
  icon: React.ElementType;
  title: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: color + "18", border: `1px solid ${color}30` }}
      >
        <Icon className="h-7 w-7" style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-white/30 mb-1">{step}.</p>
        <p className="font-semibold text-white">{title}</p>
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  highlighted,
  cta,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}) {
  return (
    <div className={`relative card-dark p-7 flex flex-col gap-5 ${highlighted ? "border-purple-500/40" : ""}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="brand-gradient text-white text-xs font-bold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div>
        <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">{name}</p>
        <p className="font-heading text-4xl font-bold text-white">{price}</p>
        <p className="text-white/40 text-sm mt-1">{description}</p>
      </div>
      <ul className="space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/70">
            <CheckCircle2 className="h-4 w-4 text-[#10b981] mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`text-center text-sm font-semibold py-3 rounded-xl transition-opacity block ${
          highlighted
            ? "brand-gradient text-white hover:opacity-90"
            : "border border-white/10 text-white/70 hover:border-white/20 hover:text-white"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-sm text-white/70">
              <span className="text-[#a855f7]">✦</span>
              The Resume for the Creator Economy
            </div>

            <div>
              <h1 className="font-heading text-6xl md:text-7xl font-extrabold text-white leading-[1.0] tracking-tight">
                Your Influence.
              </h1>
              <h1 className="font-heading text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight brand-gradient-text">
                Structured.
              </h1>
            </div>

            <p className="text-white/55 text-lg leading-relaxed max-w-md">
              Ditch the outdated PDFs. Turn your live social analytics into a dynamic professional
              identity in minutes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="brand-gradient text-white font-semibold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                Create My Influence Card →
              </Link>
              <Link
                href="/demo"
                className="border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium px-7 py-3.5 rounded-xl transition-colors text-sm"
              >
                Browse Creators
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {(["A", "B", "C", "D"] as const).map((l, i) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: ["#a855f7", "#ec4899", "#f97316", "#10b981"][i],
                      zIndex: 4 - i,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-sm">Trusted by early creators & brands</p>
            </div>
          </div>

          <BrowserMock />
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon={BarChart3}
            title="Data-Driven Credibility"
            description="Your follower count, engagement rate, and reach update automatically. No more manual screenshots."
          />
          <FeatureCard
            icon={Headphones}
            title="Creator Wrapped & Portfolios"
            description="Beautiful animated stat cards and structured brand collaboration histories that make brands stop scrolling."
          />
          <FeatureCard
            icon={Link2}
            title="One Professional Link"
            description="Share creasume.com/you instead of multiple files. Works flawlessly in brand emails, DMs, and LinkedIn."
          />
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <p className="text-[#10b981] text-xs font-bold uppercase tracking-[0.2em] mb-4">HOW IT WORKS</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-16">
          Live in 3 minutes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StepCard step={1} icon={InstagramIcon} title="Connect Platforms" color="#ec4899" />
          <StepCard step={2} icon={BarChart3} title="Auto-Generate Identity" color="#10b981" />
          <StepCard step={3} icon={Link2} title="Share with Brands" color="#f97316" />
        </div>
        <div className="mt-14">
          <Link
            href="/signup"
            className="brand-gradient text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Start now — it&apos;s free →
          </Link>
        </div>
      </section>

      {/* ── Trust strip ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Zap, label: "Built for Creators", sub: "Every feature creator-first" },
            { icon: BarChart3, label: "Live Data", sub: "Auto-synced from your platforms" },
            { icon: Shield, label: "Verified", sub: "Real stats, no fake numbers" },
            { icon: Clock, label: "3min Setup", sub: "Connect and go" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-[#10b981]" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{label}</p>
                <p className="text-white/40 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 text-center">
        <p className="text-[#10b981] text-xs font-bold uppercase tracking-[0.2em] mb-4">MEMBERSHIP</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
          Simple pricing. No surprises.
        </h2>
        <p className="text-white/40 mb-14">Start free. Upgrade when you&apos;re ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <PricingCard
            name="Free"
            price="$0"
            description="Forever free"
            features={[
              "1 connected platform",
              "Influence Card at creasume.com/you",
              "Basic analytics display",
              "Up to 3 campaigns",
              "1 collaboration package",
            ]}
            cta="Get started free"
          />
          <PricingCard
            name="Pro"
            price="$12"
            description="per month"
            features={[
              "All platforms (Instagram + YouTube)",
              "Audience demographics charts",
              "Unlimited campaigns & packages",
              "PDF resume export",
              "Custom accent color",
              "Priority sync (every 6 hours)",
            ]}
            highlighted
            cta="Start Pro trial"
          />
          <PricingCard
            name="Premium"
            price="$29"
            description="per month"
            features={[
              "Everything in Pro",
              "Brand inquiry management",
              "Custom domain support",
              "White-label PDF",
              "Analytics API access",
              "Early access to new features",
            ]}
            cta="Go Premium"
          />
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="relative card-dark p-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-transparent pointer-events-none" />
          <h2 className="relative font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Your Influence Card is waiting.
          </h2>
          <p className="relative text-white/50 mb-8 max-w-md mx-auto">
            Join creators using Creasume to land better brand deals, faster.
          </p>
          <Link
            href="/signup"
            className="relative inline-block brand-gradient text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Create your free card →
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded border border-white/15 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✕</span>
                </div>
                <span className="font-heading font-bold text-white">Creasume</span>
              </div>
              <p className="text-white/40 text-sm">The resume for the creator economy.</p>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo Card</Link></li>
                <li><Link href="/for-brands" className="hover:text-white transition-colors">For Brands</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Company</p>
              <ul className="space-y-2 text-sm text-white/40">
                <li><span>About</span></li>
                <li><span>Blog</span></li>
                <li><span>Careers</span></li>
              </ul>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-white/40">
                <li><span>Privacy</span></li>
                <li><span>Terms</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-6 text-center text-xs text-white/25">
            © {new Date().getFullYear()} Creasume. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
