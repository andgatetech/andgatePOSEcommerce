export type DealItem = {
  id: number;
  title: string;
  vendor: string;
  rating: number;
  price: number;
  oldPrice: number;
  image: string;
  timeLeft: {
    days: string;
    hours: string;
    mins: string;
    secs: string;
  };
};

export const dealsOfTheDay: DealItem[] = [
  {
    id: 1,
    title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
    vendor: "NestFood",
    rating: 4,
    price: 32.85,
    oldPrice: 33.8,
    image: "/images/banner-5.png",
    timeLeft: {
      days: "00",
      hours: "00",
      mins: "00",
      secs: "00",
    },
  },
  {
    id: 2,
    title: "Perdue Simply Smart Organics Gluten Free",
    vendor: "Old El Paso",
    rating: 4,
    price: 24.85,
    oldPrice: 26.8,
    image: "/images/banner-6.png",
    timeLeft: {
      days: "19",
      hours: "09",
      mins: "27",
      secs: "54",
    },
  },
  {
    id: 3,
    title: "Signature Wood-Fired Mushroom and Caramelized",
    vendor: "Progresso",
    rating: 3,
    price: 12.85,
    oldPrice: 13.8,
    image: "/images/banner-7.png",
    timeLeft: {
      days: "353",
      hours: "09",
      mins: "27",
      secs: "54",
    },
  },
  {
    id: 4,
    title: "Simply Lemonade with Raspberry Juice",
    vendor: "Yoplait",
    rating: 3,
    price: 15.85,
    oldPrice: 16.8,
    image: "/images/banner-5.png",
    timeLeft: {
      days: "00",
      hours: "00",
      mins: "00",
      secs: "00",
    },
  },
];
