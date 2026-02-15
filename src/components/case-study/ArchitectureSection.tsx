"use client";

import { motion } from "framer-motion";

interface Props {
  features: string[];
}

export default function ArchitectureSection({ features }: Props) {
  if (!features) return null;

  return (
    <section className="py-16 relative flex flex-col items-center justify-center w-full">
      {/* <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 md:mb-14">
        Core Features
      </h2> */}

      {/* ===== MOBILE: Vertical timeline (current look you like) ===== */}
      <div className="block md:hidden w-full">
        <MobileTimeline features={features} />
      </div>

      {/* ===== DESKTOP: Core in middle + curved lines + row of boxes ===== */}
      <div className="hidden md:block w-full">
        <DesktopFan features={features} />
      </div>
    </section>
  );
}

/* ========= MOBILE LAYOUT ========= */

function MobileTimeline({ features }: { features: string[] }) {
  return (
    <div className="relative w-full max-w-md mx-auto pt-4 pb-12 px-4">
      {/* Vertical Line */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#475AD7]/40 via-[#475AD7]/20 to-transparent" />

      {/* Core */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: -20 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="
          relative z-10 mx-auto mb-10     -mt-5    
          w-24 h-24 rounded-full
          bg-gradient-to-br from-[#475AD7] to-[#8B5CF6]
          flex items-center justify-center
          text-white font-bold text-lg
          shadow-[0_0_40px_rgba(71,90,215,0.55)]
        "
      >
        Core
      </motion.div>

      {/* Features stacked on the line */}
      <div className="relative flex flex-col gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 180, damping: 16 }}
            className="relative flex justify-center"
          >
            {/* Connector dot */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-3 h-3 rounded-full bg-[#475AD7] shadow-[0_0_12px_rgba(71,90,215,0.9)]" />

            {/* Card */}
            <div
              className="
                w-full
                rounded-2xl px-5 py-4
                backdrop-blur-xl bg-white/6
                border border-white/10
                text-center
                shadow-[0_20px_40px_rgba(0,0,0,0.45)]
              "
            >
              <div className="text-[#475AD7] text-xs font-semibold tracking-[0.18em] mb-2 uppercase">
                Feature {(i + 1).toString().padStart(2, "0")}
              </div>
              <p className="text-gray-100 text-sm leading-relaxed">
                {feature}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ========= DESKTOP LAYOUT: Core box + vertical line + centered cards ========= */

function DesktopFan({ features }: { features: string[] }) {
  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-6 lg:px-0"
      style={{ minHeight: 560 }}
    >
      {/* Background Aura */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[650px] h-[480px] bg-gradient-to-b from-[#475AD7]/25 to-[#8B5CF6]/10 blur-[130px] pointer-events-none" />

      {/* ================= CORE CIRCLE ================= */}
      <div className="relative flex flex-col items-center z-20 mt-10">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -10 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="
    relative
    w-40 h-40 rounded-full
    flex items-center justify-center
    text-white font-semibold text-xl tracking-wide
    shadow-[0_0_100px_rgba(139,92,246,0.65)]
  "
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #8B5CF6, #475AD7 70%)",
          }}
        >
          {/* Inner Glass Layer */}
          <div className="absolute inset-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10" />

          {/* Animated Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />

          <span className="relative z-10">Core</span>
        </motion.div>



        {/* Vertical connector line */}
        <div
          className="
    w-[3px] h-32 mt-6 mb-14
    bg-[#475AD7]
  "
        />

      </div>

      {/* ================= FEATURE CARDS ================= */}
      <div className="relative z-10 flex flex-wrap justify-center gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2 + i * 0.07,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            whileHover={{ y: -6 }}
            className="
              w-64 lg:w-72
              rounded-2xl px-7 py-6
              backdrop-blur-xl bg-white/6
              border border-white/10
              text-center
              shadow-[0_25px_60px_rgba(0,0,0,0.55)]
              transition-all duration-300
              hover:border-[#8B5CF6]/60
              hover:shadow-[0_0_45px_rgba(139,92,246,0.4)]
            "
          >
            <div className="text-[#8B5CF6] text-lg font-bold tracking-[0.2em] mb-3 uppercase">
              Feature {(i + 1).toString().padStart(2, "0")}
            </div>

            <p className="text-gray-100 text-base leading-relaxed">
              {feature}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}





