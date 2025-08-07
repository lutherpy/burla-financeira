import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMC Investe",
  description: "Sistema Simulado de Investimento",
  generator: "Lutero Chipenhe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="relative min-h-screen">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 -z-10 opacity-50 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
