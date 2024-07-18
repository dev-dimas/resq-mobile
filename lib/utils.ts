import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting() {
  const hour = dayjs().hour();
  if (hour >= 3 && hour <= 11) return "Pagi";
  if (hour >= 12 && hour <= 14) return "Siang";
  if (hour >= 15 && hour <= 17) return "Sore";
  return "Malam";
}

export function twoDecimals(value: number): number {
  return parseFloat(value.toFixed(2));
}

export function priceToRupiah(str: string | number): string {
  let price = str;

  if (typeof str !== "number") price = Number(str);

  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}
