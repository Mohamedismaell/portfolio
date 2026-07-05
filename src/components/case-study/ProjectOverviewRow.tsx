"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Layers3,
  GitBranch,
  Cpu,
  LayoutPanelTop,
  Workflow,
  Database,
  PlugZap,
  Compass,
  Palette,
  Code2,
  Gauge,
  Rocket,
} from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiSupabase,
  SiGithub,
  SiFigma,
  SiPostman,
  SiGit,
} from "react-icons/si";

interface TechCategory {
  title: string;
  items: string[];
}

interface ProjectOverviewRowProps {
  architecture?: string[];
  techStack?: TechCategory[];
  developmentProcess?: string[];
}

type LogoComponent = ({ className }: { className?: string }) => React.ReactNode;

const logoSize = "w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]";

const LOGO_LIBRARY: Record<string, LogoComponent> = {
  flutter: ({ className }) => (
    <SiFlutter className={className || logoSize} color="#02569B" />
  ),

  dart: ({ className }) => (
    <SiDart className={className || logoSize} color="#0175C2" />
  ),

  firebase: ({ className }) => (
    <SiFirebase className={className || logoSize} color="#FFCA28" />
  ),

  supabase: ({ className }) => (
    <SiSupabase className={className || logoSize} color="#3ECF8E" />
  ),

  github: ({ className }) => (
    <SiGithub className={className || logoSize} color="currentColor" />
  ),

  figma: ({ className }) => (
    <SiFigma className={className || logoSize} color="#F24E1E" />
  ),

  postman: ({ className }) => (
    <SiPostman className={className || logoSize} color="#FF6C37" />
  ),

  git: ({ className }) => (
    <SiGit className={className || logoSize} color="#F05032" />
  ),

  bloc: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className || logoSize} aria-hidden="true">
      <circle cx="7" cy="7" r="2.4" fill="#8B5CF6" />
      <circle cx="17" cy="7" r="2.4" fill="#EC4899" />
      <circle cx="12" cy="12" r="2.4" fill="#3B82F6" />
      <circle cx="7" cy="17" r="2.4" fill="#14B8A6" />
      <circle cx="17" cy="17" r="2.4" fill="#F59E0B" />
      <path
        d="M8.9 8.6 10.5 10M15.1 8.6 13.5 10M10 13.8 8.8 15.2M14 13.8 15.2 15.2"
        stroke="#E2E8F0"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),

  api: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className || logoSize} aria-hidden="true">
      <rect x="3" y="4" width="18" height="4" rx="1.6" fill="#0D9488" opacity="0.85" />
      <rect x="3" y="10" width="18" height="4" rx="1.6" fill="#14B8A6" />
      <rect x="3" y="16" width="18" height="4" rx="1.6" fill="#0F766E" opacity="0.9" />
      <circle cx="6" cy="6" r="1" fill="#fff" />
      <circle cx="6" cy="12" r="1" fill="#fff" />
      <circle cx="6" cy="18" r="1" fill="#fff" />
      <path d="M10 6h8M10 12h8M10 18h8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),

  hive: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className || logoSize} aria-hidden="true">
      <path d="M12 2.8 20 7.2v9.6L12 21.2 4 16.8V7.2L12 2.8Z" fill="#F59E0B" />
      <path d="M12 6.2 16.4 8.7v5L12 16.2 7.6 13.7v-5L12 6.2Z" fill="#FBBF24" />
      <path d="M4 7.2 12 11.5 20 7.2" stroke="#FEF3C7" strokeWidth="1" />
    </svg>
  ),

  dio: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className || logoSize} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" fill="#2563EB" />
      <path d="M8 8h4.2a4 4 0 1 1 0 8H8V8Zm4 6a2 2 0 1 0 0-4h-1.8v4H12Z" fill="#fff" />
    </svg>
  ),

  mapbox: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className || logoSize} aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="#111827" />
      <circle cx="12" cy="12" r="3.8" fill="#EF4444" />
      <circle cx="12" cy="12" r="1.4" fill="#FDE68A" />
    </svg>
  ),
};

const DEFAULT_TECH = [
  { key: "flutter", label: "Flutter" },
  { key: "dart", label: "Dart" },
  { key: "bloc", label: "Bloc" },
  { key: "firebase", label: "Firebase" },
  { key: "supabase", label: "Supabase" },
  { key: "api", label: "REST API" },
  { key: "hive", label: "Hive" },
  { key: "dio", label: "Dio" },
  { key: "mapbox", label: "Mapbox" },
  { key: "git", label: "Git" },
  { key: "github", label: "GitHub" },
  { key: "figma", label: "Figma" },
];

const TECH_LABEL_MAP = Object.fromEntries(
  DEFAULT_TECH.map((item) => [item.key, item.label])
);

function ActionButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="w-full rounded-[14px] py-2.5 text-[12px] font-[700] transition-all duration-300 hover:opacity-85"
      style={{
        background: GRADIENTS.ghostBtn,
        border: `1px solid ${BORDERS.subtle}`,
        color: TEXT.primary,
        boxShadow: SHADOWS.ghostBtn,
      }}
    >
      <span className="inline-flex items-center justify-center gap-1.5">
        <span>{label}</span>
        <span className="text-[13px] font-[400]">&rarr;</span>
      </span>
    </button>
  );
}

