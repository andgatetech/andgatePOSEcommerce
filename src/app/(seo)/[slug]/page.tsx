import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { getSeoPage, seoPages } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type SeoSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: SeoSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) return {};

  const url = `${SITE_URL}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_BD",
      url,
      siteName: "Hawkeri",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [{ url: `${SITE_URL}/images/Hawkeri1.png`, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${SITE_URL}/images/Hawkeri1.png`],
    },
  };
}

export default async function SeoSlugPage({ params }: SeoSlugPageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) notFound();

  const pageUrl = `${SITE_URL}/${page.slug}`;

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

  const onlineStoreSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: page.title,
    url: pageUrl,
    description: page.metaDescription,
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Hawkeri",
      url: SITE_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(onlineStoreSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SeoLandingPage page={page} />
    </>
  );
}
