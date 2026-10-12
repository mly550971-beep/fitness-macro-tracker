import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("API baseline", () => {
  it("returns health status", async () => {
    const response = await request(createApp()).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("returns JSON 404 for unknown API routes", async () => {
    const response = await request(createApp()).get("/api/does-not-exist");
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it("rejects disallowed CORS origins", async () => {
    const response = await request(createApp())
      .get("/api/health")
      .set("Origin", "https://untrusted.example");
    expect(response.status).toBe(403);
  });
});
