import Container from "@/components/shared/Container";
import { seoPages } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaSearch, FaStore } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Bangladesh Online Shopping Guides",
  description:
    "Explore Hawkeri SEO guides for online shopping in Bangladesh, ecommerce marketplace, COD shopping, fashion, electronics, beauty, grocery and selling online.",
  alternates: {
    canonical: `${SITE_URL}/shopping-guides-bangladesh`,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: `${SITE_URL}/shopping-guides-bangladesh`,
    siteName: "Hawkeri",
    title: "Bangladesh Online Shopping Guides | Hawkeri",
    description:
      "A connected hub for Hawkeri ecommerce, online shopping and vendor guides for Bangladesh.",
  },
};

export default function ShoppingGuidesBangladeshPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bangladesh Online Shopping Guides",
    url: `${SITE_URL}/shopping-guides-bangladesh`,
    description:
      "Hawkeri guides for online shopping, marketplace buying, cash on delivery, local sellers and selling online in Bangladesh.",
    hasPart: seoPages.map((page) => ({
      "@type": "WebPage",
      name: page.title,
      url: `${SITE_URL}/${page.slug}`,
      about: page.primaryKeyword,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bangladesh Online Shopping Guides",
        item: `${SITE_URL}/shopping-guides-bangladesh`,
      },
    ],
  };

  return (
    <div className="bg-(--color-bg)">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-(--color-primary-900) py-16 text-white">
        <Container>
          <div className="max-w-4xl">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
              Back to Hawkeri
            </Link>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--color-cta)">
              <FaSearch />
              Search Guides
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.04em] md:text-6xl">
              Bangladesh online shopping and seller guides
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-(--color-primary-100)">
              A connected Hawkeri content hub for shoppers, sellers, and SMEs searching for online shopping, marketplace, cash on delivery, fashion, electronics, beauty, grocery, and vendor information in Bangladesh.
            </p>
            <p lang="bn" className="mt-4 max-w-3xl text-base leading-8 text-white/75">
              বাংলাদেশে online shopping, marketplace, cash on delivery, seller storefront এবং local ecommerce সম্পর্কে Hawkeri-এর SEO guide hub।
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-10 max-w-3xl">
            <FaStore className="mb-4 text-3xl text-(--color-primary)" />
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-(--color-primary-900)">
              All Hawkeri SEO guides
            </h2>
            <p className="mt-4 text-base leading-8 text-(--color-neutral-dark)">
              These pages are connected from one hub so users, Google, and AI answer engines can understand Hawkeri as a Bangladesh-focused ecommerce marketplace for both buyers and sellers.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {seoPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
                  {page.primaryKeyword}
                </p>
                <h3 className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-(--color-primary-900)">
                  {page.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-(--color-neutral-dark)">
                  {page.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-(--color-primary)">
                  Read guide
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
