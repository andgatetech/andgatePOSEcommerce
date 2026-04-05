import type { IconType } from "react-icons";
import {
  FiCoffee,
  FiGrid,
  FiHeadphones,
  FiPackage,
  FiShoppingBag,
  FiSun,
} from "react-icons/fi";
import { GiAppleCore, GiKiwiFruit, GiStrawberry, GiWatermelon } from "react-icons/gi";

export type FeaturedCategoryTab = {
  id: string;
  label: string;
};

export type FeaturedCategoryItem = {
  id: number;
  name: string;
  itemCount: number;
  icon: IconType;
  accent: string;
  background: string;
};

export const featuredCategoryItems: FeaturedCategoryItem[] = [
  {
    id: 1,
    name: "Red Apple",
    itemCount: 54,
    icon: GiAppleCore,
    accent: "#c8544b",
    background: "#f8e9e3",
  },
  {
    id: 2,
    name: "Snack",
    itemCount: 56,
    icon: FiPackage,
    accent: "#d7a21c",
    background: "#f7ebdf",
  },
  {
    id: 3,
    name: "Vegetables",
    itemCount: 72,
    icon: GiWatermelon,
    accent: "#76a34f",
    background: "#f3ebf8",
  },
  {
    id: 4,
    name: "Strawberry",
    itemCount: 36,
    icon: GiStrawberry,
    accent: "#de524d",
    background: "#eef8d9",
  },
  {
    id: 5,
    name: "Black plum",
    itemCount: 123,
    icon: FiSun,
    accent: "#4b4f75",
    background: "#f7eae2",
  },
  {
    id: 6,
    name: "Custard apple",
    itemCount: 34,
    icon: FiGrid,
    accent: "#98a34a",
    background: "#f9f3db",
  },
  {
    id: 7,
    name: "Coffe & Tea",
    itemCount: 89,
    icon: FiCoffee,
    accent: "#b57b2d",
    background: "#f7e7df",
  },
  {
    id: 8,
    name: "Headphone",
    itemCount: 87,
    icon: FiHeadphones,
    accent: "#2f8cb5",
    background: "#e8f9e7",
  },
  {
    id: 9,
    name: "Cake & Milk",
    itemCount: 26,
    icon: FiShoppingBag,
    accent: "#8aa44e",
    background: "#eef7de",
  },
  {
    id: 10,
    name: "Oganic Kiwi",
    itemCount: 28,
    icon: GiKiwiFruit,
    accent: "#96a629",
    background: "#fbf4d8",
  },
];
