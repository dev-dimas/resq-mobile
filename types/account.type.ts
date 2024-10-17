export type Account = {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
  avatarBlurHash?: string;
  isSeller: boolean;
  isActive: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};
