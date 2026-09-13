"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const NUMBERS = [
  { value: "4+", labelKey: "projectsBuilt" as const },
  { value: "50+", labelKey: "publishedConcepts" as const },
  { value: "15+", labelKey: "techUsed" as const },
  { value: "100%", labelKey: "handsOn" as const },
];

export default function CombinedSection() {
  const t = useTranslations("credentials");

  return (
    <SectionWrapper id="about" className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-8 sm:pb-10 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <span
              className="text-[10px] font-[800] uppercase tracking-[0.1em] sm:text-[11px]"
              style={{ color: TEXT.badge }}
            >
              {t("eyebrow")}
            </span>
            <h2 className="font-editorial text-5xl sm:text-7xl mt-2" style={{ color: TEXT.primary }}>
              <CursorRepulsionText text="Built with" className="inline-block" /> <br />
              <span className="font-editorial-italic inline-block" style={{ color: "var(--text-muted)" }}><CursorRepulsionText text="curiosity." className="inline-block" /></span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {t("description")}
          </div>
        </div>

        {/* ── Numbers + Image Row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 mb-12 sm:mb-14 items-center"
        >
          {/* Numbers Grid */}
          <div className="grid grid-cols-2 gap-5">
            {NUMBERS.map((num) => (
              <motion.div
                key={num.labelKey}
                variants={itemVariants}
                className="rounded-[20px] px-5 py-5"
                style={{
                  background: GRADIENTS.solidCard,
                  border: `1px solid ${BORDERS.subtle}`,
                  boxShadow: SHADOWS.card,
                }}
              >
                <div className="text-3xl sm:text-4xl font-editorial" style={{ color: TEXT.primary }}>{num.value}</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono mt-1" style={{ color: "var(--text-muted)" }}>{t(num.labelKey)}</div>
              </motion.div>
            ))}
          </div>

          {/* Image Card */}
          <motion.div
            variants={itemVariants}
            className="rounded-[24px] overflow-hidden"
            style={{
              background: GRADIENTS.solidCard,
              border: `1px solid ${BORDERS.subtle}`,
              boxShadow: SHADOWS.card,
            }}
          >
            <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px]">
              <Image
                src="/personal-built.png"
                alt="Built with curiosity"
                fill
                className="object-cover"
                sizes="340px"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Focus Card ── */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-[24px] p-6 sm:p-8"
          style={{
            background: GRADIENTS.solidCard,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Focus */}
            <div>
              <span className="text-[10px] font-[800] uppercase tracking-[0.1em] sm:text-[11px]" style={{ color: "#34d399" }}>
                {t("coreFocus")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3" style={{ color: TEXT.primary }}>{t("coreFocusTitle")}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{t("coreFocusDesc")}</p>
              <div className="flex flex-wrap gap-1.5">
                {["Flutter", "Dart", "Clean Architecture", "State Management", "Responsive UI"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full border text-[11px] font-mono"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--background-secondary)",
                      color: "var(--text-dim)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Continuous Practice */}
            <div>
              <span className="text-[10px] font-[800] uppercase tracking-[0.1em] sm:text-[11px]" style={{ color: "#a78bfa" }}>
                {t("continuousPractice")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3" style={{ color: TEXT.primary }}>{t("continuousTitle")}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{t("continuousDesc")}</p>
              <div className="flex flex-wrap gap-1.5">
                {["Backend Integration", "Local Storage", "AI APIs", "Product Design"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full border text-[11px] font-mono"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--background-secondary)",
                      color: "var(--text-dim)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t text-xs font-mono" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
            Flutter · Dart · Clean Architecture · Backend Integration · Local Storage · AI APIs
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
