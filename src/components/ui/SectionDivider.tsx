// components/ui/SectionDivider.tsx
"use client";
import { motion } from "framer-motion";
import { GRADIENTS } from "@/lib/theme";

interface Props {
  delay?: number;
  className?: string;
}

export default function SectionDivider({ delay = 0.5, className = "w-40 sm:w-64 mb-6 sm:mb-8" }: Props) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`origin-left h-px ${className}`}
      style={{ background: GRADIENTS.divider }}
    />
  );
}
