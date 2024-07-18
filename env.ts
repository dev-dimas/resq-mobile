import { z } from 'zod';

let envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
