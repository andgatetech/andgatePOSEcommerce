import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiMapPin, FiShield } from "react-icons/fi";
import Container from "@/components/shared/Container";
import type { Store } from "@/types";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";

interface FeaturedStoresProps {
    stores: Store[];
}

export default function FeaturedStores({ stores }: FeaturedStoresProps) {
    if (!stores.length) return null;

    return (
        <section className="py-12 sm:py-14 lg:py-16">
            <Container>
                <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[640px]">
                        <span className="inline-flex items-center gap-2 rounded-full border border-(--color-primary-200) bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-(--color-primary) shadow-sm">
                            <FiShield className="h-3.5 w-3.5" />
                            Verified seller network
                        </span>
                        <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-(--color-primary-900) sm:text-[38px]">
                            Popular Hawkeri stores
                        </h2>
                        <p className="mt-2 text-[15px] leading-7 text-(--color-neutral-dark)">
                            Shop directly from local sellers with active products, clear store pages, and a cleaner discovery path.
                        </p>
                    </div>
                    <Link
                        href={ROUTES.STORE}
                        className="inline-flex w-fit items-center gap-2 rounded-[8px] bg-(--color-primary) px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(4,108,169,0.18)] transition hover:bg-(--color-primary-dark)"
                    >
                        View all stores
                        <FiArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {stores.slice(0, 6).map((store) => (
                        <Link
                            key={store.id}
                            href={ROUTE_BUILDERS.storeDetail(store.slug)}
                            className="group flex min-h-[176px] flex-col rounded-[8px] border border-(--color-primary-100) bg-white p-3 text-center shadow-[0_12px_30px_rgba(2,58,92,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:shadow-[0_18px_44px_rgba(2,58,92,0.12)]"
                        >
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[8px] border border-(--color-primary-100) bg-(--color-primary-50) p-2">
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
                            <h3 className="line-clamp-2 min-h-[38px] text-[14px] font-extrabold leading-[1.35] text-(--color-primary-900) transition-colors group-hover:text-(--color-primary)">
                                {store.store_name}
                            </h3>
                            {store.store_location && (
                                <p className="mt-auto flex items-center justify-center gap-1 pt-3 text-[12px] font-medium text-(--color-neutral-dark)">
                                    <FiMapPin className="h-3.5 w-3.5 shrink-0 text-(--color-primary)" />
                                    <span className="line-clamp-1">{store.store_location}</span>
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
