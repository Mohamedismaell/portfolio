"use client";

import { motion } from "framer-motion";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";

interface TechCategory {
    title: string;
    items: string[];
}

interface Props {
    stack: TechCategory[];
}

export default function TechStackSection({ stack }: Props) {
    if (!stack || stack.length === 0) return null;

    return (
        <section className="relative py-16 sm:py-20 md:py-24">

            {/* Ambient glow */}
            <div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-[300px] blur-[120px] pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* ── Header ── */}
                <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
                    <SectionBadge label="Stack" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter leading-tight mb-4"
                    >
                        <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
                            Tech Stack
                        </GradientText>
                    </motion.h2>

                    <SectionDivider delay={0.2} className="w-20 mx-auto" />
                </div>

                {/* ── Mobile: vertical timeline ── */}
                <div className="md:hidden space-y-10">
                    {stack.map((category, index) => (
                        <motion.div
                            key={category.title + index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Connector from previous */}
                            {index > 0 && (
                                <div
                                    className="absolute -top-7 w-px h-7"
                                    style={{
                                        background: `linear-gradient(to bottom, transparent, ${BORDERS.medium})`,
                                    }}
                                />
                            )}

                            {/* Number badge */}
                            <div
                                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-xs"
                                style={{
                                    background: GRADIENTS.solidCard,
                                    border: `1.5px solid ${BORDERS.strong}`,
                                    color: "rgba(255,255,255,0.9)",
                                    boxShadow: `0 0 0 4px rgba(255,255,255,0.04), 0 0 20px rgba(255,255,255,0.05)`,
                                }}
                            >
                                {/* Pulse ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ border: `1px solid ${BORDERS.strong}` }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                                />
                                {(index + 1).toString().padStart(2, "0")}
                            </div>

                            {/* Category title */}
                            <h3
                                className="mt-4 mb-4 text-[10px] tracking-[0.3em] uppercase font-bold text-center"
                                style={{ color: TEXT.muted }}
                            >
                                {category.title}
                            </h3>

                            {/* Tech tags */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {category.items.map((tech, i) => (
                                    <motion.span
                                        key={tech + i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium"
                                        style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: `1px solid ${BORDERS.subtle}`,
                                            color: TEXT.soft,
                                            backdropFilter: "blur(12px)",
                                        }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Desktop: horizontal timeline ── */}
                <div className="hidden md:block">
                    <div className="relative flex justify-between items-start">

                        {/* Horizontal spine */}
                        <div
                            className="absolute top-6 left-0 right-0 h-px"
                            style={{
                                background: `linear-gradient(to right, transparent, ${BORDERS.strong}, ${BORDERS.medium}, transparent)`,
                            }}
                        />

                        {stack.map((category, index) => (
                            <div
                                key={category.title + index}
                                className="relative flex flex-col items-center w-full"
                            >
                                {/* Number badge */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 220,
                                        damping: 18,
                                    }}
                                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                                    style={{
                                        background: GRADIENTS.solidCard,
                                        border: `1.5px solid ${BORDERS.strong}`,
                                        color: "rgba(255,255,255,0.92)",
                                        boxShadow: `0 0 0 5px rgba(255,255,255,0.04), 0 0 24px rgba(255,255,255,0.06)`,
                                    }}
                                >
                                    {/* Pulse ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ border: `1px solid ${BORDERS.strong}` }}
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0, 0.45] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.35 }}
                                    />
                                    {(index + 1).toString().padStart(2, "0")}
                                </motion.div>

                                {/* Category title */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="mt-5 mb-5 text-[10px] tracking-[0.35em] uppercase font-bold text-center"
                                    style={{ color: TEXT.muted }}
                                >
                                    {category.title}
                                </motion.h3>

                                {/* Connector line down */}
                                <div
                                    className="w-px h-8 mb-5"
                                    style={{
                                        background: `linear-gradient(to bottom, ${BORDERS.medium}, transparent)`,
                                    }}
                                />

                                {/* Tech tags */}
                                <div className="flex flex-col items-center gap-3">
                                    {category.items.map((tech, i) => (
                                        <motion.div
                                            key={tech + i}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: 0.3 + i * 0.05 + index * 0.1,
                                                type: "spring",
                                                stiffness: 180,
                                                damping: 16,
                                            }}
                                            whileHover={{ y: -3, transition: { duration: 0.15 } }}
                                            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300 cursor-default"
                                            style={{
                                                background: "rgba(255,255,255,0.04)",
                                                border: `1px solid ${BORDERS.subtle}`,
                                                color: TEXT.soft,
                                                backdropFilter: "blur(12px)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = `1px solid ${BORDERS.strong}`;
                                                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                                                e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = `1px solid ${BORDERS.subtle}`;
                                                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                                e.currentTarget.style.color = TEXT.soft as string;
                                            }}
                                        >
                                            {tech}
                                        </motion.div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
