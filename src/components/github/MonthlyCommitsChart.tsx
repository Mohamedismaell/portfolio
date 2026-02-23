"use client";

import { motion } from "framer-motion";
import { BORDERS, TEXT, GRADIENTS } from "@/lib/theme";

interface Props {
    data: { month: string; commits: number }[];
}
export default function MonthlyCommitsChart({ data = [] }: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="py-12 text-center text-xs tracking-widest uppercase" style={{ color: TEXT.muted }}>
                No commit data available
            </div>
        );
    }

    const maxCommits = Math.max(...data.map((d) => d.commits), 1);

    return (
        <div>
            {/* Label */}
            <p className="text-[10px] sm:text-xs tracking-widest uppercase font-medium mb-4 sm:mb-8" style={{ color: TEXT.muted }}>
                Monthly Commit Activity — Last 12 Months
            </p>

            {/*  Scrollable on mobile, full width on desktop */}
            <div className="overflow-x-auto -mx-1 px-1 pb-2 sm:overflow-visible">
                <div className="min-w-[480px] sm:min-w-0 w-full h-[160px] sm:h-[220px] flex items-end justify-between gap-1 sm:gap-2.5">
                    {data.map((item, index) => {
                        const height =
                            item.commits === 0
                                ? 0
                                : Math.max((item.commits / maxCommits) * 100, 8);

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center flex-1 h-full justify-end group/bar"
                            >
                                {/* Commit count */}
                                <span
                                    className="text-[8px] sm:text-xs font-bold mb-1 sm:mb-2 transition-colors duration-200 group-hover/bar:text-white"
                                    style={{ color: TEXT.muted }}
                                >
                                    {item.commits > 0 ? item.commits : ""}
                                </span>

                                {/* Column track */}
                                <div className="relative w-full flex-1 flex items-end">
                                    <div
                                        className="absolute inset-0 rounded-md sm:rounded-xl"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: `1px solid ${BORDERS.subtle}`,
                                        }}
                                    />
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: `${height}%`, opacity: 1 }}
                                        transition={{ delay: index * 0.05, duration: 0.7, ease: "easeOut" }}
                                        className="relative w-full rounded-md sm:rounded-xl transition-all duration-300"
                                        style={{
                                            background: GRADIENTS.statValue,
                                            boxShadow: "0 4px 20px rgba(255,255,255,0.08)",
                                        }}
                                    />
                                </div>

                                {/* Month label */}
                                <span
                                    className="text-[7px] sm:text-[10px] mt-1.5 sm:mt-2 font-medium tracking-wide"
                                    style={{ color: TEXT.muted }}
                                >
                                    {item.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
