import { Product } from "@/types/product.type";
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

export async function fetchImageFromUri(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

export function getAddress(address: string): string {
  const plusCodeRegex = /^[A-Z0-9]{2,}\+[A-Z0-9]{2,},\s*/;
  const cleanedAddress = address.replace(plusCodeRegex, "");

  return cleanedAddress;
}

export function isProductAvailable(product: Product): boolean {
  const now = dayjs();

  const startDate = dayjs(product.startTime);
  const endDate = dayjs(product.endTime);

  if (now.isAfter(startDate) && now.isBefore(endDate)) {
    return true;
  }

  if (!product.isDaily) {
    return false;
  }

  let startTimeSell = dayjs(now)
    .hour(startDate.hour())
    .minute(startDate.minute())
    .millisecond(0);
  let endTimeSell = dayjs(now)
    .hour(endDate.hour())
    .minute(endDate.minute())
    .millisecond(0);

  if (startTimeSell.isAfter(endTimeSell) && now.isBefore(endTimeSell)) {
    startTimeSell = startTimeSell.subtract(1, "day");
  } else if (
    startTimeSell.isAfter(endTimeSell) &&
    now.isAfter(startTimeSell) &&
    now.isAfter(endTimeSell)
  ) {
    endTimeSell = endTimeSell.add(1, "day");
  }

  if (
    (now.isAfter(startTimeSell) && now.isBefore(endTimeSell)) ||
    startTimeSell.isSame(endTimeSell)
  )
    return true;

  return false;
}
