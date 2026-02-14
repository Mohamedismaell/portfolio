"use client";

import { motion } from "framer-motion";

export default function GithubActivityChart({
    data = [],
}: {
    data: { name: string; commits: number }[];
}) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No commit activity found.
            </div>
        );
    }

    const maxValue = Math.max(...data.map((d) => d.commits), 1);

    return (
        <div className="mt-6">
            <p className="text-gray-400 text-sm mb-6 font-medium">
                Commit Activity (Top Projects)
            </p>

            <div className="flex items-end justify-between gap-4 h-56 w-full">
                {data.map((item, index) => {
                    const height = Math.max((item.commits / maxValue) * 100, 12);

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center flex-1 group relative"
                        >
                            {/* TOOLTIP */}
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition bg-[#111827] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                {item.commits} commits
                            </div>

                            {/* BAR (YOUR PORTFOLIO GRADIENT STYLE) */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: `${height}%`, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.7,
                                    ease: "easeOut",
                                }}
                                className="
                  w-full max-w-[48px]
                  rounded-t-2xl
                  bg-gradient-to-t from-[#475AD7] to-[#8B5CF6]
                  shadow-[0_10px_30px_rgba(71,90,215,0.45)]
                  group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.7)]
                  group-hover:brightness-110
                  transition-all duration-300
                "
                            />

                            {/* VALUE */}
                            <span className="text-sm text-white mt-3 font-semibold">
                                {item.commits}
                            </span>

                            {/* LABEL */}
                            <span className="text-[11px] text-gray-500 mt-1 truncate w-full text-center group-hover:text-white transition-colors">
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
