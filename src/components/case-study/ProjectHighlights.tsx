"use client";

import { motion } from "framer-motion";
import { Eye, Images } from "lucide-react";
import ScreenshotsModal from "../ScreenshotsModal";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectHighlights({
  tech = [],
  year,
  platform,
  gallery = [],
  slug,
  github,
  color = "#475AD7",
}: any) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const buttonBase = `
    group relative
    flex items-center justify-center gap-2
    px-4 py-3
    rounded-xl
    border border-white/10
    bg-white/5
    text-sm font-semibold text-white
    backdrop-blur-md
    transition-all duration-300
    hover:bg-white
    hover:text-black
    hover:border-white
    hover:shadow-xl
    hover:-translate-y-[2px]
    active:translate-y-0
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      {/* COLOR GLOW BACKDROP */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at center, ${color}35, transparent 70%)`,
        }}
      />

      {/* BUTTON GRID */}
      <div className="grid grid-cols-2 gap-3 relative">
        {/* DETAILS BUTTON */}
        <Link
          href={`/${locale}/projects/${slug}`}
          className={buttonBase}
          style={{
            boxShadow: `0 6px 25px ${color}30`,
          }}
        >
          {/* Hover Color Glow */}
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: `linear-gradient(135deg, ${color}40, transparent)`,
            }}
          />

          <Eye size={16} className="relative z-10" />
          <span className="relative z-10">Details</span>
        </Link>

        {/* SCREENSHOTS BUTTON (SAME STYLE WRAPPER) */}
        <div
          className="relative group"
          style={{
            boxShadow: `0 6px 25px ${color}30`,
          }}
        >
          {/* Hover Glow Layer */}
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${color}40, transparent)`,
            }}
          />

          <ScreenshotsModal
            images={gallery}
            // icon={<Images size={16} />}
            className={buttonBase}
          />
        </div>
      </div>
    </motion.div>
  );
}
