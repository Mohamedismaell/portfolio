"use client";

import { motion } from "framer-motion";

interface ChallengeItem {
    title: string;
    challenge: string;
    solution: string;
}

interface Props {
    items: ChallengeItem[];
}

export default function ChallengesSolutionsSection({ items }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <section className="relative py-20 md:py-24">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[420px] bg-gradient-to-b from-[#475AD7]/20 via-[#8B5CF6]/15 to-transparent blur-[120px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-14 md:mb-16 text-center">
                    <span className="text-xs font-semibold tracking-[0.28em] text-[#475AD7] uppercase">
                        Challenges
                    </span>
                    <h2
                        className="
    mt-3 text-2xl md:text-3xl lg:text-4xl
    font-bold text-white
    drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]
  "
                    >
                        Turning obstacles into opportunities
                    </h2>


                </div>

                {/* Vertical spine (desktop) */}
                <div className="hidden md:block absolute left-1/2 top-40 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-[#475AD7]/40 via-white/15 to-transparent" />

                <div className="space-y-12 md:space-y-14">
                    {items.map((item, index) => (
                        <motion.div
                            key={`challenge-${index}`}   // always a valid, unique string
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="
      grid gap-6 md:gap-10
      md:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)]
      items-start
    "
                        >
                            {/* Challenge card (left on desktop, top on mobile) */}
                            <div className="order-2 md:order-1">
                                <h3 className="text-xs font-semibold tracking-[0.24em] uppercase text-rose-400 mb-2">
                                    Challenge
                                </h3>
                                <div
                                    className="
                    rounded-2xl px-5 py-4 md:px-6 md:py-5
                    bg-rose-500/5 border border-rose-500/25
                    text-gray-200 text-sm md:text-base leading-relaxed
                    shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                    backdrop-blur-xl
                  "
                                >
                                    <p className="font-medium text-white mb-2">{item.title}</p>
                                    <p>{item.challenge}</p>
                                </div>
                            </div>

                            {/* Timeline node (center column on desktop) */}
                            <div className="order-1 md:order-2 flex flex-col items-center">
                                {/* Mobile spine segment */}
                                <div className="md:hidden w-px h-6 bg-white/15 mb-3" />

                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.1 + index * 0.08,
                                        type: "spring",
                                        stiffness: 220,
                                        damping: 18,
                                    }}
                                    className="
                    relative z-10
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    bg-gradient-to-br from-[#475AD7] to-[#8B5CF6]
                    shadow-[0_0_40px_rgba(139,92,246,0.6)]
                    border border-white/20
                  "
                                >
                                    <span className="text-white text-xs font-bold tracking-wider">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>
                                </motion.div>

                                {/* Vertical connector down to solution (desktop) */}
                                <div className="w-px h-10 md:h-14 bg-white/20 mt-3 md:mt-4" />
                            </div>

                            {/* Solution card (right on desktop, bottom on mobile) */}
                            <div className="order-3">
                                <h3 className="text-xs font-semibold tracking-[0.24em] uppercase text-[#8B5CF6] mb-2">
                                    Solution
                                </h3>
                                <div
                                    className="
                    rounded-2xl px-5 py-4 md:px-6 md:py-5
                    bg-white/5 border border-white/12
                    text-gray-200 text-sm md:text-base leading-relaxed
                    shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                    backdrop-blur-xl
                  "
                                >
                                    <p>{item.solution}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}


                </div>
            </div>
        </section>
    );
}
