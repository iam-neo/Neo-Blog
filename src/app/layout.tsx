import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/command-palette";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Neo Blog — Nirmal Magar",
    template: "%s | Neo Blog",
  },
  description:
    "Personal blog by Nirmal Magar. Web developer, SEO enthusiast, and lifelong learner sharing thoughts on code, design, and the internet.",
  keywords: [
    "Nirmal Magar",
    "web development",
    "blog",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Nirmal Magar", url: "https://github.com/iam-neo" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Neo Blog",
    title: "Neo Blog — Nirmal Magar",
    description:
      "Personal blog by Nirmal Magar. Thoughts on web development, code, and the internet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <CommandPalette posts={getAllPosts().map(p => ({ slug: p.slug, title: p.title }))} />
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
