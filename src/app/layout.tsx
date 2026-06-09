import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atia Shaheen — Local SEO Specialist for Home Renovation | Rank on Google Maps & AI Overviews",
  description:
    "Atia Shaheen helps home renovation contractors, junk removal companies, garage door repair services, plumbers, and home service businesses rank on Google Maps, Local Pack, and AI Overviews. Serving USA, UAE, KSA, and Pakistan.",
  keywords: [
    "home renovation SEO",
    "contractor SEO",
    "home service business SEO",
    "junk removal SEO",
    "garage door repair SEO",
    "plumbing SEO",
    "kitchen remodeler near me",
    "emergency plumber SEO",
    "garage door installation SEO",
    "home improvement marketing",
    "contractor lead generation",
    "local service ads",
    "Google Guaranteed",
    "Google Business Profile optimization",
    "local pack ranking",
    "near me searches",
    "NAP consistency",
    "citation building",
    "local search ranking",
    "Google Maps optimization",
    "AI Overviews optimization",
    "SGE optimization",
    "entity-based SEO",
    "E-E-A-T signals",
    "structured data SEO",
    "knowledge graph optimization",
    "voice search optimization",
    "conversational search SEO",
    "local SEO specialist",
    "home renovation marketing",
    "HVAC SEO",
    "roofing SEO",
    "bathroom renovation SEO",
  ],
  authors: [{ name: "Atia Shaheen" }],
  openGraph: {
    title: "Atia Shaheen — Local SEO Specialist for Home Renovation",
    description:
      "Helping home renovation contractors rank on Google Maps, Local Pack, and AI Overviews. USA, UAE, KSA, Pakistan.",
    url: "https://atiashaheen.com",
    siteName: "Atia Shaheen SEO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atia Shaheen — Local SEO Specialist for Home Renovation",
    description:
      "Helping home renovation contractors rank on Google Maps, Local Pack, and AI Overviews.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
