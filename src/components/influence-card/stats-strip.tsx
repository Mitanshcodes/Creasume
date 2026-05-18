"use client";

import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, Eye, Briefcase } from "lucide-react";
import { formatCompact, formatPercent } from "@/lib/utils";

interface StatsStripProps {
  totalFollowers: number;
  engagementRate: number;
  totalReach: number;
  campaignCount: number;
}

function AnimatedNumber({ target, format }: { target: number; format: (n: number) => string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{format(value)}</span>;
}

export default function StatsStrip({
  totalFollowers,
  engagementRate,
  totalReach,
  campaignCount,
}: StatsStripProps) {
  const stats = [
    { icon: Users, label: "Total Followers", value: totalFollowers, format: formatCompact },
    { icon: TrendingUp, label: "Avg Engagement", value: engagementRate, format: formatPercent },
    { icon: Eye, label: "30-Day Reach", value: totalReach, format: formatCompact },
    { icon: Briefcase, label: "Brand Campaigns", value: campaignCount, format: (n: number) => String(n) },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border">
        {stats.map(({ icon: Icon, label, value, format }) => (
          <div key={label} className="p-5 sm:p-6 text-center flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold tabular-nums">
              <AnimatedNumber target={value} format={format} />
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
