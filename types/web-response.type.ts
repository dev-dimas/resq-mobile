export type WebResponse<T = void> = {
  data?: T;
  errors?: string;
  message?: string;
};
