export type Account = {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
  isSeller: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};
