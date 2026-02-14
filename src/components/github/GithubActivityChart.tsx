"use client";

import { motion } from "framer-motion";

export default function GithubActivityChart({
    data = [],
}: {
    data: { name: string; activity: number }[];
}) {
    const maxValue = Math.max(...data.map((d) => d.activity), 10);

    return (
        <div className="mt-10">
            <p className="text-gray-400 text-sm mb-4">Recent Repository Activity</p>

            <div className="flex items-end gap-3 h-40">
                {data.map((item, index) => {
                    const height = (item.activity / maxValue) * 100;

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center flex-1 group"
                        >
                            {/* BAR */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: `${height}%`, opacity: 1 }}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                                viewport={{ once: true }}
                                className="
                  w-full rounded-full
                  bg-gradient-to-t from-[#475AD7] to-[#8B5CF6]
                  shadow-[0_10px_30px_rgba(71,90,215,0.4)]
                  hover:shadow-[0_15px_40px_rgba(139,92,246,0.6)]
                  transition-all duration-300
                "
                            />

                            {/* LABEL */}
                            <span className="text-[10px] text-gray-500 mt-2 truncate w-full text-center">
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
