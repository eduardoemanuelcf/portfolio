"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV = ["about", "experience", "projects", "skills", "contact"] as const;

export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.15, 0.4], rootMargin: "-15% 0px -45% 0px" }
    );
    [...NAV, "github"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goto = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === "es" ? "en" : "es" });
  };

  const openAnnex = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event("toggle-terminal"));
  };

  return (
    <>
      <header
        className="fixed top-0 z-50"
        style={{
          left: 0,
          right: 0,
          width: "100%",
          height: "var(--header-h)",
          background: "color-mix(in oklch, var(--paper) 86%, transparent)",
          borderBottom: "1px solid var(--ink)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="shell h-full flex items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 min-w-0"
          >
            <span className="truncate" style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "var(--ink)" }}>
              {t("doc.subject")}
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label={t("doc.index")}>
            {NAV.map((id) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => goto(id)}
                  aria-current={on ? "true" : undefined}
                  className="kicker px-2.5 py-1 transition-colors cursor-pointer"
                  style={{
                    color: on ? "var(--ink)" : "var(--ink-3)",
                    borderBottom: on ? "2px solid var(--stamp)" : "2px solid transparent",
                  }}
                >
                  {t(`nav.${id}`)}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button onClick={openAnnex} className="kicker hidden sm:inline-flex px-2 py-1.5 transition-colors hover:text-[var(--ink)] cursor-pointer" style={{ color: "var(--ink-2)" }}>
              [ {t("doc.annex")} ]
            </button>
            <a href={`/cv-${locale}.pdf`} target="_blank" rel="noopener noreferrer" className="kicker hidden sm:inline-flex px-2 py-1.5 transition-colors hover:text-[var(--ink)]" style={{ color: "var(--ink-2)" }}>
              {t("doc.cv")} ↓
            </a>
            <button
              onClick={toggleLocale}
              aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
              className="font-mono text-[0.7rem] tracking-[0.1em] px-2 py-1.5 border border-[var(--line-2)] hover:border-[var(--ink)] transition-colors cursor-pointer"
              style={{ color: "var(--ink)" }}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t("doc.index")}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-center"
            >
              <span className="block w-5 h-[1.5px]" style={{ background: "var(--ink)" }} />
              <span className="block w-5 h-[1.5px]" style={{ background: "var(--ink)" }} />
              <span className="block w-5 h-[1.5px]" style={{ background: "var(--ink)" }} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] lg:hidden"
              style={{ background: "color-mix(in oklch, var(--ink) 30%, transparent)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[70] lg:hidden panel flex flex-col"
              style={{ borderBottom: "1.5px solid var(--ink)", paddingTop: "var(--header-h)", paddingBottom: "env(safe-area-inset-bottom)", height: "100dvh" }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="absolute flex items-center justify-center w-9 h-9 bg-transparent border-0 hover:text-[var(--stamp-ink)] active:opacity-75 transition-colors cursor-pointer text-[var(--ink)]"
                style={{ top: "calc((var(--header-h) - 2.25rem) / 2)", right: "var(--gutter)" }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <nav className="shell pt-2 pb-4 flex-1 min-h-0 flex flex-col justify-between" aria-label={t("doc.index")}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    {["about", "experience", "projects", "github", "skills", "contact"].map((id) => (
                      <button
                        key={id}
                        onClick={() => goto(id)}
                        className="flex items-baseline py-3.5 text-left border-b border-[var(--line)] cursor-pointer w-full group transition-colors"
                      >
                        <span className="h3 text-ink group-hover:text-[var(--stamp-ink)] transition-colors">{id === "github" ? t("github.title") : t(`nav.${id}`)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-5 mt-auto pb-6">
                  <button onClick={openAnnex} className="btn btn-outline flex-1 cursor-pointer">{t("doc.annex")}</button>
                  <a
                    href={`/cv-${locale}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid flex-1 inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{t("doc.cv")}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="translate-y-[0.5px]"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
