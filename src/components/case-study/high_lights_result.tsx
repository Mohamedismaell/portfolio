"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Layers3,
  MapPin,
  Sparkles,
  TrendingUp,
  WifiOff,
} from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

export interface ProjectResults {
  screens?: string;
  features?: string;
  linesOfCode?: string;
  rating?: string;
  githubUrl?: string;
}

interface ProjectResultsPanelProps {
  results?: ProjectResults;
  githubFallback?: string | null;
  highlights?: string[];
}

const DEFAULT_LABELS: { key: keyof ProjectResults; label: string }[] = [
  { key: "screens", label: "Screens" },
  { key: "features", label: "Features" },
  { key: "linesOfCode", label: "Lines of Code" },
  { key: "rating", label: "User Rating" },
];

function getHighlightIcon(index: number) {
  const icons = [Sparkles, MapPin, WifiOff, Layers3, Cpu];
  return icons[index % icons.length];
}

export default function ProjectResultsPanel({
  results,
  githubFallback: _githubFallback,
  highlights = [],
}: ProjectResultsPanelProps) {
  const metrics = DEFAULT_LABELS.flatMap(({ key, label }) => {
    const value = results?.[key];
    if (!value) return [];
    return [{ label, value: String(value) }];
  });

  const hasHighlights = highlights.length > 0;
  const hasMetrics = metrics.length > 0;

  if (!hasHighlights && !hasMetrics) return null;

  const metricsGridClass =
    metrics.length === 1
      ? "grid-cols-1"
      : metrics.length === 2
      ? "grid-cols-2"
      : metrics.length === 3
      ? "grid-cols-3"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <div
      className={`grid gap-4 lg:gap-5 ${
        hasHighlights && hasMetrics
          ? "lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]"
          : "grid-cols-1"
      }`}
    >
      {hasHighlights ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[24px] p-4 sm:rounded-[28px] sm:p-5"
          style={{
            background: GRADIENTS.cardBg,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.ghostBtn,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
              style={{
                background: GRADIENTS.badge,
                border: `1px solid ${BORDERS.medium}`,
                color: "var(--accent)",
              }}
            >
              <Layers3 size={16} />
            </span>

            <div>
              <h2
                className="text-[15px] font-[900] tracking-[-0.03em] sm:text-[16px]"
                style={{ color: TEXT.primary }}
              >
                Key Highlights
              </h2>
              <p
                className="mt-1 text-[12px] font-[500] leading-[1.7]"
                style={{ color: TEXT.soft }}
              >
                The strongest product decisions, UX details, and implementation wins
                behind the final build.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = getHighlightIcon(index);

              return (
                <motion.div
                  key={`${item}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="flex min-h-[96px] items-start gap-3 rounded-[18px] px-3.5 py-3.5"
                  style={{
                    background: GRADIENTS.solidCard,
                    border: `1px solid ${BORDERS.subtle}`,
                  }}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px]"
                    style={{
                      background: GRADIENTS.badge,
                      border: `1px solid ${BORDERS.medium}`,
                      color: "var(--accent)",
                    }}
                  >
                    <Icon size={16} />
                  </span>

                  <p
                    className="text-[12px] font-[600] leading-[1.62] sm:text-[12.5px]"
                    style={{ color: TEXT.soft }}
                  >
                    {item}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : null}

      {hasMetrics ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[24px] p-4 sm:rounded-[28px] sm:p-5"
          style={{
            background: GRADIENTS.cardBg,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.ghostBtn,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
              style={{
                background: GRADIENTS.primaryBtn,
                border: `1px solid ${BORDERS.medium}`,
                color: TEXT.inverse,
                boxShadow: SHADOWS.primaryBtn,
              }}
            >
              <TrendingUp size={16} />
            </span>

            <div>
              <h2
                className="text-[15px] font-[900] tracking-[-0.03em] sm:text-[16px]"
                style={{ color: TEXT.primary }}
              >
                Project Results
              </h2>
              <p
                className="mt-1 text-[12px] font-[500] leading-[1.7]"
                style={{ color: TEXT.soft }}
              >
                A compact view of the main outcome numbers from the final build.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className={`grid gap-3 ${metricsGridClass}`}>
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="flex min-h-[126px] flex-col justify-between rounded-[18px] px-4 py-4"
                  style={{
                    background: GRADIENTS.solidCard,
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.ghostBtn,
                  }}
                >
                  <span
                    className="text-[10px] font-[800] uppercase tracking-[0.1em]"
                    style={{ color: TEXT.badge }}
                  >
                    {metric.label}
                  </span>

                  <span
                    className="mt-3 text-[1.9rem] font-[900] leading-none tracking-[-0.06em] sm:text-[2.1rem]"
                    style={{ color: TEXT.primary }}
                  >
                    {metric.value}
                  </span>

                  <span
                    className="mt-2 text-[11px] font-[600]"
                    style={{ color: TEXT.soft }}
                  >
                    Final build metric
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}