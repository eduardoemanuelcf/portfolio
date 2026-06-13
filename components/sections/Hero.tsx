"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";

interface Suite {
  file: string;
  case: string;
}

export function Hero() {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const suites = t.raw("hero.runner.suites") as Suite[];
  const pass = t("hero.runner.pass");

  const lineBase = reduce ? 0 : 0.55;
  const lineDelay = (i: number) => (reduce ? 0 : 0.5 + i * lineBase);
  const summaryDelay = reduce ? 0 : 0.5 + suites.length * lineBase;


  return (
    <section aria-label={t("hero.masthead")} className="pt-10 lg:pt-0 lg:min-h-[calc(100vh-var(--header-h))] lg:flex lg:items-center">
      <div className="shell w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 lg:items-center">
          <div>
            <h1 className="display text-ink" style={{ textWrap: "balance", fontSize: "clamp(2.3rem, 1rem + 5vw, 4.5rem)" }}>
              {t("hero.thesis")}
            </h1>
            <p className="body mt-6 lg:mt-7">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                variant="solid"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                {t("hero.cta_primary")}
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                {t("hero.cta_secondary")}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="panel-sunk" style={{ boxShadow: "0 1px 0 var(--paper), 0 18px 40px -28px rgba(20,28,22,0.5)" }}>
              <div
                className="flex items-center justify-between px-4 h-9"
                style={{ borderBottom: "1px solid var(--line-2)", background: "var(--paper-2)" }}
              >
                <span className="font-mono text-[0.72rem]" style={{ color: "var(--ink-2)" }}>
                  {t("hero.runner.cmd")}
                </span>
                <span className="font-mono text-[0.66rem]" style={{ color: "var(--ink-3)" }}>
                  {t("hero.runner.running")}
                </span>
              </div>

              <div className="p-4 font-mono text-[0.82rem] leading-relaxed flex flex-col gap-2.5">
                {suites.map((s, i) => (
                  <motion.div
                    key={s.file}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: lineDelay(i), duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className="shrink-0 px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-wider"
                      style={{ background: "var(--stamp-wash)", color: "var(--stamp-ink)", borderRadius: "2px" }}
                    >
                      {pass}
                    </span>
                    <span className="min-w-0">
                      <span style={{ color: "var(--ink-3)" }}>{s.file}</span>
                      <br />
                      <span style={{ color: "var(--ink)" }}>✓ {s.case}</span>
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: summaryDelay, duration: 0.3 }}
                  className="mt-1 pt-2.5"
                  style={{ borderTop: "1px dashed var(--line-2)", color: "var(--stamp-ink)" }}
                >
                  {t("hero.runner.summary")}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
