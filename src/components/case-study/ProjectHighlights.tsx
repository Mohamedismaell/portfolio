"use client";

import { motion } from "framer-motion";
import { Eye, Images } from "lucide-react";
import ScreenshotsModal from "../ScreenshotsModal";
import Link from "next/link";
import { BORDERS } from "@/lib/theme";

export default function ProjectHighlights({
  gallery = [],
  slug,
  color = "#475AD7",
}: any) {

  const sharedStyle = {
    background: "rgba(255,255,255,0.07)",
    border: `1px solid ${BORDERS.medium}`,
    color: "rgba(255,255,255,0.70)",
    boxShadow: `0 4px 20px ${color}20`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/*  grid-cols-1 on xs, grid-cols-2 on sm+ */}
      <div className="grid grid-cols-2 gap-2">

        {/* ── Details ── */}
        <Link
          href={`/en/projects/${slug}`}
          className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 overflow-hidden"
          style={sharedStyle}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${color}35, rgba(255,255,255,0.05))`,
            }}
          />
          <Eye size={13} className="relative z-10 shrink-0" />
          <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
            Details
          </span>
        </Link>

        {/* ── Screenshots ── */}
        <div
          className="group/btn relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 active:scale-95"
          style={sharedStyle}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, ${color}35, rgba(255,255,255,0.05))`,
            }}
          />
          <ScreenshotsModal
            images={gallery}
            icon={<Images size={13} />}
            className="relative z-10 w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white/70 group-hover/btn:text-white transition-colors duration-300"
          />
        </div>

      </div>
    </motion.div>
  );
}
