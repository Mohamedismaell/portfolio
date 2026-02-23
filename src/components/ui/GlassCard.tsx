"use client";

import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function GlassCard({ children, className = "" }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`
        relative
        rounded-[32px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        overflow-hidden
        ${className}
      `}
        >
            {/* Inner Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(71,90,215,0.12), rgba(139,92,246,0.08))",
                }}
            />

            {children}
        </motion.div>
    );
}
