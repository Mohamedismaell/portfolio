"use client";

import { motion } from "framer-motion";

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
        <section className="relative py-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* ===== Title ===== */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="
            text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 md:mb-24
            drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]
          "
                >
                    Tech Stack
                </motion.h2>

                {/* ========== MOBILE: vertical timeline ========== */}
                <div className="md:hidden space-y-12">
                    {stack.map((category, index) => (
                        <motion.div
                            key={category.title + index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Vertical line above node (except first) */}
                            {index > 0 && (
                                <div className="absolute -top-8 w-px h-8 bg-white/25" />
                            )}

                            {/* Node circle */}
                            <div
                                className="
                  z-10 w-10 h-10 rounded-full
                  bg-gradient-to-br from-[#475AD7] to-[#8B5CF6]
                  flex items-center justify-center
                  shadow-[0_0_30px_rgba(139,92,246,0.5)]
                "
                            >
                                <span className="text-white text-xs font-bold">
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                            </div>

                            {/* Category title */}
                            <h3 className="mt-4 mb-4 text-xs tracking-[0.35em] text-[#8B5CF6] uppercase font-semibold text-center">
                                {category.title}
                            </h3>

                            {/* Tech items */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {category.items.map((tech, i) => (
                                    <span
                                        key={tech + i}
                                        className="
                      px-4 py-2 rounded-xl
                      bg-white/5 border border-white/10
                      backdrop-blur-xl
                      text-gray-200 text-sm
                    "
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ========== DESKTOP: horizontal line system ========== */}
                <div className="hidden md:block">
                    <div className="relative flex justify-between items-start">
                        {/* Main Horizontal Line */}
                        <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                        {stack.map((category, index) => (
                            <div
                                key={category.title + index}
                                className="relative flex flex-col items-center w-full"
                            >
                                {/* Node Circle */}
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
                                    className="
                    relative z-10
                    w-12 h-12 rounded-full
                    bg-gradient-to-br from-[#475AD7] to-[#8B5CF6]
                    flex items-center justify-center
                    shadow-[0_0_30px_rgba(139,92,246,0.5)]
                  "
                                >
                                    <span className="text-white text-xs font-bold">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>
                                </motion.div>

                                {/* Category Title */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="
                    mt-6 mb-6 text-sm tracking-[0.35em]
                    text-[#8B5CF6] uppercase font-semibold text-center
                  "
                                >
                                    {category.title}
                                </motion.h3>

                                {/* Vertical Line Down */}
                                <div className="w-px h-10 bg-white/20 mb-6" />

                                {/* Tech Items */}
                                <div className="flex flex-col items-center gap-4">
                                    {category.items.map((tech, i) => (
                                        <motion.div
                                            key={tech + i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: 0.3 + i * 0.05 + index * 0.1,
                                                type: "spring",
                                                stiffness: 180,
                                                damping: 16,
                                            }}
                                            className="
                        px-4 py-2 rounded-xl
                        bg-white/5 border border-white/10
                        backdrop-blur-xl
                        text-gray-200 text-sm
                        hover:border-[#8B5CF6]/60
                        hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]
                        transition-all duration-300
                      "
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
