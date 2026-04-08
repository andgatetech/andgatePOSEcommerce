import Image from "next/image";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

export type PopularProduct = {
  id: number;
  category: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  discountPercent: number;
};

type PopularProductCardProps = {
  product: PopularProduct;
};

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function PopularProductCard({
  product,
}: PopularProductCardProps) {
  const fullStars = Math.round(product.rating);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_10px_35px_rgba(19,45,69,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(19,45,69,0.12)]">
      <div className="relative p-4 pb-3">
        <button
          type="button"
          aria-label={`Save ${product.title} to wishlist`}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) bg-white/95 text-(--color-primary-900) shadow-[0_8px_22px_rgba(19,45,69,0.08)] transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
        >
          <FiHeart className="text-[18px]" />
        </button>

        <div className="relative flex h-[176px] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,var(--color-primary-100),#ffffff)] px-8">
          <div className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-(--color-primary-100) blur-2xl" />
          <Image
            src={product.image}
            alt={product.title}
            fill
            unoptimized
            className="object-contain p-9 transition duration-300 group-hover:scale-[1.05]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-(--color-text-muted)">
          {product.category}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-[42px] text-[16px] font-semibold leading-[1.3] text-(--color-primary-900)">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-[16px] leading-none">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <FiStar
                key={index}
                className={
                  index < fullStars
                    ? "fill-(--color-cta) text-(--color-cta)"
                    : "text-[#cdd6df]"
                }
              />
            ))}
          </div>
          <span className="text-[13px] text-(--color-text-muted)">
            ({product.reviewCount})
          </span>
        </div>

        <p className="mt-2 text-[14px] text-(--color-text-muted)">
          By <span className="font-semibold text-(--color-primary)">{product.brand}</span>
        </p>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-[18px] font-semibold text-(--color-primary)">
            {formatPrice(product.price)}
          </span>
          <span className="mb-[2px] text-[13px] font-medium text-(--color-text-muted) line-through">
            {formatPrice(product.oldPrice)}
          </span>
          <span className="mb-[1px] text-[13px] font-semibold text-(--color-danger)">
            {product.discountPercent}% OFF
          </span>
        </div>

        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center gap-[6px] rounded-[12px] bg-(--color-primary) px-4 py-[10px] text-[14px] font-semibold text-white transition hover:bg-(--color-primary-dark)"
        >
          <FiShoppingCart className="text-sm" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
