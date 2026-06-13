import { useTranslations } from "next-intl";
import { SectionShell } from "../site/SectionShell";
import { ProjectShot } from "./ProjectShot";

interface Entry {
  key: "tickpanic" | "jardin" | "joblog";
  hasDemo: boolean;
  img: string | null;
  team?: boolean;
}

const ENTRIES: Entry[] = [
  { key: "tickpanic", hasDemo: true, img: "/projects/tickpanic.webp" },
  { key: "jardin", hasDemo: true, img: "/projects/jardin.webp", team: true },
  { key: "joblog", hasDemo: false, img: "/projects/joblog.webp" },
];

export function Projects() {
  const t = useTranslations();

  return (
    <SectionShell
      id="projects"
      code={t("rec.projects.code")}
      kicker={t("rec.projects.kicker")}
      title={t("projects.title")}
      intro={t("projects.intro")}
    >
      <div className="flex flex-col">
        {ENTRIES.map((entry, i) => {
          const name = t(`projects.${entry.key}.name`);
          const proof = t(`projects.${entry.key}.proof`);
          const desc = t(`projects.${entry.key}.description`);
          const stack = t(`projects.${entry.key}.stack`).split(", ");
          const repo = t(`projects.${entry.key}.repo`);
          const demo = entry.hasDemo ? t(`projects.${entry.key}.demo`) : null;

          return (
            <article
              key={entry.key}
              className="grid lg:grid-cols-[12rem_1fr] gap-x-10 gap-y-5 py-9"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
            >
              <div className="flex flex-row lg:flex-col gap-x-4 gap-y-3 items-baseline lg:items-start">
                <span className="kicker" style={{ color: "var(--ink)", fontWeight: 700 }}>
                  {t(`projects.${entry.key}.exhibit`)}
                </span>
                <span
                  className="kicker px-2 py-0.5 whitespace-nowrap"
                  style={{
                    borderRadius: "2px",
                    background: demo ? "var(--stamp-wash)" : "transparent",
                    border: demo ? "none" : "1px solid var(--line-2)",
                    color: demo ? "var(--stamp-ink)" : "var(--ink-3)",
                  }}
                >
                  {demo ? `● ${t("projects.live")}` : t("projects.source")}
                </span>
                {entry.team && (
                  <span
                    className="kicker px-2 py-0.5 whitespace-nowrap"
                    style={{ borderRadius: "2px", border: "1px solid var(--line-2)", color: "var(--ink-2)" }}
                  >
                    {t("projects.team_tag")}
                  </span>
                )}
                <span className="mono-meta lg:mt-1 hidden lg:block max-w-[11rem]">{proof}</span>
              </div>

              <div>
                <h3 className="h2 text-ink" style={{ textWrap: "balance" }}>{name}</h3>
                <p className="mono-meta mt-1 lg:hidden">{proof}</p>
                <p className="body mt-3 max-w-[60ch]">{desc}</p>

                {entry.img && (
                  <ProjectShot src={entry.img} alt={t("projects.screenshot_alt", { name })} />
                )}

                <div className="mt-5 panel-sunk px-4 py-3">
                  <span className="kicker">{t("projects.spec_label")}</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
                    {stack.map((tech) => (
                      <span key={tech} className="font-mono text-[0.74rem]" style={{ color: "var(--ink-2)" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                  {demo && (
                    <a className="link-ink font-mono text-[0.8rem]" href={`https://${demo}`} target="_blank" rel="noopener noreferrer">
                      → {t("projects.view_demo")} · {demo}
                    </a>
                  )}
                  <a className="link-ink font-mono text-[0.8rem]" href={`https://${repo}`} target="_blank" rel="noopener noreferrer">
                    → {t("projects.view_repo")}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
