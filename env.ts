import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().min(1),
  EXPO_PUBLIC_MAPBOX_PUBLIC: z.string().min(1),
});

const envValue = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_MAPBOX_PUBLIC: process.env.EXPO_PUBLIC_MAPBOX_PUBLIC,
};

const env = envSchema.parse(envValue);

export default env;
