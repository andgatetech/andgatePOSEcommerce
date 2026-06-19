import type { Metadata } from "next";
import Link from "next/link";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiBox,
  FiCheck,
  FiCheckCircle,
  FiClipboard,
  FiCreditCard,
  FiDatabase,
  FiGlobe,
  FiGrid,
  FiHeadphones,
  FiMessageCircle,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiStar,
  FiZap,
} from "react-icons/fi";
import Container from "@/components/shared/Container";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/lib/site";
import PartnerApplicationForm from "./_components/PartnerApplicationForm";

const pageUrl = `${SITE_URL}/become-partner`;

export const metadata: Metadata = {
  title: "Become a Hawkeri Partner | Sell Online in Bangladesh",
  description:
    "Apply to become a Hawkeri marketplace partner and grow with AndgatePOS inventory, order, customer, and analytics tools.",
  alternates: {
    canonical: "/become-partner",
  },
  keywords: [
    "sell online in bangladesh",
    "marketplace seller bangladesh",
    "ecommerce seller bangladesh",
    "become seller online",
    "start online business bangladesh",
    "multi vendor marketplace bangladesh",
    "online store bangladesh",
    "seller platform bangladesh",
    "andgatepos",
    "hawkeri seller",
  ],
  openGraph: {
    title: "Become a Hawkeri Partner",
    description:
      "Launch your digital store, connect with AndgatePOS, and reach shoppers across Bangladesh through Hawkeri.",
    url: pageUrl,
    siteName: "Hawkeri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Hawkeri Partner",
    description:
      "Sell across Bangladesh with Hawkeri and manage your business through AndgatePOS.",
  },
};

const benefits = [
  { title: "Nationwide customer reach", icon: FiGlobe },
  { title: "Marketplace exposure", icon: FiShoppingBag },
  { title: "Integrated inventory management", icon: FiDatabase },
  { title: "Unified online and offline sales", icon: FiShoppingBag },
  { title: "Easy store management", icon: FiGrid },
  { title: "Fast onboarding", icon: FiZap },
  { title: "Marketing support", icon: FiHeadphones },
  { title: "Business growth tools", icon: FiActivity },
  { title: "Secure order management", icon: FiShield },
  { title: "Mobile-friendly seller ecosystem", icon: FiSmartphone },
  { title: "Analytics and reporting", icon: FiBarChart2 },
  { title: "AndgatePOS integration", icon: FiPackage },
];

const partnerTypes = [
  "Fashion Stores",
  "Shoe Stores",
  "Electronics Stores",
  "Mobile Shops",
  "Computer Shops",
  "Grocery Businesses",
  "Home & Living Brands",
  "Beauty Brands",
  "Health Products",
  "Books & Stationery",
  "Sports Products",
  "Manufacturers",
  "Wholesalers",
  "Distributors",
  "Local Brands",
  "Home-Based Businesses",
  "SMEs",
  "Entrepreneurs",
];

const steps = [
  "Submit Application",
  "Business Review",
  "Demo & Consultation",
  "Store Setup",
  "AndgatePOS Integration",
  "Launch on Hawkeri",
  "Start Selling",
];

const posBenefits = [
  "Single inventory management",
  "Product synchronization",
  "Order management",
  "Stock tracking",
  "Customer management",
  "Business reporting",
  "Sales analytics",
  "Multi-branch support",
  "Offline + Online selling",
  "Barcode support",
  "Receipt generation",
  "Growth-ready platform",
];

const comparisonRows = [
  ["Customer reach", "Mostly local walk-in customers", "Online marketplace access across Bangladesh"],
  ["Inventory", "Manual or separated systems", "Single inventory flow with AndgatePOS"],
  ["Orders", "Phone calls, inboxes, and paper notes", "Structured order management and tracking"],
  ["Growth", "Limited visibility outside the local area", "Marketplace exposure, campaigns, and analytics"],
  ["Operations", "Offline and online handled separately", "Unified commerce workflow for store teams"],
];

