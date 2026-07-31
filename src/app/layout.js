import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper/LayoutWrapper";
import { ToastContainer } from "react-toastify";
import VisitTracker from "./components/VisitTracker";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://mdantormia.vercel.app"),
  verification: {
    google: "ZNBz05NMgYFbEC_1mN62sfQjKVpTDZjDRVTGnQKbAg4", // কোড থেকে আপনার নির্দিষ্ট স্ট্রিংটি দিন
  },
  title: {
    default: "Md Antor Mia - MERN Stack Developer",
    template: "%s | Md Antor Mia",
  },
  description: "Portfolio of Md Antor Mia. Specializing in modern web application development with React, Next.js, and JavaScript.",
  
  keywords: [
    "Md Antor Mia",
    "mdantormia",
    "md antor mia",
    "Md Antor",
    "Antor",
    "antor",
    "Antor Mia",
    "MERN STACK DEVELOPER",
    "mern stack developer",
    "Frontend Developer",
    "Web Developer Bangladesh",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  
  authors: [{ name: "Md Antor Mia" }],
  creator: "Md Antor Mia",
  
  alternates: {
    canonical: "https://mdantormia.vercel.app",
  },

  openGraph: {
    title: "Md Antor Mia - Frontend Web Developer",
    description: "Building modern, high-performance web applications with React & Next.js.",
    url: "https://mdantormia.vercel.app",
    siteName: "Md Antor Mia",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Md Antor Mia - Frontend Web Developer",
    description: "Building modern, high-performance web applications with React & Next.js.",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <VisitTracker />
        <LayoutWrapper>{children}</LayoutWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}