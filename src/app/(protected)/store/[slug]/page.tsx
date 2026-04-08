import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { storeMockData } from "../_components/storeMockData";
import { ROUTES } from "@/config/routes";

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = storeMockData.find((item) => item.slug === slug);

  if (!store) {
    notFound();
  }

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto px-4 py-8 md:px-5 lg:px-7 xl:px-8 xl:py-10">
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <Link href={ROUTES.STORE} className="transition hover:text-(--color-primary)">
            Store
          </Link>
          <FiChevronRight className="text-[14px]" />
          <span>{store.name}</span>
        </div>

        <div className="rounded-[26px] border border-(--color-border) bg-(--color-bg) p-8">
          <h1 className="text-[30px] font-semibold tracking-[-0.03em] text-(--color-dark)">
            {store.name}
          </h1>
          <p className="mt-4 max-w-[720px] text-sm leading-7 text-(--color-text-muted)">
            This is a mock store detail page for slug routing. Later you can replace this with dynamic
            vendor data, store products, ratings, banners, policies, and contact information loaded by
            slug.
          </p>
        </div>
      </div>
    </section>
  );
}
