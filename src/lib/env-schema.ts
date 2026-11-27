import { z } from "zod";

// Empty strings in .env mean "not set".
const optional = z
  .string()
  .optional()
  .transform((value) => (value ? value : undefined));

export const envSchema = z.object({
  DATABASE_URL: z.url({ message: "DATABASE_URL must be a valid database URL" }),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_GITHUB_ID: optional,
  AUTH_GITHUB_SECRET: optional,
  AUTH_GOOGLE_ID: optional,
  AUTH_GOOGLE_SECRET: optional,
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${problems}`);
  }
  return result.data;
}
