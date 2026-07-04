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
                border border-[var(--border-subtle)]
                bg-[var(--gradient-card-bg)]
                backdrop-blur-2xl
                overflow-hidden
                theme-transition
                ${className}
            `}
            style={{
                background: "var(--gradient-card-bg)",
                borderColor: "var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            {/* Inner Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(237,207,170,0.12), transparent 70%)",
                }}
            />

            {children}
        </motion.div>
    );
}

