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
  title: "Plagiarism Remover - Refactor Your Code Easily",
  description: "Use our AI tool to remove plagiarism from code by renaming variables, restructuring logic, and more. 100% functionality preserved.",
  keywords: ["Plagiarism Remover", "Code Refactor", "AI Code Transformer", "Remove Code Plagiarism"],
  authors: [{ name: "Nodepulse" }],
  creator: "Nodepulse",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Plagiarism Remover - Refactor Your Code Easily",
    description: "Use our AI tool to remove plagiarism from code and keep its logic intact.",
    siteName: "Plagiarism Remover",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Plagiarism Remover Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plagiarism Remover - Refactor Your Code Easily",
    description: "Use AI to restructure and de-plagiarize your code while keeping functionality intact.",
    creator: "@yourTwitterHandle",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
