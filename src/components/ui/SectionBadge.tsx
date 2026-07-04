"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  dot?: boolean;
  className?: string;
}

export default function SectionBadge({ label, dot = true, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={[
        "inline-flex items-center gap-2",
        "mb-6 sm:mb-8 px-3.5 sm:px-4 py-2",
        "rounded-full border text-xs sm:text-[13px] font-medium",
        "theme-transition",
        className,
      ].join(" ")}
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--gradient-badge)",
        color: "var(--text-badge)",
        boxShadow: "0 6px 18px rgba(39, 30, 20, 0.04)",
      }}
    >
      {dot && (
        <span
          className="h-2 w-2 rounded-full shrink-0"
          style={{ background: "#33c46b", boxShadow: "0 0 0 4px rgba(51,196,107,0.12)" }}
        />
      )}
      <span>{label}</span>
    </motion.div>
  );
}