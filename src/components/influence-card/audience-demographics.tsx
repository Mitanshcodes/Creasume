"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatPercent } from "@/lib/utils";

interface AudienceData {
  genderSplit?: { female: number; male: number };
  ageBuckets?: { range: string; pct: number }[];
  topCountries?: { name: string; pct: number }[];
  topCities?: string[];
}

interface AudienceDemographicsProps {
  instagram?: AudienceData | null;
  youtube?: AudienceData | null;
}

const BRAND_COLORS = ["#6366f1", "#7c3aed", "#a855f7", "#c084fc", "#e879f9"];

export default function AudienceDemographics({ instagram, youtube }: AudienceDemographicsProps) {
  const data = instagram ?? youtube;
  if (!data) return null;

  const { genderSplit, ageBuckets, topCountries, topCities } = data;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Audience Demographics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Age & Gender */}
        {ageBuckets && ageBuckets.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium mb-1">Age Distribution</p>
            {genderSplit && (
              <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Female {formatPercent(genderSplit.female)}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                  Male {formatPercent(genderSplit.male)}
                </span>
              </div>
            )}
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={ageBuckets} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [typeof v === "number" ? formatPercent(v) : v, "Audience"]}
                  contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", fontSize: 12 }}
                />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {ageBuckets.map((_, i) => (
                    <Cell key={i} fill={BRAND_COLORS[i % BRAND_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Countries */}
        {topCountries && topCountries.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium mb-4">Top Countries</p>
            <div className="space-y-3">
              {topCountries.slice(0, 5).map(({ name, pct }, i) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                  <span className="text-sm flex-1 truncate">{name}</span>
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct * 100}%`,
                        background: BRAND_COLORS[i % BRAND_COLORS.length],
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {formatPercent(pct)}
                  </span>
                </div>
              ))}
            </div>

            {topCities && topCities.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Top Cities</p>
                <div className="flex flex-wrap gap-1.5">
                  {topCities.slice(0, 5).map((city) => (
                    <span key={city} className="text-xs bg-muted rounded-full px-2 py-0.5">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
