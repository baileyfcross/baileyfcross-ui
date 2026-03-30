import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bailey Cross - Portfolio",
  description: "Welcome to Bailey Cross's portfolio website. Explore my projects, learn about my background, and discover my hobbies.",
  keywords: ["portfolio", "developer", "projects", "Bailey Cross"],
  authors: [{ name: "Bailey Cross" }],
  creator: "Bailey Cross",
  openGraph: {
    title: "Bailey Cross - Portfolio",
    description: "Welcome to Bailey Cross's portfolio website",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Bailey Cross. All rights reserved.</p>
              <p className="mt-2 text-sm">Built with Next.js and Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
