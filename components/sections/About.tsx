import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionShell } from "../site/SectionShell";

export function About() {
  const t = useTranslations();

  return (
    <SectionShell id="about" code={t("rec.about.code")} kicker={t("rec.about.kicker")} title={t("about.title")}>
      <div className="flex flex-col sm:flex-row gap-7 sm:gap-10">
        <figure className="shrink-0 self-center sm:self-start">
          <div className="panel-sunk p-1.5" style={{ borderRadius: "2px", width: "8.5rem" }}>
            <Image
              src="/me.webp"
              alt={t("doc.subject")}
              width={520}
              height={650}
              sizes="136px"
              className="block w-full h-auto"
              style={{ aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "top", borderRadius: "1px" }}
            />
          </div>
        </figure>

        <div className="max-w-[60ch] space-y-6">
          <p className="body">{t("about.p1")}</p>
          <p className="body">{t("about.p2")}</p>
          <p className="body">{t("about.p3")}</p>
        </div>
      </div>
    </SectionShell>
  );
}
