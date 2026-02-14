"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import ScreenshotsModal from "../ScreenshotsModal";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectHighlights({
  tech = [],
  year,
  platform,
  gallery = [],
  github,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}

    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* 🔥 DETAILS (NOW NAVIGATES) */}
        <Link
          href={`/${locale}/projects/${slug}`}
          className="
            flex items-center justify-center gap-2
            px-4 py-3
            rounded-xl
            bg-white/5
            border border-white/10
            hover:bg-white/10
            transition
            text-sm text-white
          "
        >
          <Eye size={16} />
          Details
        </Link>

        {/* SCREENSHOTS MODAL */}
        <ScreenshotsModal images={gallery} />
      </div>


      {/* APP STORE / PLAY) */}
      {/* <div className="grid grid-cols-2 gap-3">
        <div
          className="
            flex items-center justify-center gap-2
            px-4 py-3
            rounded-xl
            bg-white/[0.04]
            border border-white/10
            text-sm text-gray-300
          "
        >
          <Calendar size={16} />
          {year || "2025"}
        </div>

        <div
          className="
            flex items-center justify-center gap-2
            px-4 py-3
            rounded-xl
            bg-white/[0.04]
            border border-white/10
            text-sm text-gray-300
          "
        >
          <Smartphone size={16} />
          {platform || "Flutter App"}
        </div>
      </div> */}
    </motion.div>
  );
}
