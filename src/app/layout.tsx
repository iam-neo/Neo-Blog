import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
