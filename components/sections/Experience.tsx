import { useTranslations } from "next-intl";
import { SectionShell } from "../site/SectionShell";

export function Experience() {
  const t = useTranslations();
  const bullets = t.raw("experience.forit.bullets") as string[];

  return (
    <SectionShell id="experience" code={t("rec.experience.code")} kicker={t("rec.experience.kicker")} title={t("experience.title")}>
      <article className="panel">
        <div className="p-6 lg:p-8 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between" style={{ borderBottom: "1px solid var(--line)" }}>
          <div>
            <h3 className="h2 text-ink">{t("experience.forit.role")}</h3>
            <p className="mono-meta mt-1.5" style={{ color: "var(--stamp-ink)" }}>
              {t("experience.forit.company")}
            </p>
            <p className="body-sm mt-1" style={{ color: "var(--ink-2)" }}>
              {t("experience.forit.context")}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 sm:flex-col sm:items-end">
            <span
              className="kicker px-2 py-0.5"
              style={{ background: "var(--stamp-wash)", color: "var(--stamp-ink)", borderRadius: "2px" }}
            >
              ● {t("experience.forit.status")}
            </span>
            <span className="mono-meta">{t("experience.forit.period")}</span>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-4" style={{ borderBottom: "1px solid var(--line)", background: "var(--paper-2)" }}>
          <span className="font-mono text-[0.78rem]" style={{ color: "var(--ink-2)" }}>
            {t("experience.forit.stack")}
          </span>
        </div>

        <div className="p-6 lg:p-8">
          <span className="kicker">{t("experience.forit.findings_label")}</span>
          <ul className="mt-4 flex flex-col" role="list">
            {bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-4 py-3"
                style={{ borderBottom: i < bullets.length - 1 ? "1px dotted var(--line-2)" : "none" }}
              >
                <span className="font-mono text-[0.72rem] shrink-0 pt-1" style={{ color: "var(--ink-3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="body-sm" style={{ color: "var(--ink)" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 lg:p-8" style={{ borderTop: "1.5px solid var(--ink)", background: "var(--paper-2)" }}>
          <span className="kicker">{t("experience.forit.technical_label")}</span>
          <p className="body-sm mt-3 max-w-[72ch]">{t("experience.forit.technical")}</p>
        </div>
      </article>
    </SectionShell>
  );
}
