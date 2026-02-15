"use client";

import { motion } from "framer-motion";

interface Props {
    data: {
        month: string;
        commits: number;
    }[];
}

export default function MonthlyCommitsChart({ data = [] }: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="mt-12 text-center text-gray-500">
                No commit data available
            </div>
        );
    }

    const maxCommits = Math.max(...data.map((d) => d.commits), 1);

    return (
        <div className="mt-12">
            <p className="text-gray-400 text-sm mb-8 font-medium">
                Monthly Commit Activity (Last 12 Months)
            </p>

            {/* CHART WRAPPER (IMPORTANT HEIGHT) */}
            <div className="w-full h-[240px] flex items-end justify-between gap-4">
                {data.map((item, index) => {
                    const height =
                        item.commits === 0
                            ? 0 // small baseline instead of invisible
                            : Math.max((item.commits / maxCommits) * 100, 12);

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full justify-end group"
                        >
                            {/* COMMIT NUMBER */}
                            <span className="text-base lg:text-lg text-white font-bold mb-3">
                                {item.commits}
                            </span>


                            {/* COLUMN TRACK (glass style like your portfolio) */}
                            <div className="relative w-full h-full flex items-end">
                                <div className="absolute inset-0 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-md" />

                                {/* ACTUAL PROGRESS COLUMN */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: `${height}%`, opacity: 1 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.8,
                                        ease: "easeOut",
                                    }}
                                    className="
                    relative w-full rounded-2xl
                    bg-gradient-to-t from-[#475AD7] to-[#8B5CF6]
                    shadow-[0_10px_40px_rgba(71,90,215,0.35)]
                    group-hover:shadow-[0_25px_70px_rgba(139,92,246,0.7)]
                    transition-all duration-300
                  "
                                />
                            </div>

                            {/* MONTH */}
                            <span className="text-xs text-gray-500 mt-3 font-medium">
                                {item.month}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
