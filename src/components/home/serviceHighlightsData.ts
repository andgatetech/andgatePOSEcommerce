export type ServiceHighlight = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
};

export const serviceHighlights: ServiceHighlight[] = [
  {
    id: 1,
    title: "Best prices & offers",
    subtitle: "Orders over ৳5000",
    icon: "/images/svg/best-price.svg",
  },
  {
    id: 2,
    title: "Free delivery",
    subtitle: "24/7 support",
    icon: "/images/svg/free-delivery.svg",
  },
  {
    id: 3,
    title: "Great daily deal",
    subtitle: "Special discounts",
    icon: "/images/svg/daily-deal.svg",
  },
  {
    id: 4,
    title: "Wide assortment",
    subtitle: "More categories",
    icon: "/images/svg/wide-assortment.svg",
  },
  {
    id: 5,
    title: "Easy returns",
    subtitle: "30 day returns",
    icon: "/images/svg/easy-returns.svg",
  },
];
