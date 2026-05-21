"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  caption: string;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  isRaw?: boolean;
}

function useCountUp(target: number, duration = 1200) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { current, ref };
}

export default function StatCard({ label, value, caption, icon: Icon, prefix = "", suffix = "", isRaw }: StatCardProps) {
  const numericValue = typeof value === "number" ? value : 0;
  const { current, ref } = useCountUp(numericValue);

  const displayValue = isRaw
    ? value
    : typeof value === "number"
    ? `${prefix}${current.toLocaleString()}${suffix}`
    : value;

  return (
    <div ref={ref} className="card-dark p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-xs font-medium">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
          <Icon className="h-4 w-4 text-white/40" />
        </div>
      </div>
      <p className="font-heading text-2xl font-bold text-white tracking-tight">
        {displayValue}
      </p>
      <p className="text-[#10b981] text-xs font-medium">{caption}</p>
    </div>
  );
}
