import ReduxProvider from "@/lib/providers";
import ServiceWorkerRegistration from "@/components/shared/ServiceWorkerRegistration";
import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#e79237",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hawkeri | Online Shopping in Bangladesh",
    template: "%s | Hawkeri",
  },
  description:
    "Hawkeri is a Bangladesh-focused online shopping marketplace for fashion, beauty, electronics, grocery, daily essentials and local sellers with COD and digital payment-friendly shopping.",
  keywords: [
    "online shopping in Bangladesh",
    "ecommerce marketplace Bangladesh",
    "trusted online shopping Bangladesh",
    "cash on delivery Bangladesh",
    "fashion shopping Bangladesh",
    "electronics online shopping Bangladesh",
    "beauty products online Bangladesh",
    "grocery shopping online Bangladesh",
    "sell online Bangladesh",
    "become vendor Bangladesh",
    "হকারি",
    "অনলাইন শপিং বাংলাদেশ",
    "ক্যাশ অন ডেলিভারি বাংলাদেশ",
  ],
  applicationName: "Hawkeri",
  authors: [{ name: "Hawkeri", url: SITE_URL }],
  creator: "Hawkeri",
  publisher: "Hawkeri",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: SITE_URL,
    siteName: "Hawkeri",
    title: "Hawkeri | Online Shopping in Bangladesh",
    description:
      "Shop fashion, beauty, electronics, grocery and daily essentials from local sellers on Hawkeri, a Bangladesh-focused ecommerce marketplace.",
    images: [{ url: "/images/Hawkeri1.png", width: 1200, height: 630, alt: "Hawkeri online shopping Bangladesh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawkeri | Online Shopping in Bangladesh",
    description:
      "Bangladesh-focused marketplace for online shopping, COD-friendly buying and local seller storefronts.",
    images: ["/images/Hawkeri1.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hawkeri",
  },
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon.ico" },
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hawkeri",
    url: SITE_URL,
    logo: `${SITE_URL}/images/Hawkeri1.png`,
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hawkeri",
    url: SITE_URL,
    inLanguage: ["en-BD", "bn-BD"],
    publisher: {
      "@type": "Organization",
      name: "Hawkeri",
      url: SITE_URL,
    },
  };

  const onlineStoreSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "Hawkeri",
    url: SITE_URL,
    description:
      "Bangladesh-focused online shopping marketplace for local sellers, COD-friendly buying, fashion, electronics, beauty, grocery and daily essentials.",
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(onlineStoreSchema) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          {children}
          <ServiceWorkerRegistration />
        </ReduxProvider>
      </body>
    </html>
  );
}
