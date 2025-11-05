import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://angelmedina.io'),
  title: {
    default: "Angel Medina - Full Stack Developer & 3D Web Specialist",
    template: "%s | Angel Medina",
  },
  description: "Full stack developer specializing in React, Next.js, Rust, and immersive 3D web experiences. Building modern, scalable applications with cutting-edge technologies.",
  keywords: [
    "Angel Medina",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Rust Developer",
    "Three.js",
    "3D Web Development",
    "WebGL",
    "TypeScript",
    "PostgreSQL",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Angel Medina" }],
  creator: "Angel Medina",
  publisher: "Angel Medina",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Angel Medina Portfolio",
    title: "Angel Medina - Full Stack Developer & 3D Web Specialist",
    description: "Full stack developer specializing in React, Next.js, Rust, and immersive 3D web experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Angel Medina Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Medina - Full Stack Developer & 3D Web Specialist",
    description: "Full stack developer specializing in React, Next.js, Rust, and immersive 3D web experiences.",
    creator: "@angel_rust",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://angelmedina.io'} />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
