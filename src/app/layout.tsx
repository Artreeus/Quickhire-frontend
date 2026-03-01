import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QuickHire - Find Your Dream Job",
  description:
    "Great platform for job seekers searching for new career heights and passionate about startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${epilogue.variable} font-[var(--font-epilogue)] antialiased`}>
        <Toaster position="top-right" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
