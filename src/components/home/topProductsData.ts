export type MiniProduct = {
  id: number;
  title: string;
  rating: number;
  price: number;
  oldPrice: number;
  image: string;
};

export type ProductColumn = {
  id: string;
  label: string;
  products: MiniProduct[];
};

const demoProducts: MiniProduct[] = [
  {
    id: 1,
    title: "Nestle Original Coffee-Mate Coffee Creamer",
    rating: 4,
    price: 32.85,
    oldPrice: 33.8,
    image: "/images/banner-5.png",
  },
  {
    id: 2,
    title: "Organic Cage-Free Grade A Large Brown Eggs",
    rating: 4,
    price: 32.85,
    oldPrice: 33.8,
    image: "/images/banner-6.png",
  },
  {
    id: 3,
    title: "Nestle Original Coffee-Mate Coffee Creamer",
    rating: 4,
    price: 32.85,
    oldPrice: 33.8,
    image: "/images/banner-7.png",
  },
];

export const productColumns: ProductColumn[] = [
  {
    id: "top-selling",
    label: "Top Selling",
    products: [
      demoProducts[0],
      demoProducts[1],
      demoProducts[2],
    ],
  },
  {
    id: "trending",
    label: "Trending Products",
    products: [
      {
        id: 4,
        title: "Organic Cage-Free Grade A Large Brown Eggs",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-6.png",
      },
      {
        id: 5,
        title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-5.png",
      },
      {
        id: 6,
        title: "Naturally Flavored Cinnamon Vanilla Light Roast Coffee",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-7.png",
      },
    ],
  },
  {
    id: "recently-added",
    label: "Recently Added",
    products: [
      {
        id: 7,
        title: "Pepperidge Farm Farmhouse Hearty White Bread",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-5.png",
      },
      {
        id: 8,
        title: "Organic Frozen Triple Berry Blend",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-6.png",
      },
      {
        id: 9,
        title: "Oroweat Country Buttermilk Bread",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-7.png",
      },
    ],
  },
  {
    id: "top-rated",
    label: "Top Rated",
    products: [
      {
        id: 10,
        title: "Foster Farms Takeout Crispy Classic Buffalo Wings",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-5.png",
      },
      {
        id: 11,
        title: "Angie's Boomchickapop Sweet & Salty Kettle Corn",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-6.png",
      },
      {
        id: 12,
        title: "All Natural Italian-Style Chicken Meatballs",
        rating: 4,
        price: 32.85,
        oldPrice: 33.8,
        image: "/images/banner-7.png",
      },
    ],
  },
];
