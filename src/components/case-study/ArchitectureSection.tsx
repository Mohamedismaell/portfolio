"use client";

import { motion } from "framer-motion";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";
import GradientText from "@/components/ui/GradientText";

interface Props {
  features: string[];
}

export default function ArchitectureSection({ features }: Props) {
  if (!features) return null;

  return (
    <section className="py-16 relative flex flex-col items-center justify-center w-full">
      <div className="block md:hidden w-full">
        <MobileTimeline features={features} />
      </div>
      <div className="hidden md:block w-full">
        <DesktopFan features={features} />
      </div>
    </section>
  );
}

// ── Mobile ────────────────────────────────────────────────
function MobileTimeline({ features }: { features: string[] }) {
  return (
    <div className="relative w-full max-w-md mx-auto pt-4 pb-12 px-4">

      {/* Vertical line */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, ${BORDERS.strong}, ${BORDERS.medium}, transparent)`,
        }}
      />

      {/* Core badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: -20 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative z-10 mx-auto mb-10 -mt-5 w-20 h-20 rounded-full flex items-center justify-center font-bold text-base"
        style={{
          background: GRADIENTS.solidCard,
          //  White border matching design system
          border: `1.5px solid ${BORDERS.strong}`,
          color: "rgba(255,255,255,0.92)",
          boxShadow: `0 0 30px rgba(255,255,255,0.08), 0 0 0 4px rgba(255,255,255,0.04)`,
        }}
      >
        Core
      </motion.div>

      {/* Feature cards */}
      <div className="relative flex flex-col gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 180, damping: 16 }}
            className="relative flex justify-center"
          >
            {/* Connector dot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-3.5 w-2 h-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.5)",
                boxShadow: "0 0 8px rgba(255,255,255,0.25)",
              }}
            />

            {/* Card */}
            <div
              className="w-full rounded-2xl px-5 py-4 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/*  Number with lighter white color */}
              <div
                className="text-[11px] font-black tracking-[0.25em] mb-2 uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Feature {(i + 1).toString().padStart(2, "0")}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: TEXT.soft }}>
                {feature}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Desktop ───────────────────────────────────────────────
function DesktopFan({ features }: { features: string[] }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-0" style={{ minHeight: 560 }}>

      {/* Ambient glow */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[500px] h-[400px] blur-[120px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />

      {/* Core circle */}
      <div className="relative flex flex-col items-center z-20 mt-10">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -10 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative w-36 h-36 rounded-full flex items-center justify-center font-semibold text-lg tracking-wide"
          style={{
            background: GRADIENTS.solidCard,
            //  Brighter white border
            border: `1.5px solid ${BORDERS.strong}`,
            color: "rgba(255,255,255,0.92)",
            boxShadow: `0 0 0 6px rgba(255,255,255,0.04), 0 0 60px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Inner glass */}
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${BORDERS.subtle}`,
            }}
          />

          {/*  Pulse ring — uses BORDERS.strong for visibility */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${BORDERS.strong}` }}
            animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.05, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />

          <span className="relative z-10">Core</span>
        </motion.div>

        {/* Connector line */}
        <div
          className="w-px h-24 mt-5 mb-10"
          style={{
            background: `linear-gradient(to bottom, ${BORDERS.strong}, transparent)`,
          }}
        />
      </div>

      {/*  Feature cards — staggered entrance animation */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15 + i * 0.08,
              duration: 0.5,
              ease: "easeOut",
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="w-60 lg:w-72 rounded-2xl px-6 py-5 text-center transition-colors duration-300"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${BORDERS.subtle}`,
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = `1px solid ${BORDERS.strong}`;
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(255,255,255,0.07), 0 20px 50px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = `1px solid ${BORDERS.subtle}`;
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
            }}
          >
            {/*  Feature number — lighter, distinct color */}
            <div
              className="text-xs font-black tracking-[0.25em] mb-3 uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Feature {(i + 1).toString().padStart(2, "0")}
            </div>

            {/*  Feature text — gradient matching design system */}
            <p
              className="text-sm leading-relaxed font-medium"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {feature}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
