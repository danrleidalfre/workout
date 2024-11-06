import z from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string(),
})

export const env = envSchema.parse(import.meta.env)
