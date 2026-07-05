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
  Route,
  HardDrive,
  Shield,
  Settings2,
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

interface ProjectOverviewRowProps {
  architecture?: string[];
  tech?: string[];
  developmentProcess?: string[];
}

type LogoComponent = ({
  className,
}: {
  className?: string;
}) => React.ReactNode;

const logoSize = "h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]";

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

  router: ({ className }) => (
    <Route className={className || logoSize} color="#22C55E" />
  ),

  storage: ({ className }) => (
    <HardDrive className={className || logoSize} color="#A855F7" />
  ),

  security: ({ className }) => (
    <Shield className={className || logoSize} color="#F59E0B" />
  ),

  settings: ({ className }) => (
    <Settings2 className={className || logoSize} color="#64748B" />
  ),

  database: ({ className }) => (
    <Database className={className || logoSize} color="#336791" />
  ),
};

function resolveTechIcon(name: string) {
  const lower = name.toLowerCase().trim();

  if (lower.includes("supabase")) return "supabase";
  if (lower.includes("gorouter") || lower.includes("go router") || lower.includes("router")) {
    return "router";
  }
  if (lower.includes("bloc") || lower.includes("cubit")) return "bloc";
  if (lower.includes("clean architecture")) return "database";
  if (lower.includes("material")) return "settings";
  if (lower.includes("screenutil")) return "flutter";
  if (lower.includes("storage")) return "storage";
  if (lower.includes("postgres")) return "database";
  if (lower.includes("auth")) return "security";
  if (lower.includes("api")) return "api";
  if (lower.includes("flutter")) return "flutter";
  if (lower.includes("dart")) return "dart";
  if (lower.includes("firebase")) return "firebase";
  if (lower.includes("github")) return "github";
  if (lower.includes("figma")) return "figma";
  if (lower.includes("postman")) return "postman";
  if (lower === "git") return "git";

  return "";
}

const PROCESS_VISUALS = [
  {
    icon: Compass,
    iconColor: "text-blue-500 dark:text-blue-400",
    borderClass: "border-blue-500/20 dark:border-blue-500/40",
  },
  {
    icon: Palette,
    iconColor: "text-[var(--accent)]",
    borderClass: "border-orange-500/20 dark:border-orange-500/40",
  },
  {
    icon: Code2,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    borderClass: "border-emerald-500/20 dark:border-emerald-500/40",
  },
  {
    icon: Gauge,
    iconColor: "text-amber-500 dark:text-amber-400",
    borderClass: "border-amber-500/20 dark:border-amber-500/40",
  },
  {
    icon: Rocket,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    borderClass: "border-indigo-500/20 dark:border-indigo-500/40",
  },
];

