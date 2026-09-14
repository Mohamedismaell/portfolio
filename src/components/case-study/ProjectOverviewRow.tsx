"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";

interface ProjectOverviewRowProps {
  architecture?: string[];
  tech?: string[];
  developmentProcess?: string[];
}

import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiSupabase,
  SiFigma,
  SiGit,
  SiGithub,
} from "react-icons/si";

type IconComponent = ({ className }: { className?: string }) => React.ReactNode;

const LOGO_MAP: Record<string, IconComponent> = {
  flutter: ({ className }) => <SiFlutter className={className} color="#02569B" />,
  dart: ({ className }) => <SiDart className={className} color="#0175C2" />,
  firebase: ({ className }) => <SiFirebase className={className} color="#FFCA28" />,
  supabase: ({ className }) => <SiSupabase className={className} color="#3ECF8E" />,
  figma: ({ className }) => <SiFigma className={className} color="#F24E1E" />,
  git: ({ className }) => <SiGit className={className} color="#F05032" />,
  github: ({ className }) => <SiGithub className={className} color="currentColor" />,
};

function TechIcon({ name }: { name: string }) {
  const lower = name.toLowerCase().trim();

  for (const [key, Comp] of Object.entries(LOGO_MAP)) {
    if (lower.includes(key)) return <Comp className="h-5 w-5" />;
  }

  // Custom SVGs for things not in simple-icons
  if (lower.includes("bloc") || lower.includes("cubit")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="7" cy="7" r="2.4" fill="#8B5CF6" />
        <circle cx="17" cy="7" r="2.4" fill="#EC4899" />
        <circle cx="12" cy="12" r="2.4" fill="#3B82F6" />
        <circle cx="7" cy="17" r="2.4" fill="#14B8A6" />
        <circle cx="17" cy="17" r="2.4" fill="#F59E0B" />
        <path d="M8.9 8.6 10.5 10M15.1 8.6 13.5 10M10 13.8 8.8 15.2M14 13.8 15.2 15.2" stroke="#E2E8F0" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (lower.includes("hive")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="none" stroke="#D97706" strokeWidth="1.8" />
        <path d="M12 12L3 7M12 12v10M12 12l9-5" stroke="#F59E0B" strokeWidth="1.5" />
      </svg>
    );
  }
  if (lower.includes("dio")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="4" rx="1.6" fill="#0D9488" opacity="0.85" />
        <rect x="3" y="10" width="18" height="4" rx="1.6" fill="#14B8A6" />
        <rect x="3" y="16" width="18" height="4" rx="1.6" fill="#0F766E" opacity="0.9" />
        <circle cx="6" cy="6" r="1" fill="#fff" />
        <circle cx="6" cy="12" r="1" fill="#fff" />
        <circle cx="6" cy="18" r="1" fill="#fff" />
        <path d="M10 6h8M10 12h8M10 18h8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (lower.includes("gorouter") || lower.includes("router")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round">
        <path d="M3 12h6l3-9 3 18 3-9h6" />
      </svg>
    );
  }
  if (lower.includes("clean architecture")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="#6366F1" strokeWidth="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (lower.includes("hydrated")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="#3B82F6" strokeWidth="1.8" />
      </svg>
    );
  }
  if (lower.includes("freezed")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (lower.includes("getit") || lower.includes("dependency injection")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }
  if (lower.includes("responsive") || lower.includes("screenutil")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#14B8A6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }
  if (lower.includes("material")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#6366F1" />
        <path d="M2 17l10 5 10-5" fill="none" stroke="#6366F1" strokeWidth="1.5" />
        <path d="M2 12l10 5 10-5" fill="none" stroke="#6366F1" strokeWidth="1.5" />
      </svg>
    );
  }
  if (lower.includes("api") || lower.includes("rest")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="8" cy="6" r="2" fill="#10B981" />
        <circle cx="16" cy="12" r="2" fill="#10B981" />
        <circle cx="10" cy="18" r="2" fill="#10B981" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export default function ProjectOverviewRow({
  architecture: _architecture,
  tech,
  developmentProcess,
}: ProjectOverviewRowProps) {
  const techItems = useMemo(() => {
    return (tech?.filter(Boolean) ?? []).map((item) => ({ name: item }));
  }, [tech]);

  const layers = [
    { title: "Presentation Layer", subtitle: "UI widgets, state machines, reactive streams", dot: "bg-emerald-500" },
    { title: "Domain Layer", subtitle: "Pure business logic, use cases, domain entities", dot: "bg-amber-500" },
    { title: "Data Layer", subtitle: "Hive offline box, Dio HTTP REST API, repository impl", dot: "bg-blue-500" },
  ];

  const steps = developmentProcess?.length
    ? developmentProcess
    : ["Research & Planning", "Design & Prototyping", "Development", "Testing & Optimization", "Deployment"];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-500">What I Built</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--charcoal)]">
            <CursorRepulsionText text="From idea to a real product." />
          </h2>
        </div>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Architecture — Animated Stroke Layers */}
        <div className="lg:col-span-4 bg-white border border-[var(--subtle-border)] rounded-2xl p-6 soft-card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="7" rx="2" />
                <rect x="2" y="14" width="20" height="7" rx="2" />
                <circle cx="12" cy="6.5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="17.5" r="1.5" fill="currentColor" />
              </svg>
              <h3 className="text-sm font-bold text-neutral-900">Architecture</h3>
            </div>

            {/* Stacked Architecture Diagram */}
            <div className="my-6 relative flex justify-center items-center py-4">
              <div className="w-44 h-36 relative">
                <motion.div
                  initial={{ borderColor: "rgb(209 213 219)" }}
                  animate={{ borderColor: ["rgb(209 213 219)", "rgb(16 185 129)", "rgb(16 185 129)", "rgb(209 213 219)", "rgb(209 213 219)"] }}
                  transition={{ duration: 5.4, delay: 0, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 w-36 h-14 bg-white border-2 border-neutral-300 rounded-lg transform -skew-x-12 rotate-3 shadow-md flex items-center justify-center text-[10px] font-bold text-neutral-900"
                >
                  Presentation Layer
                </motion.div>
                <motion.div
                  initial={{ borderColor: "rgb(209 213 219)" }}
                  animate={{ borderColor: ["rgb(209 213 219)", "rgb(16 185 129)", "rgb(16 185 129)", "rgb(209 213 219)", "rgb(209 213 219)"] }}
                  transition={{ duration: 5.4, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 w-36 h-14 bg-neutral-100/90 border-2 border-neutral-300 rounded-lg transform -skew-x-12 rotate-3 translate-x-2 shadow-sm flex items-center justify-center text-[10px] font-semibold text-neutral-800"
                >
                  Domain Layer
                </motion.div>
                <motion.div
                  initial={{ borderColor: "rgb(209 213 219)" }}
                  animate={{ borderColor: ["rgb(209 213 219)", "rgb(16 185 129)", "rgb(16 185 129)", "rgb(209 213 219)", "rgb(209 213 219)"] }}
                  transition={{ duration: 5.4, delay: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 w-36 h-14 bg-neutral-50 border-2 border-neutral-300 rounded-lg transform -skew-x-12 rotate-3 translate-x-4 shadow-xs flex items-center justify-center text-[10px] font-semibold text-neutral-600"
                >
                  Data Layer
                </motion.div>
              </div>
            </div>

            {/* Layer Explanations */}
            <div className="space-y-3.5 pt-2 text-xs">
              {layers.map((layer, idx) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 1 }}
                  className="flex items-start gap-2.5"
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${layer.dot}`} />
                  <div>
                    <h4 className="font-semibold text-neutral-900">{layer.title}</h4>
                    <p className="text-[11px] text-neutral-500">{layer.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Tech Stack — Real Icons */}
        <div className="lg:col-span-4 bg-white border border-[var(--subtle-border)] rounded-2xl p-6 soft-card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <h3 className="text-sm font-bold text-neutral-900">Tech Stack</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {techItems.slice(0, 9).map((item) => (
                <div
                  key={item.name}
                  className="border border-[var(--subtle-border)]/80 rounded-xl p-3 text-center bg-neutral-50/50 hover:border-neutral-300 transition flex flex-col items-center justify-center"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-neutral-800">
                    <TechIcon name={item.name} />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-800 block mt-1">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Development Process — Timeline Circles */}
        <div className="lg:col-span-4 bg-white border border-[var(--subtle-border)] rounded-2xl p-6 soft-card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h3 className="text-sm font-bold text-neutral-900">Development Process</h3>
            </div>
            <div className="space-y-0">
              {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                return (
                  <div key={`${step}-${idx}`} className="relative flex items-start gap-3">
                    {/* Circle number + connector line */}
                    <div className="flex flex-col items-center">
                      <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </div>
                      {!isLast && (
                        <div className="w-[2px] h-6 bg-neutral-200" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-4">
                      <h4 className="text-xs font-semibold text-neutral-900 leading-tight">{step}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
