"use client";

import { motion } from "framer-motion";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";

interface ChallengeItem {
    title: string;
    challenge: string;
    solution: string;
}

interface Props {
    items: ChallengeItem[];
}

export default function ChallengesTimeline({ items }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <section className="relative py-16 sm:py-20 md:py-24">

            {/* Ambient glow */}
            <div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[400px] blur-[120px] pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
                }}
            />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

                {/*  Header  */}
                <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
                    <SectionBadge label="Challenges" />

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter leading-tight mb-4">
                        <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
                            Turning Obstacles into Opportunities
                        </GradientText>
                    </h2>

                    <SectionDivider delay={0.2} className="w-20 mx-auto" />
                </div>

                {/* Vertical spine — desktop only */}
                <div
                    className="hidden md:block absolute left-1/2 top-48 bottom-10 w-px -translate-x-1/2"
                    style={{
                        background: `linear-gradient(to bottom, ${BORDERS.strong}, ${BORDERS.medium}, transparent)`,
                    }}
                />

                {/*  Items  */}
                <div className="space-y-10 sm:space-y-12 md:space-y-14">
                    {items.map((item, index) => (
                        <motion.div
                            key={`challenge-${index}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="grid gap-5 md:gap-10 md:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)] items-start"
                        >

                            {/*  Challenge card (left) — red tint  */}
                            <div className="order-2 md:order-1">
                                {/* Red label */}
                                <p
                                    className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                                    style={{ color: "rgba(248,113,113,0.8)" }}
                                >
                                    ✕ Challenge
                                </p>
                                {/* Red tinted card */}
                                <div
                                    className="rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed"
                                    style={{
                                        background: "rgba(239,68,68,0.06)",
                                        border: "1px solid rgba(239,68,68,0.25)",
                                        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(239,68,68,0.06)",
                                        backdropFilter: "blur(16px)",
                                    }}
                                >
                                    <p
                                        className="font-semibold text-sm sm:text-base mb-2"
                                        style={{ color: "rgba(255,255,255,0.85)" }}
                                    >
                                        {item.title}
                                    </p>
                                    <p style={{ color: TEXT.dim }}>{item.challenge}</p>
                                </div>
                            </div>

                            {/*  Timeline node (center)  */}
                            <div className="order-1 md:order-2 flex flex-col items-center">
                                {/* Mobile spine top */}
                                <div
                                    className="md:hidden w-px h-5 mb-3"
                                    style={{
                                        background: `linear-gradient(to bottom, transparent, ${BORDERS.medium})`,
                                    }}
                                />

                                {/* Number badge */}
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
                                    className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xs sm:text-sm"
                                    style={{
                                        background: GRADIENTS.solidCard,
                                        border: `1.5px solid ${BORDERS.strong}`,
                                        color: "rgba(255,255,255,0.92)",
                                        boxShadow: `0 0 0 4px rgba(255,255,255,0.04), 0 0 20px rgba(255,255,255,0.06)`,
                                    }}
                                >
                                    {/* Pulse ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ border: `1px solid ${BORDERS.strong}` }}
                                        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                                    />
                                    {(index + 1).toString().padStart(2, "0")}
                                </motion.div>

                                {/* Connector line down */}
                                <div
                                    className="w-px h-10 sm:h-14 mt-3"
                                    style={{
                                        background: `linear-gradient(to bottom, ${BORDERS.medium}, transparent)`,
                                    }}
                                />
                            </div>

                            {/*  Solution card (right)*/}
                            <div className="order-3">
                                {/* Green label */}
                                <p
                                    className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                                    style={{ color: "rgba(74,222,128,0.8)" }}
                                >
                                    ✓ Solution
                                </p>
                                {/* Green tinted card */}
                                <div
                                    className="rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed"
                                    style={{
                                        background: "rgba(34,197,94,0.06)",
                                        border: "1px solid rgba(34,197,94,0.25)",
                                        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(34,197,94,0.06)",
                                        backdropFilter: "blur(16px)",
                                    }}
                                >
                                    <p style={{ color: TEXT.soft }}>{item.solution}</p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