export default function ProjectOverviewRow({
  architecture: _architecture,
  tech,
  developmentProcess,
}: ProjectOverviewRowProps) {
  const techItems = useMemo(() => {
    const sourceItems = tech?.filter(Boolean) ?? [];

    return sourceItems.map((item) => ({
      name: item,
      logoKey: resolveTechIcon(item),
    }));
  }, [tech]);

  const architectureLayers = [
    {
      title: "Presentation Layer",
      subtitle: "UI • Flutter screens and components",
      colorClass:
        "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/10 dark:border-orange-500/20",
      iconNode: <LayoutPanelTop size={15} className="text-orange-500" />,
    },
    {
      title: "Domain Layer",
      subtitle: "Use cases • Business logic and rules",
      colorClass:
        "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/10 dark:border-amber-500/20",
      iconNode: <Workflow size={16} className="text-amber-500" />,
    },
    {
      title: "Data Layer",
      subtitle: "Repositories • Models and data sources",
      colorClass:
        "bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/10 dark:border-purple-500/20",
      iconNode: <Database size={16} className="text-purple-500" />,
    },
    {
      title: "External Services",
      subtitle: "APIs • Databases • Cloud integrations",
      colorClass:
        "bg-teal-500/5 dark:bg-teal-500/10 border-teal-500/10 dark:border-teal-500/20",
      iconNode: <PlugZap size={16} className="text-teal-500" />,
    },
  ];

  const timelineSteps = useMemo(() => {
    if (developmentProcess?.length) {
      return developmentProcess.map((step, idx) => {
        const visual = PROCESS_VISUALS[idx % PROCESS_VISUALS.length];
        return {
          title: step,
          subtitle: `Step ${String(idx + 1).padStart(2, "0")}`,
          ...visual,
        };
      });
    }

    return [
      {
        title: "Research & Planning",
        subtitle: "Understanding user needs",
        ...PROCESS_VISUALS[0],
      },
      {
        title: "Design & Prototyping",
        subtitle: "Creating wireframes",
        ...PROCESS_VISUALS[1],
      },
      {
        title: "Development",
        subtitle: "Building features",
        ...PROCESS_VISUALS[2],
      },
      {
        title: "Testing & Optimization",
        subtitle: "Performance & bug fixes",
        ...PROCESS_VISUALS[3],
      },
      {
        title: "Deployment",
        subtitle: "Production release",
        ...PROCESS_VISUALS[4],
      },
    ];
  }, [developmentProcess]);

  return (
    <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex h-full flex-col rounded-[26px] p-5 sm:p-6"
        style={{
          background: GRADIENTS.cardBg,
          border: `1px solid ${BORDERS.subtle}`,
          boxShadow: SHADOWS.card,
          backdropFilter: "blur(12px)",
        }}
      >
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

        <div className="flex-1">
          <div className="space-y-3">
            {architectureLayers.map((layer, index) => {
              const isLast = index === architectureLayers.length - 1;

              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.08 * index }}
                  className="relative grid grid-cols-[32px_1fr] gap-3 pb-3 last:pb-0"
                >
                  {!isLast ? (
                    <span
                      className="absolute left-[15px] top-[32px] h-[calc(100%-4px)] w-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(to bottom, ${BORDERS.medium}, ${BORDERS.strong}, transparent)`,
                      }}
                    />
                  ) : null}

                  <div className="relative z-10 flex justify-center">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/20 bg-white/40 shadow-sm dark:border-black/5 dark:bg-black/20"
                      style={{ boxShadow: "0 0 0 4px rgba(239,157,87,0.08)" }}
                    >
                      {layer.iconNode}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex min-h-[88px] items-center rounded-[16px] border p-3 transition-all duration-300 sm:min-h-[96px] ${layer.colorClass}`}
                  >
                    <div className="min-w-0">
                      <h4
                        className="text-[12.5px] font-[750] leading-tight sm:text-[13px]"
                        style={{ color: TEXT.primary }}
                      >
                        {layer.title}
                      </h4>
                      <p
                        className="mt-1 text-[10.5px] font-[500] leading-relaxed"
                        style={{ color: TEXT.soft }}
                      >
                        {layer.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex h-full flex-col rounded-[26px] p-5 sm:p-6"
        style={{
          background: GRADIENTS.cardBg,
          border: `1px solid ${BORDERS.subtle}`,
          boxShadow: SHADOWS.card,
          backdropFilter: "blur(12px)",
        }}
      >
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

        <div className="flex-1">
          <div className="space-y-0">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === timelineSteps.length - 1;

              return (
                <motion.div
                  key={`${step.title}-${idx}`}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * idx }}
                  className="relative grid grid-cols-[32px_1fr] gap-3 pb-4 last:pb-0"
                >
                  {!isLast ? (
                    <span
                      className="absolute left-[15px] top-[32px] h-[calc(100%-2px)] w-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(249,115,22,0.10), var(--accent), rgba(249,115,22,0.10))",
                      }}
                    />
                  ) : null}

                  <div className="relative z-10 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-sm dark:bg-neutral-900 ${step.borderClass}`}
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

                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex min-h-[88px] items-center rounded-[16px] border px-3.5 py-3 transition-all duration-300 sm:min-h-[96px]"
                    style={{
                      borderColor: BORDERS.subtle,
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5">
                        <Icon className={`h-4 w-4 ${step.iconColor}`} />
                      </span>

                      <div className="min-w-0">
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
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex h-full flex-col rounded-[26px] p-5 sm:p-6"
        style={{
          background: GRADIENTS.cardBg,
          border: `1px solid ${BORDERS.subtle}`,
          boxShadow: SHADOWS.card,
          backdropFilter: "blur(12px)",
        }}
      >
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

        <div className="flex-1">
          <div className="grid grid-cols-3 gap-3">
            {techItems.map((techItem, idx) => {
              const Logo = techItem.logoKey ? LOGO_LIBRARY[techItem.logoKey] : null;

              return (
                <motion.div
                  key={`${techItem.name}-${idx}`}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex min-h-[96px] flex-col items-center justify-center rounded-[16px] border bg-white/5 px-2 py-3.5 text-center shadow-sm transition-all duration-300 dark:bg-black/10"
                  style={{ borderColor: BORDERS.subtle }}
                >
                  <div className="flex h-8 w-8 items-center justify-center text-neutral-900 dark:text-neutral-100">
                    {Logo ? <Logo className={logoSize} /> : <Cpu className="h-5 w-5" />}
                  </div>

                  <span
                    className="mt-2 block px-1 text-center text-[10px] font-[750] leading-[1.3] tracking-tight sm:text-[10.5px]"
                    style={{
                      color: TEXT.primary,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {techItem.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}