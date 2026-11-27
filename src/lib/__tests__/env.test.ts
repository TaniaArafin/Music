import { describe, expect, it } from "vitest";
import { envSchema, parseEnv } from "../env-schema";

const valid = {
  DATABASE_URL: "postgresql://music:music@localhost:5433/music",
  AUTH_SECRET: "x".repeat(32),
};

describe("parseEnv", () => {
  it("accepts a valid environment", () => {
    expect(parseEnv(valid)).toMatchObject(valid);
  });

  it("treats empty OAuth values as not set", () => {
    const env = parseEnv({ ...valid, AUTH_GITHUB_ID: "", AUTH_GITHUB_SECRET: "" });
    expect(env.AUTH_GITHUB_ID).toBeUndefined();
  });

  it("rejects a short AUTH_SECRET with a readable message", () => {
    expect(() => parseEnv({ ...valid, AUTH_SECRET: "short" })).toThrow(/AUTH_SECRET/);
  });

  it("rejects a missing DATABASE_URL", () => {
    expect(envSchema.safeParse({ AUTH_SECRET: valid.AUTH_SECRET }).success).toBe(false);
  });
});
