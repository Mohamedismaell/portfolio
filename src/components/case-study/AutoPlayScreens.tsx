"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

export default function AutoPlayScreens({ screens }: { screens: string[] }) {
  const [index, setIndex] = useState(0);

  const safeScreens = useMemo(() => screens?.filter(Boolean) ?? [], [screens]);
  const total = safeScreens.length;

  useEffect(() => {
    if (total <= 1) return;

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [total]);

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  if (!total) return null;

  const goTo = (next: number) => {
    if (next < 0) {
      setIndex(total - 1);
      return;
    }

    if (next >= total) {
      setIndex(0);
      return;
    }

    setIndex(next);
  };

  return (
 <div
  className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] sm:rounded-[28px]"
      style={{
        background: GRADIENTS.solidCard,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 16%, rgba(239,157,87,0.08), transparent 24%), radial-gradient(circle at 50% 88%, rgba(239,157,87,0.06), transparent 22%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[11%] left-1/2 h-[64px] w-[58%] -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(227,142,72,0.14) 0%, rgba(227,142,72,0.05) 55%, transparent 76%)",
        }}
      />

    <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6 sm:px-8 sm:py-8">
  <AnimatePresence mode="wait">
    <motion.div
      key={safeScreens[index]}
      initial={{ opacity: 0, y: 18, scale: 0.975 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.985 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: "min(84vw, 460px)",
        height: "min(100%, 620px)",
        maxHeight: "100%",
      }}
    >
      <Image
        src={safeScreens[index]}
        alt={`Project preview ${index + 1}`}
        fill
        priority
        className="object-contain"
        sizes="(max-width: 640px) 84vw, 460px"
      />
    </motion.div>
  </AnimatePresence>
</div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous screen"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 sm:left-5 sm:h-11 sm:w-11"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next screen"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 sm:right-5 sm:h-11 sm:w-11"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ChevronRight size={17} />
          </button>
        </>
      ) : null}

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {safeScreens.map((_, dotIndex) => {
          const isActive = dotIndex === index;

          return (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Go to screen ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? "28px" : "8px",
                height: "8px",
                background: isActive ? GRADIENTS.primaryBtn : GRADIENTS.badge,
                border: isActive
                  ? `1px solid ${BORDERS.medium}`
                  : `1px solid ${BORDERS.subtle}`,
                opacity: isActive ? 1 : 0.72,
                boxShadow: isActive ? SHADOWS.ghostBtn : "none",
              }}
            />
          );
        })}
      </div>

      <div
        className="absolute bottom-4 right-4 z-20 hidden items-center gap-2 rounded-full px-3 py-2 sm:flex"
        style={{
          background: GRADIENTS.ghostBtn,
          border: `1px solid ${BORDERS.subtle}`,
          color: TEXT.soft,
          boxShadow: SHADOWS.ghostBtn,
        }}
      >
        <Play size={12} fill="currentColor" />
        <span className="text-[10px] font-[700] uppercase tracking-[0.08em]">
          Auto Preview
        </span>
      </div>
    </div>
  );
}