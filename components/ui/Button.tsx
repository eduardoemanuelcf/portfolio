"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "solid",
  href,
  onClick,
  type = "button",
  external = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const cls = `btn btn-${variant} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
