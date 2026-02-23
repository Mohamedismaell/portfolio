"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BORDERS } from "@/lib/theme";

export default function AutoPlayScreens({ screens }: { screens: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto play — pauses on hover
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % screens.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [screens.length, paused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[560px] flex flex-col items-center justify-center"
    >

      {/* ── Ambient glow — uses no hardcoded color ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[55%] h-[55%] rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
          }}
        />
      </div>

      {/* ── Slider ── */}
      <div
        className="relative w-full h-full overflow-hidden rounded-2xl"
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {screens.map((screen, i) => (
            <div
              key={i}
              className="min-w-full h-full flex items-center justify-center px-4 sm:px-8"
            >
              <div className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] h-full transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src={screen}
                  alt={`app-screen-${i}`}
                  fill
                  priority={i === 0}
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 320px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
