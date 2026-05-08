import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "NexusVision | AI-Powered Security Dashboard",
  description: "Professional AI-powered security surveillance dashboard with real-time object detection, face recognition, and intelligent monitoring capabilities. Built with Next.js and YOLOv8.",
  keywords: ["security", "AI", "surveillance", "object detection", "YOLOv8", "dashboard", "monitoring"],
  authors: [{ name: "Imad Nidal Hawara" }],
  openGraph: {
    title: "NexusVision | AI-Powered Security Dashboard",
    description: "Professional AI-powered security surveillance dashboard with real-time object detection and intelligent monitoring.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
