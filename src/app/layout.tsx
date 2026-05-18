import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Creasume — The Resume for the Creator Economy",
    template: "%s | Creasume",
  },
  description:
    "Turn your social presence into a live professional profile. Creasume converts Instagram and YouTube analytics into a beautiful Influence Card for brands.",
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "https://creasume.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Creasume",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
