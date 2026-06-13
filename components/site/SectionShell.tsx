interface SectionShellProps {
  id: string;
  code: string;
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  code,
  kicker,
  title,
  intro,
  children,
}: SectionShellProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} style={{ scrollMarginTop: "5.5rem" }}>
      <div className="shell">
        <div className="grid lg:grid-cols-[var(--rail)_1fr] gap-x-10">
          <hr className="rule-2 lg:col-span-2 mb-6" />

          <div className="lg:sticky self-start mb-4 lg:mb-0 flex flex-row lg:flex-col gap-x-4 gap-y-1" style={{ top: "calc(var(--header-h) + 1.5rem)" }}>
            <span className="kicker" style={{ color: "var(--ink)", fontWeight: 700 }}>{code}</span>
            <span className="kicker">{kicker}</span>
          </div>

          <div>
            <h2 id={`${id}-title`} className="h1 text-ink" style={{ textWrap: "balance" }}>
              {title}
            </h2>
            {intro && <p className="body-sm mt-3 max-w-[60ch]">{intro}</p>}
            <div className="mt-8 lg:mt-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
