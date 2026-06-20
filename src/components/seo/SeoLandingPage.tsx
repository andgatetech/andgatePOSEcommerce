import Container from "@/components/shared/Container";
import { seoPages, type SeoPage } from "@/lib/seo-pages";
import Link from "next/link";
import { FaArrowLeft, FaCheckCircle, FaQuestionCircle, FaSearch, FaStore } from "react-icons/fa";

export default function SeoLandingPage({ page }: { page: SeoPage }) {
  const relatedPages = seoPages.filter((item) => item.slug !== page.slug).slice(0, 6);

  return (
    <div className="bg-(--color-bg)">
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
              {page.eyebrow}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.04em] md:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-(--color-primary-100)">
              {page.intro}
            </p>
            <p lang="bn" className="mt-4 max-w-3xl text-base leading-8 text-white/75">
              {page.banglaIntro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-xl bg-(--color-cta) px-7 py-3.5 text-sm font-bold text-white transition hover:bg-(--color-cta-hover)"
              >
                Shop Products
              </Link>
              <Link
                href="/become-vendor"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Become a Vendor
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.highlights.map((highlight) => (
              <div key={highlight} className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
                <FaCheckCircle className="mb-4 text-xl text-(--color-primary)" />
                <p className="text-sm font-bold leading-6 text-(--color-dark)">{highlight}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="h-fit rounded-3xl border border-(--color-border) bg-(--color-primary-50) p-6">
              <FaStore className="mb-4 text-2xl text-(--color-primary)" />
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--color-primary-900)">
                Search intent
              </h2>
              <p className="mt-3 text-sm leading-7 text-(--color-neutral-dark)">
                {page.audience}
              </p>
              <div className="mt-6 space-y-3">
                {[page.primaryKeyword, ...page.secondaryKeywords].map((keyword) => (
                  <div key={keyword} className="flex gap-3 text-sm font-semibold text-(--color-primary-900)">
                    <FaCheckCircle className="mt-1 shrink-0 text-(--color-primary)" />
                    <span>{keyword}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="space-y-8">
              {page.sections.map((section) => (
                <section key={section.title} className="rounded-3xl border border-(--color-border) bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--color-primary-900)">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-(--color-neutral-dark)">
                    {section.body}
                  </p>
                  {section.items?.length ? (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3 rounded-2xl bg-(--color-primary-50) p-4 text-sm font-semibold leading-6 text-(--color-primary-900)">
                          <FaCheckCircle className="mt-1 shrink-0 text-(--color-primary)" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <FaQuestionCircle className="mx-auto mb-4 text-3xl text-(--color-primary)" />
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-(--color-primary-900)">
                Frequently asked questions
              </h2>
            </div>
            <div className="divide-y divide-(--color-border) rounded-3xl border border-(--color-border) bg-white shadow-sm">
              {page.faq.map((item) => (
                <details key={item.question} className="group p-6">
                  <summary className="cursor-pointer list-none text-base font-extrabold text-(--color-primary-900)">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-(--color-neutral-dark)">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-(--color-primary-900)">
                Related Hawkeri guides
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-(--color-neutral-dark)">
                Explore connected Bangladesh ecommerce pages that support the same search topic cluster.
              </p>
            </div>
            <Link
              href="/shopping-guides-bangladesh"
              className="inline-flex w-fit items-center justify-center rounded-xl border border-(--color-border) bg-(--color-primary-50) px-5 py-3 text-sm font-bold text-(--color-primary-900) transition hover:border-(--color-primary)"
            >
              View all guides
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="rounded-2xl border border-(--color-border) bg-(--color-bg) p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
                  {item.primaryKeyword}
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-(--color-primary-900)">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-(--color-neutral-dark)">
                  {item.intro}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
