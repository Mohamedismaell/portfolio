"use client";

import { motion } from "framer-motion";
import {
  Layers3,
  LayoutPanelTop,
  BriefcaseBusiness,
  Database,
  PlugZap,
  CheckCircle2,
} from "lucide-react";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

interface Props {
  features: string[];
}

const LAYERS = [
  {
    title: "Presentation Layer",
    subtitle: "UI, screens, widgets, and interaction flows.",
    icon: LayoutPanelTop,
  },
  {
    title: "Domain Layer",
    subtitle: "Use cases, business rules, and app behavior.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Data Layer",
    subtitle: "Repositories, caching, APIs, and persistence.",
    icon: Database,
  },
  {
    title: "External Services",
    subtitle: "Integrations, analytics, maps, auth, and third-party tools.",
    icon: PlugZap,
  },
];

export default function ArchitectureSection({ features }: Props) {
  if (!features?.length) return null;

  return (
    <section
      className="rounded-[30px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
      style={{
        background: GRADIENTS.solidCard,
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: SHADOWS.card,
      }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p
            className="text-[11px] font-[800] uppercase tracking-[0.08em] sm:text-[12px]"
            style={{ color: TEXT.badge }}
          >
            Architecture
          </p>

          <h2
            className="mt-1 text-[1.8rem] font-[800] leading-[0.96] tracking-[-0.06em] sm:text-[2rem] lg:text-[2.25rem]"
            style={{ color: TEXT.primary }}
          >
            Built on a scalable structure
          </h2>

          <p
            className="mt-3 max-w-[58ch] text-[13px] font-[500] leading-[1.78] sm:text-[14px]"
            style={{ color: TEXT.soft }}
          >
            The project is organized with a clear separation between interface,
            logic, data, and services so the app stays maintainable, testable,
            and easier to scale over time.
          </p>

          <div className="mt-5 grid gap-3">
            {LAYERS.map((layer, index) => {
              const Icon = layer.icon;

              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.36, delay: index * 0.06, ease: "easeOut" }}
                  className="rounded-[22px] px-4 py-4 sm:px-5"
                  style={{
                    background: GRADIENTS.cardBg,
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.card,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                      style={{
                        background: GRADIENTS.badge,
                        border: `1px solid ${BORDERS.medium}`,
                        color: "var(--accent)",
                      }}
                    >
                      <Icon size={17} />
                    </span>

                    <div className="min-w-0">
                      <h3
                        className="text-[14px] font-[800] tracking-[-0.03em] sm:text-[15px]"
                        style={{ color: TEXT.primary }}
                      >
                        {layer.title}
                      </h3>

                      <p
                        className="mt-1 text-[12px] font-[500] leading-[1.65] sm:text-[13px]"
                        style={{ color: TEXT.soft }}
                      >
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-[24px] p-4 sm:p-5"
          style={{
            background: GRADIENTS.cardBg,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-[14px]"
              style={{
                background: GRADIENTS.primaryBtn,
                border: `1px solid ${BORDERS.medium}`,
                color: TEXT.inverse,
                boxShadow: SHADOWS.primaryBtn,
              }}
            >
              <Layers3 size={18} />
            </span>

            <div>
              <h3
                className="text-[1.05rem] font-[800] tracking-[-0.04em]"
                style={{ color: TEXT.primary }}
              >
                Core implementation pillars
              </h3>

              <p
                className="mt-1 text-[12px] font-[500] leading-[1.65] sm:text-[13px]"
                style={{ color: TEXT.soft }}
              >
                The architectural choices that shaped the product and kept the
                codebase consistent.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.34, delay: index * 0.05, ease: "easeOut" }}
                className="rounded-[18px] px-4 py-4"
                style={{
                  background: GRADIENTS.ghostBtn,
                  border: `1px solid ${BORDERS.subtle}`,
                  boxShadow: SHADOWS.ghostBtn,
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: GRADIENTS.badge,
                      border: `1px solid ${BORDERS.medium}`,
                      color: TEXT.badge,
                    }}
                  >
                    <CheckCircle2 size={14} />
                  </span>

                  <div>
                    <p
                      className="text-[10px] font-[800] uppercase tracking-[0.08em]"
                      style={{ color: TEXT.badge }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </p>

                    <p
                      className="mt-1 text-[12.5px] font-[700] leading-[1.55] sm:text-[13.5px]"
                      style={{ color: TEXT.primary }}
                    >
                      {feature}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-5 rounded-[20px] px-4 py-4"
            style={{
              background: GRADIENTS.solidCard,
              border: `1px solid ${BORDERS.subtle}`,
            }}
          >
            <p
              className="text-[11px] font-[800] uppercase tracking-[0.08em]"
              style={{ color: TEXT.badge }}
            >
              Outcome
            </p>

            <p
              className="mt-2 text-[13px] font-[500] leading-[1.75] sm:text-[14px]"
              style={{ color: TEXT.soft }}
            >
              This structure supports faster iteration, cleaner feature growth,
              and easier maintenance as the app expands with new flows,
              integrations, and user-facing capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}