"use client";

import { motion } from "framer-motion";
import { TEXT } from "@/lib/theme";

interface Props {
  data: { month: string; commits: number }[];
}

export default function MonthlyCommitsChart({ data = [] }: Props) {
  if (!data || data.length === 0) {
    return (
      <div
        className="py-12 text-center text-xs tracking-widest uppercase"
        style={{ color: TEXT.muted }}
      >
        No commit data available
      </div>
    );
  }

  const chartData = [...data].reverse();

  const maxCommits = Math.max(...chartData.map((d) => d.commits), 1);

  return (
    <div>
      <p
        className="text-[10px] sm:text-xs tracking-widest uppercase font-medium mb-4 sm:mb-8"
        style={{ color: TEXT.muted }}
      >
        Monthly Commit Activity — Last 12 Months
      </p>

      {/* Mobile: vertical list */}
      <div className="flex flex-col gap-3 sm:hidden">
        {chartData.map((item, index) => {
          const width =
            item.commits === 0
              ? 0
              : Math.max((item.commits / maxCommits) * 100, 6);

          return (
            <div key={index} className="grid grid-cols-[44px_1fr_34px] items-center gap-3">
              <span
                className="text-[11px] font-medium tracking-wide"
                style={{ color: TEXT.muted }}
              >
                {item.month}
              </span>

              <div
                className="relative h-2.5 overflow-hidden rounded-full"
                style={{
                  background: "rgba(231, 212, 188, 0.55)",
                  border: "1px solid rgba(231, 212, 188, 0.72)",
                }}
              >
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: `${width}%`, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.65, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "#ef9d57",
                    backgroundImage: "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                    boxShadow: "0 4px 18px rgba(239,157,87,0.16)",
                  }}
                />
              </div>

              <span
                className="text-right text-[11px] font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {item.commits}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop: column chart */}
      <div className="hidden sm:block overflow-x-auto -mx-1 px-1 pb-2 sm:overflow-visible">
        <div className="min-w-[480px] sm:min-w-0 w-full h-[220px] flex items-end justify-between gap-2.5">
          {chartData.map((item, index) => {
            const height =
              item.commits === 0
                ? 0
                : Math.max((item.commits / maxCommits) * 100, 8);

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 h-full justify-end group/bar"
              >
                <span
                  className="text-xs font-bold mb-2 transition-colors duration-200 group-hover/bar:text-[var(--text-cursor)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.commits > 0 ? item.commits : ""}
                </span>

                <div className="relative w-full flex-1 flex items-end overflow-hidden rounded-xl">
                  <div
                    className="absolute inset-0 rounded-xl border"
                    style={{
                      background: "rgba(231, 212, 188, 0.38)",
                      borderColor: "rgba(231, 212, 188, 0.72)",
                    }}
                  />
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.7, ease: "easeOut" }}
                    className="relative z-[1] w-full rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: "#ef9d57",
                      backgroundImage: "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                      boxShadow: "0 4px 20px rgba(239,157,87,0.16)",
                    }}
                  />
                </div>

                <span
                  className="text-[10px] mt-2 font-medium tracking-wide"
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