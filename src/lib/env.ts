import { parseEnv } from "./env-schema";

// Checked once at startup: the app refuses to run with a missing or invalid variable.
export const env = parseEnv(process.env);

export const authProviders = {
  github: Boolean(env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET),
  google: Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET),
};
