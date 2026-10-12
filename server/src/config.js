import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CLIENT_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
  COOKIE_SECURE: z.enum(["true", "false"]).default("false")
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid server environment configuration:", parsed.error.issues.map(i => ({
    path: i.path.join("."), message: i.message
  })));
  process.exit(1);
}
export const config = parsed.data;
if (config.NODE_ENV === "production" && config.COOKIE_SECURE !== "true") {
  console.error("COOKIE_SECURE must be true in production.");
  process.exit(1);
}
