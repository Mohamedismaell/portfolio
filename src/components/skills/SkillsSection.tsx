"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import SectionWrapper from "@/components/ui/SectionWrapper";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BLUEPRINT_CARDS = [
  {
    number: "01",
    titleKey: "card1Title" as const,
    descKey: "card1Desc" as const,
    image: "/flutterold-design.png",
    icon: "/flutter-svgrepo-com(1).svg",
    skills: ["Flutter", "Dart", "Bloc / Cubit", "Clean Architecture", "REST APIs", "Local Storage"],
  },
  {
    number: "02",
    titleKey: "card2Title" as const,
    descKey: "card2Desc" as const,
    image: "/uiolddesign.png",
    icon: "/figma-svgrepo-com.svg",
    skills: ["Flutter UI", "Figma", "Responsive Design", "Animations", "Custom Components", "Material 3"],
  },
  {
    number: "03",
    titleKey: "card3Title" as const,
    descKey: "card3Desc" as const,
    image: "/databaseolddesign.png",
    icon: "/database-svgrepo-com.svg",
    skills: ["Supabase", "REST APIs", "Authentication", "PostgreSQL", "Dio", "Local Caching"],
  },
];

const TECH_PILLS = [
  "Flutter",
  "Dart",
  "Bloc",
  "Cubit",
  "Figma",
  "Supabase",
  "Firebase",
  "PostgreSQL",
  "REST APIs",
  "Dio",
  "Hive",
  "GoRouter",
  "GetIt",
  "Clean Architecture",
  "Git",
  "GitHub",
  "Responsive UI",
  "Animations",
];

const MARQUEE_TECH = [...TECH_PILLS, ...TECH_PILLS, ...TECH_PILLS];

export default function SkillsSection() {
  const t = useTranslations("whatIBuild");

  return (
    <SectionWrapper id="what-i-build" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-solid)] shadow-xs text-[11px] font-sans font-medium uppercase tracking-wider text-[var(--text-primary)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="font-editorial text-5xl sm:text-6xl text-[var(--text-primary)] tracking-tight leading-none">
            <CursorRepulsionText text="What I" className="inline-block" />{" "}
            <span className="font-editorial-italic font-normal inline-block"><CursorRepulsionText text="Build" className="inline-block" /></span>
          </h2>
          <p className="text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {t("subtitle")}
          </p>
        </div>

        {/* Blueprint Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          {BLUEPRINT_CARDS.map((card) => (
            <motion.div
              key={card.number}
              variants={cardVariants}
              className="bg-[var(--surface-solid)] border border-[var(--border-subtle)] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200 relative overflow-hidden group"
            >
              <div>
                {/* Icon in bordered card */}
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-md border-2 border-[var(--text-primary)] bg-white shadow-xs group-hover:translate-x-0.5 transition-transform duration-200">
                  <Image src={card.icon} alt="" width={28} height={28} className="w-7 h-7" />
                </div>
                {/* Blueprint artwork */}
                <div className="h-48 rounded-2xl relative overflow-hidden mb-6 select-none">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Bottom Textual Meta */}
                <div className="text-left">
                  <span className="text-xs font-mono text-[var(--text-muted)] font-medium block mb-1">{card.number}</span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm mt-2 leading-relaxed font-normal" style={{ color: "var(--text-soft)" }}>
                    {t(card.descKey)}
                  </p>
                </div>
                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5 text-left">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--background-secondary)] text-[11px] font-sans font-medium cursor-default hover:bg-[var(--text-primary)] hover:text-white hover:border-[var(--text-primary)] hover:scale-105 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Pill Marquee */}
        <div className="mt-14 overflow-hidden relative z-10">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
          `}</style>
          <div className="flex w-max gap-3" style={{ animation: "marquee 30s linear infinite" }}>
            {MARQUEE_TECH.map((tech, i) => (
              <div
                key={`${tech}-${i}`}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium bg-[var(--surface-solid)] border border-[var(--border-subtle)] flex items-center gap-2 shadow-xs cursor-default hover:border-[var(--border-strong)] transition-colors whitespace-nowrap"
                style={{ color: "var(--text-primary)" }}
              >
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
