import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";

export interface TerminalLine {
  type: "input" | "output";
  text: string;
}

export function useTerminal() {
  const t = useTranslations("terminal");
  const router = useRouter();
  const pathname = usePathname();

  const [lines, setLines] = useState<TerminalLine[]>([]);

  const initialize = useCallback(() => {
    setLines([{ type: "output", text: t("welcome") }]);
  }, [t]);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  const executeCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      
      const newLines: TerminalLine[] = [
        ...lines,
        { type: "input", text: `${t("prompt")} ${trimmed}` },
      ];

      if (!trimmed) {
        setLines(newLines);
        return;
      }

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      switch (cmd) {
        case "clear":
        case "cls":
          setLines([]);
          return;
        case "help":
          newLines.push({ type: "output", text: t("help_output") });
          break;
        case "whoami":
          newLines.push({ type: "output", text: t("whoami_output") });
          break;
        case "skills":
          newLines.push({ type: "output", text: t("skills_output") });
          break;
        case "experience":
          newLines.push({ type: "output", text: t("experience_output") });
          break;
        case "contact":
          newLines.push({ type: "output", text: t("contact_output") });
          break;
        case "locale":
          if (arg === "es" || arg === "en") {
            newLines.push({
              type: "output",
              text: t("locale_changed", { lang: arg.toUpperCase() }),
            });
            setTimeout(() => {
              router.replace(pathname, { locale: arg });
            }, 500);
          } else {
            newLines.push({ type: "output", text: t("locale_invalid") });
          }
          break;
        default:
          newLines.push({
            type: "output",
            text: t("command_not_found", { cmd: trimmed }),
          });
      }

      setLines(newLines);
    },
    [lines, t, router, pathname]
  );

  return { lines, executeCommand, initialize, clear };
}