export default function ProjectOverviewRow({
  architecture: _architecture,
  techStack,
  developmentProcess: _developmentProcess,
}: ProjectOverviewRowProps) {
  const techItems = useMemo(() => {
    if (!techStack || techStack.length === 0) {
      return DEFAULT_TECH.map((item) => ({
        name: item.label,
        logoKey: item.key,
      }));
    }

    const allItems = techStack.flatMap((category) => category.items);
    const keys = Object.keys(LOGO_LIBRARY);
    const resolved: { name: string; logoKey: string }[] = [];

    allItems.forEach((itemName) => {
      const lower = itemName.toLowerCase();

      const matchedKey = keys.find((k) => {
        if (k === "api" && (lower.includes("api") || lower.includes("rest"))) return true;
        if (k === "bloc" && (lower.includes("bloc") || lower.includes("cubit"))) return true;
        return lower.includes(k);
      });

      if (matchedKey) {
        resolved.push({
          name: TECH_LABEL_MAP[matchedKey] || itemName,
          logoKey: matchedKey,
        });
      }
    });

    const unique = resolved.filter(
      (item, index, arr) => arr.findIndex((v) => v.logoKey === item.logoKey) === index
    );

    if (unique.length < 6) {
      const existing = new Set(unique.map((r) => r.logoKey));
      DEFAULT_TECH.forEach((d) => {
        if (!existing.has(d.key) && unique.length < 9) {
          unique.push({
            name: d.label,
            logoKey: d.key,
          });
        }
      });
    }

    const maxItems = Math.floor(unique.length / 3) * 3;
    return unique.slice(0, Math.max(6, maxItems));
  }, [techStack]);

  const architectureLayers = [
    {
      title: "Presentation Layer",
      subtitle: "(UI • Flutter)",
      colorClass:
        "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/10 dark:border-orange-500/20",
      iconNode: (
        <div className="relative flex items-center justify-center">
          <LayoutPanelTop size={15} className="text-orange-500" />
          <span className="absolute -right-1.5 -top-1.5">
            <SiFlutter size={12} color="#02569B" />
          </span>
        </div>
      ),
    },
    {
      title: "Domain Layer",
      subtitle: "(Use Cases • Business Logic)",
      colorClass:
        "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/10 dark:border-amber-500/20",
      iconNode: <Workflow size={16} className="text-amber-500" />,
    },
    {
      title: "Data Layer",
      subtitle: "(Repositories • Data Sources)",
      colorClass:
        "bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/10 dark:border-purple-500/20",
      iconNode: <Database size={16} className="text-purple-500" />,
    },
    {
      title: "External Services",
      subtitle: "(APIs • Database • Services)",
      colorClass:
        "bg-teal-500/5 dark:bg-teal-500/10 border-teal-500/10 dark:border-teal-500/20",
      iconNode: <PlugZap size={16} className="text-teal-500" />,
    },
  ];

  const timelineSteps = [
    {
      title: "Research & Planning",
      subtitle: "Understanding user needs",
      icon: Compass,
      iconColor: "text-blue-500 dark:text-blue-400",
      borderClass: "border-blue-500/20 dark:border-blue-500/40",
    },
    {
      title: "Design & Prototyping",
      subtitle: "Creating wireframes",
      icon: Palette,
      iconColor: "text-[var(--accent)]",
      borderClass: "border-orange-500/20 dark:border-orange-500/40",
    },
    {
      title: "Development",
      subtitle: "Building features",
      icon: Code2,
      iconColor: "text-emerald-500 dark:text-emerald-400",
      borderClass: "border-emerald-500/20 dark:border-emerald-500/40",
    },
    {
      title: "Testing & Optimization",
      subtitle: "Performance & bug fixes",
      icon: Gauge,
      iconColor: "text-amber-500 dark:text-amber-400",
      borderClass: "border-amber-500/20 dark:border-amber-500/40",
    },
    {
      title: "Deployment",
      subtitle: "Production release",
      icon: Rocket,
      iconColor: "text-indigo-500 dark:text-indigo-400",
      borderClass: "border-indigo-500/20 dark:border-indigo-500/40",
    },
  ];

  return (
    <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col justify-between rounded-[26px] p-5 sm:p-6"
        style={{
          background: GRADIENTS.cardBg,
          border: `1px solid ${BORDERS.subtle}`,
          boxShadow: SHADOWS.card,
          backdropFilter: "blur(12px)",
        }}
      >
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[10px]"
              style={{
                background: GRADIENTS.badge,
                border: `1px solid ${BORDERS.medium}`,
                color: "var(--accent)",
              }}
            >
              <Layers3 size={16} />
            </span>
            <h3
              className="text-[15px] font-[800] tracking-[-0.03em] sm:text-[16px]"
              style={{ color: TEXT.primary }}
            >
              Architecture
            </h3>
          </div>

          <div className="relative pl-1.5 py-1">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "calc(100% - 24px)", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="absolute left-[15px] top-6 w-[1.5px]"
              style={{
                background: `linear-gradient(to bottom, transparent, ${BORDERS.medium}, ${BORDERS.strong}, transparent)`,
              }}
            />

            <div className="space-y-3">
              {architectureLayers.map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.08 * index }}
                  whileHover={{ y: -2 }}
                  className={`relative flex items-center gap-3 rounded-[16px] border p-3 transition-all duration-300 ${layer.colorClass}`}
                >
                  <span
                    className="absolute left-[-1px] top-[20px] h-[8px] w-[8px] rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 0 4px rgba(239,157,87,0.10)",
                    }}
                  />

                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-white/40 shadow-sm dark:border-black/5 dark:bg-black/20">
                    {layer.iconNode}
                  </span>

                  <div className="min-w-0">
                    <h4
                      className="text-[12.5px] font-[750] leading-tight sm:text-[13px]"
                      style={{ color: TEXT.primary }}
                    >
                      {layer.title}
                    </h4>
                    <p
                      className="mt-0.5 text-[10.5px] font-[500]"
                      style={{ color: TEXT.soft }}
                    >
                      {layer.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ActionButton label="View Architecture" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col justify-between rounded-[26px] p-5 sm:p-6"
        style={{
          background: GRADIENTS.cardBg,
          border: `1px solid ${BORDERS.subtle}`,
          boxShadow: SHADOWS.card,
          backdropFilter: "blur(12px)",
        }}
      >
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[10px]"
              style={{
                background: GRADIENTS.badge,
                border: `1px solid ${BORDERS.medium}`,
                color: "var(--accent)",
              }}
            >
              <GitBranch size={16} />
            </span>
            <h3
              className="text-[15px] font-[800] tracking-[-0.03em] sm:text-[16px]"
              style={{ color: TEXT.primary }}
            >
              Development Process
            </h3>
          </div>

          <div className="relative my-2 flex-grow py-1 pl-1.5">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "calc(100% - 28px)", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute left-[13px] top-6 w-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(249,115,22,0.15), var(--accent), rgba(249,115,22,0.15))",
              }}
            />

            <div className="space-y-5">
              {timelineSteps.map((step, idx) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 * idx }}
                    whileHover={{ x: 3 }}
                    className="relative flex items-start gap-3 pl-10"
                  >
                    <div className="absolute left-0 top-[1px] z-10 flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.06 }}
                        className={`relative flex h-[28px] w-[28px] items-center justify-center rounded-full border bg-white shadow-sm dark:bg-neutral-900 ${step.borderClass}`}
                      >
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: "0 0 0 4px rgba(239,157,87,0.08)",
                          }}
                        />
                        <span
                          className="text-[10px] font-[800]"
                          style={{ color: TEXT.primary }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                    </div>

                    <div
                      className="flex-1 rounded-[16px] border px-3.5 py-3 transition-all duration-300"
                      style={{
                        borderColor: BORDERS.subtle,
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5">
                          <Icon className={`h-4 w-4 ${step.iconColor}`} />
                        </span>

                        <div>
                          <h4
                            className="text-[13px] font-[800] sm:text-[13.5px]"
                            style={{ color: TEXT.primary }}
                          >
                            {step.title}
                          </h4>
                          <p
                            className="mt-0.5 text-[11px] font-[500] leading-relaxed"
                            style={{ color: TEXT.soft }}
                          >
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ActionButton label="See Development Journey" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col justify-between rounded-[26px] p-5 sm:p-6"
        style={{
          background: GRADIENTS.cardBg,
          border: `1px solid ${BORDERS.subtle}`,
          boxShadow: SHADOWS.card,
          backdropFilter: "blur(12px)",
        }}
      >
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[10px]"
              style={{
                background: GRADIENTS.badge,
                border: `1px solid ${BORDERS.medium}`,
                color: "var(--accent)",
              }}
            >
              <Cpu size={16} />
            </span>
            <h3
              className="text-[15px] font-[800] tracking-[-0.03em] sm:text-[16px]"
              style={{ color: TEXT.primary }}
            >
              Tech Stack
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {techItems.map((tech, idx) => {
              const Logo = LOGO_LIBRARY[tech.logoKey];

              return (
                <motion.div
                  key={`${tech.name}-${idx}`}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex min-h-[92px] flex-col items-center justify-center rounded-[16px] border bg-white/5 px-1.5 py-3.5 text-center shadow-sm transition-all duration-300 dark:bg-black/10"
                  style={{ borderColor: BORDERS.subtle }}
                >
                  <div className="flex h-8 w-8 items-center justify-center text-neutral-900 dark:text-neutral-100">
                    {Logo ? <Logo className={logoSize} /> : <Cpu className="h-5 w-5" />}
                  </div>

                  <span
                    className="mt-2 block min-h-[28px] px-1 text-center text-[10px] font-[750] leading-[1.3] tracking-tight sm:text-[10.5px]"
                    style={{
                      color: TEXT.primary,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <ActionButton label="View All Technologies" />
        </div>
      </motion.div>
    </div>
  );
}