import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/eduardoemanuelcf/events?per_page=10",
      {
        headers: {
          "User-Agent": "portfolio-app",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching GitHub events:", error.message);

    const fallbackEvents = [
      {
        id: "mock-1",
        type: "PushEvent",
        repo: { name: "eduardoemanuelcf/tick-panic" },
        payload: {
          ref: "refs/heads/main",
          commits: [
            { message: "feat: implement clean architecture use-cases with full TDD coverage" },
          ],
        },
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "mock-2",
        type: "PushEvent",
        repo: { name: "eduardoemanuelcf/job-log" },
        payload: {
          ref: "refs/heads/main",
          commits: [
            { message: "refactor: optimize hybrid extraction logic using Gemini 1.5 Flash" },
          ],
        },
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];

    return NextResponse.json(fallbackEvents);
  }
}
