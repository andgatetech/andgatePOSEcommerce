import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import type { Category } from "@/types";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";

interface CategoryShowcaseProps {
    categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
    if (categories.length < 4) return null;

    const topCategories = categories.slice(0, 4);

    return (
        <section className="bg-white py-12 sm:py-16">
            <Container>
                <div className="mb-8 text-center">
                    <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        Shop by Category
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Top Categories
                    </h2>
                    <p className="mt-1 text-neutral">Browse products from your favorite categories</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {topCategories.map((cat, i) => (
                        <Link
                            key={cat.id}
                            href={ROUTE_BUILDERS.categoryDetail(cat.slug)}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={`/images/banner/banner (${(i % 4) + 1}).png`}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                                <p className="mt-1 text-sm text-white/80 flex items-center gap-1">
                                    Shop now
                                    <span className="transition-transform group-hover:translate-x-1">→</span>
                                </p>
                            </div>
                        </Link>
                    ))}
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
