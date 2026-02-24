"use client";

import { motion } from "framer-motion";
import { Eye, Images, Lock } from "lucide-react";
import ScreenshotsModal from "../ScreenshotsModal";
import Link from "next/link";
import { BORDERS } from "@/lib/theme";
import { SiGoogleplay, SiAppstore } from "react-icons/si";

export default function ProjectHighlights({
  gallery = [],
  slug,
  color = "#475AD7",
  googlePlay = null,
  appStore = null,
  comingSoon = false,
}: any) {

  const sharedStyle = {
    background: "rgba(255,255,255,0.07)",
    border: `1px solid ${BORDERS.medium}`,
    color: "rgba(255,255,255,0.70)",
    boxShadow: `0 4px 20px ${color}20`,
  };

  const disabledStyle = {
    background: "rgba(255,255,255,0.02)",
    border: `1px solid rgba(255,255,255,0.06)`,
    color: "rgba(255,255,255,0.2)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-2"
    >
      {/*  Row 1: Details + Screenshots  */}
      <div className="grid grid-cols-2 gap-2">

        {/* Details */}
        {comingSoon ? (
          <DisabledButton color={color} icon={<Eye size={13} />} label="Details" />
        ) : (
          <Link
            href={`/en/projects/${slug}`}
            className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 overflow-hidden"
            style={sharedStyle}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${color}35, rgba(255,255,255,0.05))`,
              }}
            />
            <Eye size={13} className="relative z-10 shrink-0" />
            <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
              Details
            </span>
          </Link>
        )}

        {/* Screenshots */}
        {comingSoon ? (
          <DisabledButton color={color} icon={<Images size={13} />} label="Screenshots" />
        ) : (
          <div
            className="group/btn relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 active:scale-95"
            style={sharedStyle}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
              style={{
                background: `linear-gradient(135deg, ${color}35, rgba(255,255,255,0.05))`,
              }}
            />
            <ScreenshotsModal
              images={gallery}
              icon={<Images size={13} />}
              className="relative z-10 w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white/70 group-hover/btn:text-white transition-colors duration-300"
            />
          </div>
        )}

      </div>

      {/*  Row 2: Store buttons */}
      <div className="grid grid-cols-2 gap-2">
        <StoreButton type="google" href={comingSoon ? null : googlePlay} color={color} forceDisabled={comingSoon} />
        <StoreButton type="apple" href={comingSoon ? null : appStore} color={color} forceDisabled={comingSoon} />
      </div>

    </motion.div>
  );
}

function DisabledButton({
  icon, label, color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <div
      className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium cursor-not-allowed select-none overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(255,255,255,0.06)`,
        color: "rgba(255,255,255,0.2)",
      }}
    >
      <Lock size={13} className="shrink-0" />
      <span>{label}</span>

      {/* Tooltip */}
      <span
        className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
        style={{
          background: "rgba(12,12,12,0.95)",
          border: `1px solid rgba(255,255,255,0.08)`,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <Lock size={8} />
        Coming soon
      </span>
    </div>
  );
}

function StoreButton({
  type, href, color, forceDisabled = false,
}: {
  type: "google" | "apple";
  href: string | null;
  color: string;
  forceDisabled?: boolean;
}) {
  const label = type === "google" ? "Google Play" : "App Store";
  const Icon = type === "google" ? SiGoogleplay : SiAppstore;
  const tooltipText = forceDisabled ? "Coming soon" : "Not available yet";

  const sharedStyle = {
    background: "rgba(255,255,255,0.07)",
    border: `1px solid ${BORDERS.medium}`,
    color: "rgba(255,255,255,0.70)",
    boxShadow: `0 4px 20px ${color}20`,
  };

  if (href && !forceDisabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 overflow-hidden"
        style={sharedStyle}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${color}35, rgba(255,255,255,0.05))`,
          }}
        />
        <Icon size={13} className="relative z-10 shrink-0" />
        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
          {label}
        </span>
      </a>
    );
  }

  return (
    <div
      className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium cursor-not-allowed select-none overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(255,255,255,0.06)`,
        color: "rgba(255,255,255,0.2)",
      }}
    >
      <Lock size={13} className="shrink-0" />
      <span>{label}</span>

      {/* Tooltip */}
      <span
        className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
        style={{
          background: "rgba(12,12,12,0.95)",
          border: `1px solid rgba(255,255,255,0.08)`,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <Lock size={8} />
        {tooltipText}
      </span>
    </div>
  );
}
