import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="flex items-center px-6 h-16 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center">
            <span className="text-white text-sm font-bold">✕</span>
          </div>
          <span className="font-heading font-bold text-white text-lg">Creasume</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
