"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ui/ThemeProvider";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

type Theme = "light" | "dark";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = async () => {
    if (!mounted) return;

    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${endRadius}px`);
    root.dataset.themeTransition = nextTheme === "dark" ? "to-dark" : "to-light";

    const doc = document as DocumentWithTransition;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!doc.startViewTransition || reduceMotion) {
      setTheme(nextTheme);
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-x");
      root.style.removeProperty("--theme-y");
      root.style.removeProperty("--theme-radius");
      return;
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    try {
      await transition.finished;
    } finally {
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-x");
      root.style.removeProperty("--theme-y");
      root.style.removeProperty("--theme-radius");
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: GRADIENTS.ghostBtn,
        border: `1px solid ${BORDERS.subtle}`,
        color: TEXT.soft,
        boxShadow: SHADOWS.ghostBtn,
      }}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: GRADIENTS.socialHover }}
      />

      <motion.span
        key={mounted ? theme : "loading"}
        initial={{ rotate: -90, opacity: 0, scale: 0.72 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative z-10 flex h-[17px] w-[17px] items-center justify-center"
      >
        {!mounted ? null : theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </motion.span>
    </button>
  );
}