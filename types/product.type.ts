export type Product = {
  id: string;
  sellerId: string;
  categoryName: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  startTime: string;
  endTime: string;
  isDaily: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
