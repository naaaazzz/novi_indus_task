import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NexLearn futuristic learning",
  description: "NexLearn futuristic learning platform",
  icons: {
    icon: "/NexLearn_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interSans.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
