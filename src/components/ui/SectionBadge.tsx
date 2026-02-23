// components/ui/SectionBadge.tsx
"use client";
import { motion } from "framer-motion";
import { GRADIENTS, BORDERS, TEXT } from "@/lib/theme";

interface Props {
    label: string;
    dot?: boolean;
}

export default function SectionBadge({ label, dot = true }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium tracking-widest uppercase"
            style={{
                borderColor: BORDERS.medium,
                background: GRADIENTS.badge,
                color: TEXT.badge,
            }}
        >
            {dot && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            )}
            {label}
        </motion.div>
    );
}
