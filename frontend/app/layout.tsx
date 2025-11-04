import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import CommandPalette from "@/components/ui/CommandPalette";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Toaster } from "sonner";
import ConsoleEasterEgg from "@/components/ui/ConsoleEasterEgg";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angel Medina - Full Stack Developer",
  description: "Modern 3D portfolio showcasing full stack development projects and expertise",
  keywords: ["developer", "full stack", "3D", "portfolio", "React", "Rust"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConsoleEasterEgg />
        <SmoothScroll>
          <Navigation />
          {children}
          <CommandPalette />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(0, 163, 255, 0.3)',
                color: '#D3D3D3',
              },
            }}
          />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
