export type Product = {
  id: string;
  sellerId: string;
  categoryName: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  startTime: Date;
  endTime: Date;
  isDaily: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
