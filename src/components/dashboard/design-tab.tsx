"use client";

const ACCENT_COLORS = [
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
  { label: "Mint", value: "#10b981" },
  { label: "Orange", value: "#f97316" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Red", value: "#ef4444" },
  { label: "Yellow", value: "#eab308" },
  { label: "Teal", value: "#14b8a6" },
];

const BG_STYLES = [
  {
    id: "MESH_GRADIENT",
    label: "Mesh Gradient",
    preview: "bg-gradient-to-br from-purple-900/60 via-pink-900/30 to-black",
  },
  {
    id: "SOLID_DARK",
    label: "Solid Dark",
    preview: "bg-black",
  },
];

const FONT_PAIRS = [
  {
    id: "SYNE_SPACE_GROTESK",
    heading: "Syne & Space Grotesk",
    sub: "Modern, bold, Gen Z aesthetic (Default)",
    headingFont: "font-heading",
  },
  {
    id: "INTER_ROBOTO_MONO",
    heading: "Inter & Roboto Mono",
    sub: "Clean, technical, professional",
    headingFont: "font-sans",
  },
];

interface DesignTabProps {
  accentColor: string;
  bgStyle: string;
  fontPair: string;
  onAccentChange: (color: string) => void;
  onBgStyleChange: (style: string) => void;
  onFontPairChange: (pair: string) => void;
}

export default function DesignTab({
  accentColor,
  bgStyle,
  fontPair,
  onAccentChange,
  onBgStyleChange,
  onFontPairChange,
}: DesignTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading font-bold text-white text-xl mb-1">Theme & Design</h3>
        <p className="text-white/40 text-sm">Customize how your Influence Card looks.</p>
      </div>

      {/* Accent Color */}
      <section>
        <p className="text-white/60 text-sm font-medium mb-3">Accent Color</p>
        <div className="flex gap-3 flex-wrap">
          {ACCENT_COLORS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onAccentChange(value)}
              title={label}
              className="relative w-9 h-9 rounded-full transition-transform hover:scale-110"
              style={{ background: value }}
            >
              {accentColor === value && (
                <span className="absolute inset-0 rounded-full ring-2 ring-white/60 ring-offset-2 ring-offset-black" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Background Style */}
      <section>
        <p className="text-white/60 text-sm font-medium mb-3">Background Style</p>
        <div className="grid grid-cols-2 gap-3">
          {BG_STYLES.map(({ id, label, preview }) => (
            <button
              key={id}
              onClick={() => onBgStyleChange(id)}
              className={`relative rounded-xl border overflow-hidden transition-colors text-left ${
                bgStyle === id
                  ? "border-purple-500/60"
                  : "border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div className={`h-20 ${preview}`} />
              <div className="px-3 py-2.5 bg-white/[0.02]">
                <p className="text-white text-sm font-medium">{label}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Font Pairing */}
      <section>
        <p className="text-white/60 text-sm font-medium mb-3">Font Pairing</p>
        <div className="space-y-3">
          {FONT_PAIRS.map(({ id, heading, sub, headingFont }) => (
            <button
              key={id}
              onClick={() => onFontPairChange(id)}
              className={`w-full text-left rounded-xl border p-4 transition-colors ${
                fontPair === id
                  ? "border-purple-500/60 bg-purple-500/5"
                  : "border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <p className={`${headingFont} text-white font-bold mb-1`}>{heading}</p>
              <p className="text-white/40 text-xs">{sub}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
