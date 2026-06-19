import Container from "@/components/shared/Container";

interface TrustStats {
    stores: number;
    products: number;
}

const formatStat = (n: number): number => {
    if (n < 10) return Math.max(n, 10); // minimum 10 for display
    if (n < 50) return Math.ceil(n / 5) * 5;
    if (n < 100) return Math.ceil(n / 10) * 10;
    return Math.ceil(n / 100) * 100;
};

const displayNumber = (n: number): string => (
    n >= 1000 ? `${(Math.floor(n / 100) / 10).toFixed(1).replace(/\.0$/, "")}k` : String(n)
);

export default function TrustStatsBar({ stats }: { stats: TrustStats }) {
    const displayStores = formatStat(stats.stores);
    const displayProducts = formatStat(stats.products);
    const supportMetrics = [
        { value: displayStores, label: "Verified Stores", suffix: "+" },
        { value: displayProducts, label: "Products to Browse", suffix: "+" },
        { value: 64, label: "District Delivery Coverage", suffix: "" },
        { value: 24, label: "Order Support Window", suffix: "/7" },
    ];

    return (
        <section className="py-6 sm:py-8">
            <Container>
                <div className="rounded-[24px] border border-(--color-primary-100) bg-white px-4 py-5 shadow-[0_16px_42px_rgba(2,58,92,0.07)] sm:px-6 md:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {supportMetrics.map((item, index) => (
                            <div
                                key={item.label}
                                className={[
                                    "text-center sm:text-left",
                                    index > 0 ? "border-primary-100 sm:border-l sm:pl-6" : "",
                                ].filter(Boolean).join(" ")}
                            >
                                <div className="text-2xl font-extrabold tracking-[-0.03em] text-(--color-primary-900) sm:text-3xl">
                                    {displayNumber(item.value)}{item.suffix}
                                </div>
                                <p className="mt-1 text-sm font-semibold text-neutral-dark">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
