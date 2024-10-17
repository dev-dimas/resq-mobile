export type Complaints = {
  id: string;
  customerId: string;
  sellerId: string;
  description: string;
  status: "PENDING" | "SOLVED";
  createdAt: Date;
  updatedAt: Date;
};
