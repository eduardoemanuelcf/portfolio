interface StampProps {
  label: string;
  meta?: string;
  rotate?: number;
  className?: string;
}

export function Stamp({ label, meta, rotate = -6, className = "" }: StampProps) {
  return (
    <span
      className={`stamp ${className}`}
      style={{ ["--stamp-rot" as string]: `${rotate}deg` }}
      role="img"
      aria-label={meta ? `${label} ${meta}` : label}
    >
      <span className="stamp-label">{label}</span>
      {meta && <span className="stamp-meta">{meta}</span>}
    </span>
  );
}
