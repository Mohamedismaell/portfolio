"use client";

import { motion } from "framer-motion";
import { Eye, ImageIcon, Calendar, Smartphone } from "lucide-react";

export default function ProjectHighlights({
  tech = [],
  year,
  platform,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      // className="
      //   relative
      //   bg-gradient-to-br from-white/5 to-white/[0.02]
      //   border border-white/10
      //   backdrop-blur-xl
      //   rounded-2xl
      //   p-6
      //   shadow-[0_10px_40px_rgba(0,0,0,0.4)]
      // "
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
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
        </button>

        <button
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
          <ImageIcon size={16} />
          Screenshots
        </button>
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
