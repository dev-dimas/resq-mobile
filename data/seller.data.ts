import { images } from "@/constants/";
import { Account } from "@/types/account.type";
import { Seller } from "@/types/sellert.type";

export type SellerOnDetail = {
  subscriber: number;
  address: "Jalan Raya Gubernur Sunandar Priyo Sudarmo No. 1";
  account: Omit<Account, "password" | "createdAt" | "updatedAt" | "token">;
} & Omit<Seller, "createdAt" | "updatedAt">;

export const seller: SellerOnDetail = {
  account: {
    id: "1",
    email: "johndoe@email.com",
    name: "John Doe Bakery",
    isSeller: true,
    avatar: images.donutChocolate,
  },
  accountId: "1",
  subscriber: 12,
  address: "Jalan Raya Gubernur Sunandar Priyo Sudarmo No. 1",
};
