"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const PATHS = [
  { d: "M3537 3603 c-4 -6 -10 -292 -13 -635 -6 -622 -6 -623 -28 -674 -35 -76 -84 -119 -162 -144 -36 -11 -76 -20 -88 -21 -11 0 7 -7 40 -14 81 -18 135 -46 173 -92 62 -75 60 -53 65 -918 2 -442 8 -801 14 -814 14 -38 22 333 22 1005 0 655 0 655 64 731 43 50 120 84 204 91 l63 5 -4 -544 c-2 -393 -7 -554 -15 -581 -31 -93 -109 -168 -196 -189 -18 -4 41 -8 139 -8 606 -6 745 -6 785 0 42 6 43 6 9 8 -150 5 -263 107 -289 260 -7 45 -10 329 -8 906 l3 840 23 57 c42 104 132 172 245 185 147 16 36 22 -420 23 -277 0 -503 -2 -503 -4 0 -3 22 -12 49 -21 63 -21 120 -82 152 -161 23 -58 23 -65 24 -409 l0 -350 -58 3 c-114 6 -184 46 -232 133 l-30 54 -7 630 c-4 346 -9 636 -10 645 -3 10 -6 11 -11 3z" },
  { d: "M1397 3073 c-99 -2 -156 -7 -152 -13 3 -6 18 -10 33 -10 46 0 144 -54 192 -106 47 -50 173 -207 405 -504 685 -877 766 -977 994 -1235 151 -170 192 -235 212 -338 12 -56 4 -149 -17 -202 -28 -71 113 116 156 207 98 209 73 403 -78 618 -46 65 -638 843 -891 1170 -245 317 -282 355 -377 393 -47 18 -231 26 -477 20z" },
  { d: "M1680 1893 c0 -707 -1 -717 -64 -850 -65 -135 -175 -218 -305 -230 -34 -3 -64 -10 -67 -14 -3 -5 206 -9 465 -9 259 0 471 4 471 9 0 4 -25 11 -55 14 -162 17 -286 137 -346 337 -23 74 -23 83 -27 694 l-3 618 -27 34 c-15 19 -30 34 -34 34 -5 0 -8 -287 -8 -637z" },
  { d: "M2980 1837 c19 -25 91 -118 159 -207 206 -270 277 -399 305 -557 20 -114 30 -71 31 132 0 148 -3 180 -23 248 -40 141 -106 242 -207 318 -61 46 -174 93 -250 105 l-49 7 34 -46z" },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.5,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        setTimeout(() => onComplete?.(), 300);
      },
    });
    return () => controls.stop();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: "var(--background)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo with slide-up + stroke drawing */}
        <div className="relative w-40 h-28 sm:w-52 sm:h-36">
          <motion.div
            className="relative w-full h-full"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0,400) scale(0.1,-0.1)">
                {PATHS.map((path, i) => (
                  <motion.path
                    key={i}
                    d={path.d}
                    fill="var(--text-primary)"
                    stroke="var(--text-primary)"
                    strokeWidth={20}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, fillOpacity: 0 }}
                    animate={{
                      pathLength: 1,
                      fillOpacity: 1,
                    }}
                    transition={{
                      pathLength: {
                        duration: 0.7,
                        delay: 0.4 + i * 0.18,
                        ease: "easeInOut",
                      },
                      fillOpacity: {
                        duration: 0.3,
                        delay: 0.4 + i * 0.18 + 0.7,
                      },
                    }}
                  />
                ))}
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Loading bar + percentage */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-36 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "var(--text-primary)",
              }}
            />
          </div>

          <motion.span
            className="text-xs tracking-[0.2em] tabular-nums"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
