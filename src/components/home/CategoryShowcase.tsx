import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import type { Category } from "@/types";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";

interface CategoryShowcaseProps {
    categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
    if (categories.length < 4) return null;

    const topCategories = categories.slice(0, 4);
    const fallbackImages = [
        "/images/hawkeri/home/category-grocery.jpg",
        "/images/hawkeri/home/category-footwear.jpg",
        "/images/hawkeri/home/category-beauty.jpg",
        "/images/hawkeri/home/category-store.jpg",
    ];

    return (
        <section className="bg-white py-10 sm:py-14">
            <Container>
                <div className="mb-8 text-center">
                    <span className="inline-flex rounded-full border border-(--color-primary-200) bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-(--color-primary) shadow-sm">
                        Shop by Category
                    </span>
                    <h2 className="mt-3 text-[30px] font-extrabold tracking-[-0.04em] text-(--color-primary-900) sm:text-[40px]">
                        Top Categories
                    </h2>
                    <p className="mt-2 text-(--color-neutral-dark)">Browse products from your favorite categories</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {topCategories.map((cat, i) => {
                        const image = resolveImageUrl(cat.image_url) || fallbackImages[i % fallbackImages.length];
                        return (
                        <Link
                            key={cat.id}
                            href={ROUTE_BUILDERS.categoryDetail(cat.slug)}
                            className="group relative overflow-hidden rounded-[26px] border border-(--color-primary-100) bg-white shadow-[0_18px_44px_rgba(2,58,92,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(2,58,92,0.14)]"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={image}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,58,92,0.02)_0%,rgba(2,58,92,0.22)_45%,rgba(2,58,92,0.78)_100%)]" />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/82 p-4 backdrop-blur-md">
                                <h3 className="text-lg font-extrabold text-(--color-primary-900)">{cat.name}</h3>
                                <p className="mt-1 flex items-center gap-1 text-sm font-bold text-(--color-cta-dark)">
                                    Shop now
                                    <span className="transition-transform group-hover:translate-x-1">→</span>
                                </p>
                            </div>
                        </Link>
                    );
                    })}
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href={ROUTES.CATEGORY}
                        className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary-50"
                    >
                        View All Categories
                        <span className="text-lg">→</span>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
