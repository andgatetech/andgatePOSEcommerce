import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import type { Store } from "@/types";
import { FiMapPin } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";

interface FeaturedStoresProps {
    stores: Store[];
}

export default function FeaturedStores({ stores }: FeaturedStoresProps) {
    if (!stores.length) return null;

    return (
        <section className="bg-gray-50 py-12 sm:py-16">
            <Container>
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                            Featured Stores
                        </span>
                        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Popular Stores</h2>
                        <p className="mt-1 text-sm text-neutral">Explore products from verified local stores</p>
                    </div>
                    <Link
                        href={ROUTES.STORE}
                        className="hidden text-sm font-medium text-primary hover:underline sm:block"
                    >
                        View All Stores →
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {stores.slice(0, 6).map((store) => (
                        <Link
                            key={store.id}
                            href={ROUTE_BUILDERS.storeDetail(store.slug)}
                            className="group rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                        >
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-primary-50 p-2">
                                {store.logo_path ? (
                                    <Image
                                        src={store.logo_path}
                                        alt={store.store_name}
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-primary">
                                        {store.store_name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                {store.store_name}
                            </h3>
                            {store.store_location && (
                                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-neutral">
                                    <FiMapPin className="h-3 w-3" />
                                    {store.store_location}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
