import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: vi.fn().mockResolvedValue({ data: { id: "mock" }, error: null }) },
  })),
}));

function makeRequest(body: unknown, ip: string) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validBody = { name: "Ada", email: "ada@example.com", message: "Hello there" };

describe("POST /api/contact", () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  afterAll(() => {
    if (originalKey !== undefined) process.env.RESEND_API_KEY = originalKey;
  });

  it("accepts a valid submission (mock mode without API key)", async () => {
    const res = await POST(makeRequest(validBody, "10.0.0.1"));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it("rejects when required fields are missing", async () => {
    const res = await POST(makeRequest({ name: "Ada", email: "ada@example.com" }, "10.0.0.2"));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/required/i);
  });

  it("rejects an invalid email format", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }, "10.0.0.3"));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/valid email/i);
  });

  it("rejects input exceeding maximum lengths", async () => {
    const res = await POST(makeRequest({ ...validBody, message: "a".repeat(5001) }, "10.0.0.4"));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/maximum/i);
  });

  it("silently absorbs honeypot submissions without erroring", async () => {
    const res = await POST(makeRequest({ ...validBody, website: "http://spam.example" }, "10.0.0.5"));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it("rate limits after 3 requests per minute from the same IP", async () => {
    const ip = "10.0.0.99";
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) {
      const res = await POST(makeRequest(validBody, ip));
      statuses.push(res.status);
    }
    expect(statuses.slice(0, 3)).toEqual([200, 200, 200]);
    expect(statuses[3]).toBe(429);
  });
});
