"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";
import ImagePhonePreview from "./ImagePhonePreview";
import YouTubePhonePreview from "./YouTubePhonePreview";

function isYouTubeSrc(src: string) {
  try {
    const hostname = new URL(src).hostname.replace("www.", "");

    return (
      hostname === "youtu.be" ||
      hostname === "youtube.com" ||
      hostname === "m.youtube.com"
    );
  } catch {
    return false;
  }
}

export default function AutoPlayScreens({ screens }: { screens: string[] }) {
  const [index, setIndex] = useState(0);

  const safeScreens = useMemo(
    () => screens.filter((screen): screen is string => Boolean(screen)),
    [screens],
  );

  const total = safeScreens.length;
  const currentSrc = safeScreens[index];
  const currentIsYouTube = currentSrc ? isYouTubeSrc(currentSrc) : false;

  const goTo = (next: number) => {
    if (!total) return;

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

  useEffect(() => {
    if (total <= 1 || currentIsYouTube) return;

    const interval = window.setInterval(() => {
      setIndex((previousIndex) => (previousIndex + 1) % total);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [total, currentIsYouTube]);

  useEffect(() => {
    if (index >= total) {
      setIndex(0);
    }
  }, [index, total]);

  if (!currentSrc) {
    return null;
  }

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSrc}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={
            currentIsYouTube
              ? "absolute inset-0 h-full w-full"
              : "flex h-full w-full items-center justify-center"
          }
        >
          {currentIsYouTube ? (
            <YouTubePhonePreview
              url={currentSrc}
              title="MindTrip live demo"
            />
          ) : (
            <ImagePhonePreview
              src={currentSrc}
              alt={`Project slide preview ${index + 1}`}
              total={total}
              index={index}
              onDotClick={goTo}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous media"
            className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
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
            aria-label="Next media"
            className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
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

      <div
        className="absolute bottom-4 right-4 z-30 hidden items-center gap-2 rounded-full px-3 py-2 sm:flex"
        style={{
          background: GRADIENTS.ghostBtn,
          border: `1px solid ${BORDERS.subtle}`,
          color: TEXT.soft,
          boxShadow: SHADOWS.ghostBtn,
        }}
      >
        <Play size={12} fill="currentColor" />
        <span className="text-[10px] font-[700] uppercase tracking-[0.08em]">
          {currentIsYouTube ? "Live Demo" : "Auto Preview"}
        </span>
      </div>
    </div>
  );
}