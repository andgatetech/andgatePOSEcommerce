import ReduxProvider from "@/lib/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Hawkeri",
    template: "Hawkeri | %s",
  },
  description: "Hawkeri Ecommerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
