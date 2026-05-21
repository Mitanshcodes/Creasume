import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
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
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${robotoMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased noise-overlay">
        {children}
      </body>
    </html>
  );
}
