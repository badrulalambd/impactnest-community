
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { Toaster } from "react-hot-toast";
import AuthToastListener from "@/components/auth/auth-toast-listener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImpactNest Community",
  description:
    "Connect, collaborate, and make a meaningful social impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              success: {
                duration: 3000,
              },
              error: {
                duration: 4000,
              },
            }}
          />

          <AuthToastListener />
        </ThemeProvider>
      </body>
    </html>
  );
}
