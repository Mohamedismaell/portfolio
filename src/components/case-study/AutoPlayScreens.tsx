"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";
import VideoPhonePreview from "./VideoPhonePreview";
import ImagePhonePreview from "./ImagePhonePreview";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".ogg"];

function isVideoSrc(src: string) {
  const clean = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

export default function AutoPlayScreens({ screens }: { screens: string[] }) {
  const [index, setIndex] = useState(0);

  const safeScreens = useMemo(() => screens?.filter(Boolean) ?? [], [screens]);
  const total = safeScreens.length;

  const currentSrc = safeScreens[index];
  const currentIsVideo = currentSrc ? isVideoSrc(currentSrc) : false;

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

  useEffect(() => {
    if (total <= 1) return;
    if (currentIsVideo) return;

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [total, currentIsVideo, index]);

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  if (!total) return null;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-1">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 24%, rgba(239,157,87,0.07), transparent 35%), radial-gradient(circle at 50% 76%, rgba(239,157,87,0.03), transparent 35%)",
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSrc}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-full flex-col items-center justify-center"
          >
            {currentIsVideo ? (
              <VideoPhonePreview
                src={currentSrc}
                loop={total === 1}
                onEnded={() => {
                  if (total > 1) goTo(index + 1);
                }}
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
      </div>

      {currentIsVideo && total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous video"
            className="absolute left-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 sm:left-3 sm:h-10 sm:w-10"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next video"
            className="absolute right-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 sm:right-3 sm:h-10 sm:w-10"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ChevronRight size={16} />
          </button>
        </>
      ) : null}

      <div
        className="absolute -bottom-5 -right-5 z-20 hidden items-center gap-2 rounded-full px-3 py-2 sm:flex"
        style={{
          background: GRADIENTS.ghostBtn,
          border: `1px solid ${BORDERS.subtle}`,
          color: TEXT.soft,
          boxShadow: SHADOWS.ghostBtn,
        }}
      >
        <Play size={12} fill="currentColor" />
        <span className="text-[10px] font-[700] uppercase tracking-[0.08em]">
          {currentIsVideo ? "Live Demo" : "Auto Preview"}
        </span>
      </div>
    </div>
  );
}