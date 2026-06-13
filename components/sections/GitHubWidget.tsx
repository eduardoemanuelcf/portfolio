"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SectionShell } from "../site/SectionShell";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: { ref?: string; commits?: { message: string }[] };
  created_at: string;
}

function formatRelativeDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.max(1, Math.floor(diffMs / 60000));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const isEs = locale === "es";
  if (diffMins < 60) return isEs ? `hace ${diffMins} min` : `${diffMins}m ago`;
  if (diffHours < 24) return isEs ? `hace ${diffHours} h` : `${diffHours}h ago`;
  return isEs ? `hace ${diffDays} d` : `${diffDays}d ago`;
}

export function GitHubWidget() {
  const t = useTranslations();
  const locale = useLocale();
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        const pushEvents = (data || []).filter(
          (e: GitHubEvent) => e.type === "PushEvent" && e.payload?.commits?.length
        );
        setEvents(pushEvents.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <SectionShell
      id="github"
      code={t("rec.github.code")}
      kicker={t("rec.github.kicker")}
      title={t("github.title")}
      intro={t("github.intro")}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full animate-ping" style={{ background: "var(--stamp)", opacity: 0.5 }} />
          <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "var(--stamp)" }} />
        </span>
        <span className="kicker" style={{ color: "var(--stamp-ink)" }}>{t("github.live_tag")}</span>
      </div>

      {loading ? (
        <p className="font-mono text-[0.82rem] py-6" style={{ color: "var(--ink-3)" }}>
          {t("github.loading")}
        </p>
      ) : events.length === 0 ? (
        <p className="font-mono text-[0.82rem] py-6" style={{ color: "var(--ink-3)" }}>
          {t("github.empty")}
        </p>
      ) : (
        <ul className="panel-sunk" role="log">
          {events.map((event, i) => {
            const repoName = event.repo.name.replace("eduardocabral8/", "");
            const branch = event.payload.ref?.replace("refs/heads/", "") || "main";
            const message = event.payload.commits?.[0]?.message || "";
            return (
              <li
                key={event.id}
                className="grid sm:grid-cols-[7rem_1fr] gap-x-5 gap-y-1 px-4 py-3.5"
                style={{ borderTop: i === 0 ? "none" : "1px dotted var(--line-2)" }}
              >
                <span className="font-mono text-[0.72rem] pt-0.5" style={{ color: "var(--ink-3)" }}>
                  {formatRelativeDate(event.created_at, locale)}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.76rem] link-ink"
                      style={{ border: "none" }}
                    >
                      {repoName}
                    </a>
                    <span className="font-mono text-[0.66rem] px-1.5 py-0.5" style={{ background: "var(--paper-2)", color: "var(--ink-3)", borderRadius: "2px" }}>
                      {branch}
                    </span>
                  </div>
                  <p className="font-mono text-[0.8rem] mt-1 truncate" style={{ color: "var(--ink)" }}>
                    {message}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SectionShell>
  );
}
