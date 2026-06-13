"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <main className="min-h-[80vh] flex items-center">
      <div className="shell w-full">
        <div className="grid lg:grid-cols-[var(--rail)_1fr] gap-x-10">
          <hr className="rule-2 lg:col-span-2 mb-6" />
          <div className="kicker mb-4 lg:mb-0" style={{ color: "var(--ink)", fontWeight: 700 }}>
            {t("ref")}
          </div>
          <div className="max-w-[52ch]">
            <div className="display display-xl" style={{ color: "var(--correction)" }}>
              {t("code")}
            </div>
            <h1 className="h1 mt-4 text-ink">{t("header")}</h1>
            <p className="body mt-4">{t("description")}</p>
            <div className="mt-8">
              <Button href="/" variant="solid">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
