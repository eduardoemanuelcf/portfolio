"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";

export function Terminal() {
  const t = useTranslations("terminal");
  const [isOpen, setIsOpen] = useState(false);
  const { lines, executeCommand, initialize, clear } = useTerminal();
  const [inputVal, setInputVal] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const prompt = t("prompt");

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("toggle-terminal", handleToggle);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("toggle-terminal", handleToggle);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (isOpen && lines.length === 0) initialize();
  }, [isOpen, lines.length, initialize]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) clear();
  }, [isOpen, clear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            ref={constraintsRef}
            className="fixed inset-0 z-[80]"
            style={{ background: "color-mix(in oklch, var(--ink) 45%, transparent)" }}
          />
          <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              dragElastic={0.05}
              role="dialog"
              aria-label="Console"
              className="pointer-events-auto w-[calc(100%-2rem)] max-w-[620px]"
            >
              <div style={{ border: "1.5px solid #060908", borderRadius: "2px", overflow: "hidden", boxShadow: "0 24px 60px rgba(10,14,11,0.55)" }}>
                <div
                  className="flex items-center justify-between pl-3 pr-0 h-9"
                  style={{ background: "oklch(0.26 0.018 158)", color: "oklch(0.82 0.04 158)", cursor: "default", borderBottom: "1px solid oklch(0.15 0.012 158)" }}
                >
                  <span className="font-mono text-[0.72rem] tracking-[0.12em] uppercase select-none pointer-events-none">
                    {t("title")}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                    className="flex items-center justify-center w-10 h-full hover:text-white transition-colors cursor-pointer text-sm font-bold"
                    style={{ color: "oklch(0.7 0.03 158)" }}
                  >
                    ✕
                  </button>
                </div>
                <div
                  onPointerDownCapture={(e) => e.stopPropagation()}
                  onClick={() => inputRef.current?.focus()}
                  ref={containerRef}
                  className="font-mono text-[0.8rem] leading-relaxed p-4 h-[340px] overflow-y-auto flex flex-col gap-1"
                  style={{ background: "oklch(0.11 0.01 158)", color: "oklch(0.82 0.05 158)", cursor: "text" }}
                >
                  {lines.map((line, idx) => (
                    <div
                      key={idx}
                      className="whitespace-pre-wrap"
                      style={{ color: line.type === "input" ? "oklch(0.95 0.02 158)" : "oklch(0.78 0.06 158)" }}
                    >
                      {line.text}
                    </div>
                  ))}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                    <span className="select-none" style={{ color: "oklch(0.62 0.12 158)" }}>{prompt}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 p-0 m-0"
                      style={{ color: "oklch(0.95 0.02 158)", boxShadow: "none", outline: "none" }}
                      autoFocus
                      aria-label="Command input"
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
