"use client";

import { useTranslations, useLocale } from "next-intl";


export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="mt-24 lg:mt-32" style={{ borderTop: "3px double var(--ink)" }}>
      <div className="shell">
        <div className="py-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="h3" style={{ color: "var(--ink)" }}>{t("footer.signoff")}</p>
            <p className="mono-meta pt-1">{t("footer.builtwith")}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 lg:justify-end">
            <a className="link-ink mono-meta" href="https://github.com/eduardocabral8" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="link-ink mono-meta" href="https://www.linkedin.com/in/eduardoemanuelcf" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="link-ink mono-meta" href="mailto:eduardoemanuelcf@gmail.com">Email</a>
            <a className="link-ink mono-meta" href={`/cv-${locale}.pdf`} target="_blank" rel="noopener noreferrer">{t("doc.cv")} ↓</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
