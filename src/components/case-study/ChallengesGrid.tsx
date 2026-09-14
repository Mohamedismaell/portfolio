"use client";

import React from "react";
import { Zap, BarChart3 } from "lucide-react";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";

export interface ChallengeItem {
  icon?: string;
  title?: string;
  challenge: string;
  solution: string;
}

interface ChallengesGridProps {
  challenges?: ChallengeItem[];
  highlights?: string[];
}

function getChallengeIcon(icon?: string, index = 0) {
  const key = (icon || "").toLowerCase();
  if (key.includes("performance") || key.includes("lightning") || key.includes("speed")) {
    return { Icon: Zap, bg: "bg-orange-50 border-orange-200", text: "text-orange-600" };
  }
  if (key.includes("scroll") || key.includes("list") || key.includes("ui")) {
    return { Icon: BarChart3, bg: "bg-blue-50 border-blue-200", text: "text-blue-600" };
  }
  const defaults = [
    { Icon: Zap, bg: "bg-orange-50 border-orange-200", text: "text-orange-600" },
    { Icon: BarChart3, bg: "bg-blue-50 border-blue-200", text: "text-blue-600" },
  ];
  return defaults[index % defaults.length];
}

export default function ChallengesGrid({ challenges = [], highlights = [] }: ChallengesGridProps) {
  if (!challenges.length && !highlights.length) return null;

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-500">Challenges & Solutions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[var(--charcoal)]"><CursorRepulsionText text="Real challenges. Practical solutions." /></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Challenge Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {challenges.slice(0, 2).map((item, idx) => {
            const { Icon, bg, text } = getChallengeIcon(item.icon, idx);
            const title = item.title || `Challenge ${String(idx + 1).padStart(2, "0")}`;

            return (
              <div
                key={`${title}-${idx}`}
                className="bg-white border border-[var(--subtle-border)] rounded-2xl p-6 soft-card-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-9 h-9 rounded-xl ${bg} border flex items-center justify-center ${text}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{item.challenge}</p>
                  </div>
                  <div className="pt-2 border-t border-[var(--subtle-border)]/60">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Solution</span>
                    <p className="text-xs text-neutral-700 mt-1 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Key Highlights Checklist */}
        {highlights.length > 0 && (
          <div className="lg:col-span-4 bg-white border border-[var(--subtle-border)] rounded-2xl p-6 soft-card-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Key Highlights</span>
              </div>
              <div className="space-y-3 pt-1">
                {highlights.map((item, idx) => (
                  <div key={`${item}-${idx}`} className="flex items-center gap-2.5 text-xs text-neutral-800">
                    <span className="w-4 h-4 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-900 font-bold shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
