import { images } from "constants/";
import { ProductNearby, products } from "./product.data";

export type SubscriptionWithProducts = {
  id: string;
  name: string;
  address: string;
  subscriber: number;
  avatar: number;
  products: ProductNearby[];
};

export const subscriptions: SubscriptionWithProducts[] = [
  {
    id: "1",
    name: "CrumbCraft Bakery",
    address: "Jalan Kali Pelayaran No. 224",
    subscriber: 15,
    avatar: images.donutChocolate,
    products: products.slice(0, 5),
  },
  {
    id: "2",
    name: "Dough Delights",
    address: "Jalan Bonaparte No. 101",
    subscriber: 5,
    avatar: images.donutChocolate,
    products: products.slice(6, 10),
  },
  {
    id: "3",
    name: "Flourish Bakery",
    address: "Jalan Sudirman No. 10",
    subscriber: 7,
    avatar: images.donutChocolate,
    products: products.slice(11, 15),
  },
  {
    id: "4",
    name: "Frost Bakery",
    address: "Jalan Nomanden No. 50",
    subscriber: 20,
    avatar: images.donutChocolate,
    products: products.slice(16, 20),
  },
];
