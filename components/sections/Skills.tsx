import { useTranslations } from "next-intl";
import { SectionShell } from "../site/SectionShell";
import { BrandIcon } from "../ui/BrandIcon";
import {
  siReact, siVite, siNodedotjs, siExpress, siMysql, siYarn, siVitest,
  siGithubactions, siTypescript, siFastify, siSocketdotio, siNestjs,
  siPostgresql, siPrisma, siDocker, siPnpm, siNginx, siJsonwebtokens,
  siAstro, siNextdotjs, siMui, siSqlite, siGit, siTailwindcss, siPython,
  siGooglechrome, siGnubash,
} from "simple-icons";

const ICONS: Record<string, { title: string; path: string }> = {
  "React 18": siReact, "React 19": siReact, "Vite": siVite, "Node.js": siNodedotjs,
  "Express": siExpress, "MySQL": siMysql, "Yarn Workspaces": siYarn, "Vitest": siVitest,
  "GitHub Actions": siGithubactions, "TypeScript": siTypescript, "Fastify": siFastify,
  "Socket.io": siSocketdotio, "NestJS": siNestjs, "PostgreSQL": siPostgresql,
  "Prisma ORM": siPrisma, "Docker": siDocker, "pnpm workspaces": siPnpm, "Nginx": siNginx,
  "JWT": siJsonwebtokens, "Astro": siAstro, "Next.js": siNextdotjs, "Material UI": siMui,
  "SQLite": siSqlite, "Git": siGit, "Tailwind CSS": siTailwindcss, "Python": siPython,
  "Chrome Extensions": siGooglechrome, "Extensiones de Chrome": siGooglechrome, "Bash": siGnubash,
};

const GROUPS = ["production", "personal", "collaborative", "transversal", "exploring"] as const;
const VERIFIED = new Set(["production", "personal"]);

export function Skills() {
  const t = useTranslations();

  return (
    <SectionShell
      id="skills"
      code={t("rec.skills.code")}
      kicker={t("rec.skills.kicker")}
      title={t("skills.title")}
      intro={t("skills.intro")}
    >
      <div className="flex flex-col">
        {GROUPS.map((key) => {
          const items = t.raw(`skills.${key}.items`) as string[];
          const verified = VERIFIED.has(key);
          return (
            <div key={key} className="py-6" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="mb-4">
                <span
                  className={verified ? "h3 text-ink" : "h3"}
                  style={{ color: verified ? "var(--ink)" : "var(--ink-2)" }}
                >
                  {t(`skills.${key}.label`)}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {items.map((item) => {
                  const icon = ICONS[item];
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[0.78rem]"
                      style={{
                        border: "1px solid var(--line-2)",
                        borderRadius: "2px",
                        background: verified ? "var(--paper)" : "transparent",
                        color: verified ? "var(--ink)" : "var(--ink-2)",
                      }}
                    >
                      {icon && <BrandIcon icon={icon} size={13} className="opacity-75" />}
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