const faqs = [
  {
    question: "How do I become a partner?",
    answer:
      "Submit the partner application form. The Hawkeri team reviews your business, schedules a consultation, and recommends the right marketplace and AndgatePOS setup.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on your business type, required POS setup, marketplace needs, and onboarding scope. The team will explain all costs during consultation.",
  },
  {
    question: "Do I need AndgatePOS?",
    answer:
      "AndgatePOS is recommended because it keeps inventory, orders, products, customers, and reports connected. Some partner cases may start with marketplace onboarding first.",
  },
  {
    question: "Can I sell without a physical store?",
    answer:
      "Yes. Home-based businesses, entrepreneurs, local brands, manufacturers, and distributors can apply if they can reliably fulfill orders.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Simple stores can move quickly after business review and product readiness. Larger catalogs, multi-branch operations, or custom setup may take longer.",
  },
  {
    question: "How are payouts handled?",
    answer:
      "Payout details are confirmed during onboarding based on your business profile, order flow, payment method, and marketplace agreement.",
  },
  {
    question: "What products can I sell?",
    answer:
      "Hawkeri supports many categories including fashion, footwear, electronics, grocery, beauty, home, books, sports, and local brand products, subject to marketplace policy.",
  },
  {
    question: "Can I manage inventory from one place?",
    answer:
      "Yes. The Hawkeri and AndgatePOS ecosystem is designed so product and stock operations can be managed through a unified business platform.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hawkeri",
    url: SITE_URL,
    brand: "Hawkeri",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Become a Partner",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function BecomePartnerPage() {
  return (
    <div className="bg-white text-(--color-dark)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f4fbff_0%,#ffffff_46%,#fff6eb_100%)] py-12 md:py-16 lg:py-20">
        <div className="absolute left-[-12rem] top-12 h-80 w-80 rounded-full bg-(--color-primary-100) blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-96 w-96 rounded-full bg-(--color-cta-100) blur-3xl" />
        <Container>
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <span className="inline-flex rounded-full border border-(--color-primary-200) bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-(--color-primary) shadow-sm">
                Hawkeri partner program
              </span>
              <h1 className="mt-5 max-w-[760px] text-[38px] font-extrabold leading-[1.02] tracking-[-0.05em] text-(--color-primary-900) md:text-[58px] lg:text-[68px]">
                Sell Across Bangladesh With Hawkeri
              </h1>
              <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-(--color-neutral-dark) md:text-[18px]">
                Reach more customers, manage products efficiently through AndgatePOS, and grow your business through Bangladesh&apos;s emerging marketplace ecosystem.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#partner-application"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-cta) px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(231,145,55,0.28)] transition hover:bg-(--color-cta-hover)"
                >
                  Apply Now
                  <FiArrowRight />
                </a>
                <a
                  href="#book-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-primary-200) bg-white px-6 py-3.5 text-sm font-extrabold text-(--color-primary-900) transition hover:border-(--color-primary)"
                >
                  Book a Demo
                </a>
                <a
                  href="tel:01577303608"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-border) bg-white/70 px-6 py-3.5 text-sm font-extrabold text-(--color-dark) transition hover:bg-white"
                >
                  Talk To Sales
                </a>
              </div>

              <div className="mt-8 grid max-w-[620px] gap-3 sm:grid-cols-3">
                {["Verified onboarding", "POS-ready workflow", "Marketplace growth"].map((item) => (
                  <div key={item} className="rounded-2xl border border-(--color-primary-100) bg-white/82 px-4 py-3 text-sm font-bold text-(--color-primary-900) shadow-sm">
                    <FiCheckCircle className="mb-2 h-5 w-5 text-(--color-primary)" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[28px] border border-(--color-primary-100) bg-white p-5 shadow-[0_30px_80px_rgba(2,58,92,0.12)]">
              <div className="rounded-[22px] bg-(--color-primary-900) p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--color-primary-200)">Unified commerce</p>
                <div className="mt-5 grid gap-3">
                  {[
                    { label: "Physical Store", icon: FiShoppingBag },
                    { label: "AndgatePOS", icon: FiCreditCard },
                    { label: "Hawkeri Marketplace", icon: FiGlobe },
                  ].map((item, index) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-(--color-primary)">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold">{item.label}</p>
                        <p className="mt-1 text-xs text-white/68">{index < 2 ? "Connected workflow" : "Customer acquisition channel"}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-(--color-cta) p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Result</p>
                  <p className="mt-1 text-xl font-extrabold">Unified Commerce Ecosystem</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="mb-8 max-w-3xl">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-cta-dark)">Why partner with Hawkeri</span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
              Built for sellers who want more than a listing
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[18px] border border-(--color-border) bg-white p-5 shadow-[0_14px_34px_rgba(2,58,92,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-primary-50) text-(--color-primary)">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-extrabold leading-snug text-(--color-primary-900)">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-(--color-bg-subtle) py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-primary)">Who can join</span>
              <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
                From local shops to growing brands
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-(--color-neutral-dark)">
                Hawkeri is designed for businesses that can offer reliable products, clear pricing, and dependable fulfillment.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {partnerTypes.map((type) => (
                <div key={type} className="flex items-center gap-2 rounded-xl border border-(--color-border) bg-white px-4 py-3 text-sm font-bold text-(--color-primary-900)">
                  <FiCheck className="h-4 w-4 shrink-0 text-(--color-cta)" />
                  {type}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="mb-9 text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-primary)">How it works</span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
              A clear path from application to launch
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-7">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-[18px] border border-(--color-primary-100) bg-white p-4 text-center shadow-[0_14px_34px_rgba(2,58,92,0.06)]">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary) text-sm font-extrabold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm font-extrabold leading-snug text-(--color-primary-900)">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-(--color-primary-900) py-12 text-white md:py-16">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-primary-200)">Why AndgatePOS</span>
              <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] md:text-[42px]">
                Hawkeri and AndgatePOS work together
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-white/72">
                Partners can run offline retail operations and marketplace selling through a connected workflow, reducing duplicate entry and improving operational visibility.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {posBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold">
                  <FiCheckCircle className="h-5 w-5 shrink-0 text-(--color-cta)" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-cta-dark)">Partner outcomes</span>
              <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
                Success stories ready for future content
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-(--color-neutral-dark)">
                This section is structured for future dynamic case studies, growth metrics, revenue examples, operational improvements, and customer acquisition wins.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Revenue growth", "Monthly seller sales lift"],
                ["Efficiency", "Less manual operation work"],
                ["Acquisition", "New customer reach"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[20px] border border-(--color-border) bg-white p-5 shadow-[0_14px_34px_rgba(2,58,92,0.06)]">
                  <FiStar className="h-6 w-6 text-(--color-cta)" />
                  <h3 className="mt-4 text-lg font-extrabold text-(--color-primary-900)">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-(--color-neutral-dark)">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="partner-application" className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-primary)">Partner application</span>
              <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
                Tell us about your business
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-(--color-neutral-dark)">
                Submit your details and the Hawkeri team will review your business fit, product readiness, AndgatePOS needs, and onboarding path.
              </p>
              <div id="book-demo" className="mt-6 rounded-[20px] border border-(--color-primary-100) bg-white p-5">
                <FiMessageCircle className="h-6 w-6 text-(--color-primary)" />
                <h3 className="mt-3 text-lg font-extrabold text-(--color-primary-900)">Prefer direct contact?</h3>
                <p className="mt-2 text-sm leading-6 text-(--color-neutral-dark)">Call sales at 01577-303608 or include demo timing in the notes field.</p>
              </div>
            </div>
            <PartnerApplicationForm partnerTypes={partnerTypes} />
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="mb-8 text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-primary)">Partner benefits comparison</span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
              Traditional Selling vs Hawkeri + AndgatePOS
            </h2>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-(--color-border) bg-white shadow-[0_18px_50px_rgba(2,58,92,0.08)]">
            {comparisonRows.map(([area, traditional, hawkeri], index) => (
              <div key={area} className={`grid gap-0 md:grid-cols-[0.6fr_1fr_1fr] ${index > 0 ? "border-t border-(--color-border)" : ""}`}>
                <div className="bg-(--color-primary-50) px-5 py-4 text-sm font-extrabold text-(--color-primary-900)">{area}</div>
                <div className="px-5 py-4 text-sm leading-6 text-(--color-neutral-dark)">{traditional}</div>
                <div className="flex gap-2 bg-(--color-cta-100)/45 px-5 py-4 text-sm font-bold leading-6 text-(--color-primary-900)">
                  <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-(--color-cta)" />
                  {hawkeri}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-(--color-bg-subtle) py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-(--color-primary)">FAQ</span>
              <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
                Common partner questions
              </h2>
              <Link href={ROUTES.CONTACT} className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-5 py-3 text-sm font-extrabold text-white transition hover:bg-(--color-primary-dark)">
                Contact Hawkeri
                <FiArrowRight />
              </Link>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-[18px] border border-(--color-border) bg-white p-5">
                  <h3 className="text-base font-extrabold text-(--color-primary-900)">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-(--color-neutral-dark)">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
