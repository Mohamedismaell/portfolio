"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Map,
  Sparkles,
  Zap,
  Shield,
  Database,
  RefreshCw,
  Search,
  Bell,
  MapPin,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

export interface ChallengeItem {
  icon?: string;
  title?: string;
  challenge: string;
  solution: string;
}

interface ChallengesGridProps {
  challenges?: ChallengeItem[];
}

interface IconConfig {
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const ICON_MAPS: Record<string, IconConfig> = {
  navigation: {
    icon: Map,
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/20 dark:border-orange-500/30",
  },
  map: {
    icon: Map,
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/20 dark:border-orange-500/30",
  },
  location: {
    icon: MapPin,
    bgColor: "bg-rose-500/10 dark:bg-rose-500/20",
    textColor: "text-rose-500",
    borderColor: "border-rose-500/20 dark:border-rose-500/30",
  },
  sparkles: {
    icon: Sparkles,
    bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
    textColor: "text-violet-500",
    borderColor: "border-violet-500/20 dark:border-violet-500/30",
  },
  ai: {
    icon: Sparkles,
    bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
    textColor: "text-violet-500",
    borderColor: "border-violet-500/20 dark:border-violet-500/30",
  },
  lightning: {
    icon: Zap,
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/25 dark:border-amber-500/35",
  },
  performance: {
    icon: Zap,
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/25 dark:border-amber-500/35",
  },
  shield: {
    icon: Shield,
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/20 dark:border-emerald-500/30",
  },
  auth: {
    icon: Shield,
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/20 dark:border-emerald-500/30",
  },
  database: {
    icon: Database,
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20 dark:border-blue-500/30",
  },
  cache: {
    icon: Database,
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20 dark:border-blue-500/30",
  },
  refresh: {
    icon: RefreshCw,
    bgColor: "bg-teal-500/10 dark:bg-teal-500/20",
    textColor: "text-teal-500",
    borderColor: "border-teal-500/20 dark:border-teal-500/30",
  },
  "real-time": {
    icon: RefreshCw,
    bgColor: "bg-teal-500/10 dark:bg-teal-500/20",
    textColor: "text-teal-500",
    borderColor: "border-teal-500/20 dark:border-teal-500/30",
  },
  search: {
    icon: Search,
    bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
    textColor: "text-indigo-500",
    borderColor: "border-indigo-500/20 dark:border-indigo-500/30",
  },
  bell: {
    icon: Bell,
    bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
    textColor: "text-pink-500",
    borderColor: "border-pink-500/20 dark:border-pink-500/30",
  },
  notifications: {
    icon: Bell,
    bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
    textColor: "text-pink-500",
    borderColor: "border-pink-500/20 dark:border-pink-500/30",
  },
};

function getFallbackConfig(challengeText: string, solutionText: string, index: number) {
  const combined = `${challengeText} ${solutionText}`.toLowerCase();

  if (combined.includes("offline") && (combined.includes("nav") || combined.includes("map"))) {
    return { conf: ICON_MAPS.navigation, key: "navigation", defaultTitle: "Offline Navigation" };
  }
  if (combined.includes("map") || combined.includes("position") || combined.includes("location")) {
    return { conf: ICON_MAPS.location, key: "location", defaultTitle: "Location Services" };
  }
  if (combined.includes("ai ") || combined.includes("recommend") || combined.includes("spark") || combined.includes("predict")) {
    return { conf: ICON_MAPS.sparkles, key: "sparkles", defaultTitle: "AI Recommendations" };
  }
  if (combined.includes("speed") || combined.includes("perform") || combined.includes("fast") || combined.includes("rebuild")) {
    return { conf: ICON_MAPS.lightning, key: "lightning", defaultTitle: "Performance & Triggers" };
  }
  if (combined.includes("auth") || combined.includes("login") || combined.includes("session") || combined.includes("security")) {
    return { conf: ICON_MAPS.shield, key: "shield", defaultTitle: "Authentication & Security" };
  }
  if (combined.includes("cache") || combined.includes("db") || combined.includes("database") || combined.includes("hive") || combined.includes("store")) {
    return { conf: ICON_MAPS.database, key: "database", defaultTitle: "Caching & Storage" };
  }
  if (combined.includes("realtime") || combined.includes("real-time") || combined.includes("sync") || combined.includes("update") || combined.includes("refresh")) {
    return { conf: ICON_MAPS.refresh, key: "refresh", defaultTitle: "Real-time Updates" };
  }
  if (combined.includes("search") || combined.includes("filter") || combined.includes("query")) {
    return { conf: ICON_MAPS.search, key: "search", defaultTitle: "Search & Filtering" };
  }
  if (combined.includes("notify") || combined.includes("bell") || combined.includes("push")) {
    return { conf: ICON_MAPS.bell, key: "bell", defaultTitle: "Push Notifications" };
  }

  const list = Object.keys(ICON_MAPS);
  const selectedKey = list[index % list.length];

  return {
    conf: ICON_MAPS[selectedKey],
    key: selectedKey,
    defaultTitle: `Challenge ${String(index + 1).padStart(2, "0")}`,
  };
}

export default function ChallengesGrid({ challenges = [] }: ChallengesGridProps) {
  if (!challenges.length) return null;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-[10px]"
          style={{
            background: GRADIENTS.badge,
            border: `1px solid ${BORDERS.medium}`,
            color: "var(--accent)",
          }}
        >
          <AlertCircle size={16} />
        </span>

        <h3
          className="text-[17px] font-[800] tracking-[-0.03em] sm:text-[18px]"
          style={{ color: TEXT.primary }}
        >
          Challenges & Solutions
        </h3>
      </div>

      <div className="grid flex-1 grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
        {challenges.map((item, idx) => {
          let iconKey = (item.icon || "").toLowerCase().trim();
          let resolved = ICON_MAPS[iconKey];
          let fallbackTitle = `Challenge ${String(idx + 1).padStart(2, "0")}`;

          if (!resolved) {
            const fallback = getFallbackConfig(item.challenge, item.solution, idx);
            resolved = fallback.conf;
            fallbackTitle = fallback.defaultTitle;
          }

          const title = item.title || fallbackTitle;
          const TargetIcon = resolved.icon;

          return (
            <motion.div
              key={`${title}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex h-full min-h-[320px] flex-col rounded-[24px] p-4 sm:p-5"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.ghostBtn,
              }}
            >
              <div className="mb-4 flex min-h-[52px] items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border ${resolved.bgColor} ${resolved.textColor} ${resolved.borderColor}`}
                >
                  <TargetIcon size={16} />
                </span>

                <div className="min-w-0">
                  <h4
                    className="text-[13px] font-[850] leading-[1.35] tracking-tight sm:text-[13.5px]"
                    style={{ color: TEXT.primary }}
                  >
                    {title}
                  </h4>
                </div>
              </div>

              <div className="grid flex-1 grid-rows-2 gap-3">
                <div
                  className="flex h-full flex-col rounded-[16px] px-3 py-3"
                  style={{
                    background: GRADIENTS.solidCard,
                    border: `1px solid ${BORDERS.subtle}`,
                  }}
                >
                  <div className="mb-1.5 text-[10px] font-[800] uppercase tracking-[0.08em] text-orange-500">
                    Challenge
                  </div>

                  <p
                    className="text-[11px] font-[550] leading-[1.62] sm:text-[11.5px]"
                    style={{
                      color: TEXT.soft,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.challenge}
                  </p>
                </div>

                <div
                  className="flex h-full flex-col rounded-[16px] px-3 py-3"
                  style={{
                    background: GRADIENTS.solidCard,
                    border: `1px solid ${BORDERS.subtle}`,
                  }}
                >
                  <div className="mb-1.5 text-[10px] font-[800] uppercase tracking-[0.08em] text-emerald-500">
                    Solution
                  </div>

                  <p
                    className="text-[11px] font-[550] leading-[1.62] sm:text-[11.5px]"
                    style={{
                      color: TEXT.soft,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}