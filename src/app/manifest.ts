import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hawkeri",
    short_name: "Hawkeri",
    description: "Hawkeri Ecommerce Platform",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#e79237",
    background_color: "#ffffff",
    categories: ["shopping", "ecommerce"],
    icons: [
      {
        src: "/images/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Daily Deals",
        url: "/deal-of-day",
        description: "Browse today's best deals",
      },
      {
        name: "My Cart",
        url: "/cart",
        description: "View your shopping cart",
      },
    ],
  };
}
