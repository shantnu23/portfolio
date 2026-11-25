import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { profile, resume, site } from "@/content/profile";
import { assetExists } from "@/lib/assets";
import { getBaseUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: { default: site.title, template: `%s — ${profile.name}` },
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: ["Shantnu Saxena", "AI engineer", "software engineer", "LLM", "LangGraph", "full-stack", "portfolio", "BIT Mesra"],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090d13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const resumeHref = assetExists(resume.href) ? resume.href : null;

  return (
    // suppressHydrationWarning: browser extensions (e.g. crypto wallets) add attributes to <html>
    // before React loads. This only ignores attribute differences on this one element.
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-signal px-4 py-2 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar name={profile.name} resumeHref={resumeHref} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
