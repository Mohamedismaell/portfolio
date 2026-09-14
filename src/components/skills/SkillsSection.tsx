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
    title: "Flutter Applications",
    descKey: "card1Desc" as const,
    image: "/flutterold-design.png",
    icon: (
      <svg className="w-6 h-6 fill-current text-black" viewBox="0 0 24 24">
        <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4zm0 9.292L7.714 15.893 11.414 19.6l6.6-6.6-3.7-3.708zm0 7.422l-2.286 2.286L14.314 21.3 20.3 15.3l-2.286-2.286-3.7 3.7z" />
      </svg>
    ),
    skills: ["Flutter", "Dart", "Bloc / Cubit", "Clean Architecture", "REST APIs", "Local Storage"],
  },
  {
    number: "02",
    title: "Product & UI",
    badge: "Design to Code",
    descKey: "card2Desc" as const,
    image: "/uiolddesign.png",
    icon: (
      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      </svg>
    ),
    skills: ["Flutter UI", "Figma", "Responsive Design", "Animations", "Custom Components", "Material 3"],
  },
  {
    number: "03",
    title: "Backend Integration",
    badge: "Data That Works",
    descKey: "card3Desc" as const,
    image: "/databaseolddesign.png",
    icon: (
      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-stone-200 bg-white shadow-xs text-[11px] font-sans font-medium uppercase tracking-wider text-stone-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="font-editorial text-5xl sm:text-6xl text-[var(--text-primary)] tracking-tight leading-none">
            <CursorRepulsionText text="What I" className="inline-block" />{" "}
            <span className="font-editorial-italic font-normal inline-block">
              <CursorRepulsionText text="Build" className="inline-block" />
            </span>
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
              className="bg-white border border-stone-200/90 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200 relative overflow-hidden group"
            >
              <div>
                {/* Top Header Row */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="w-11 h-11 rounded-2xl border border-stone-200 bg-white flex items-center justify-center p-2.5 shadow-xs text-black">
                    {card.icon}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-200 bg-stone-50/70 text-[10px] font-sans font-medium text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    <span className="text-left">
                      {card.badge.split(", ")[0]}
                      <br className="sm:hidden" />
                      {card.badge.split(", ")[1] ? ` ${card.badge.split(", ")[1]}` : ""}
                    </span>
                  </div>
                </div>
                {/* Center Blueprint Image */}
                <div className="h-48 rounded-2xl bg-white border border-dashed border-stone-200/90 relative overflow-hidden mb-6 select-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Bottom Textual Meta */}
                <div className="text-left">
                  <span className="text-xs font-mono text-stone-400 font-medium block mb-1">{card.number}</span>
                  <h3 className="text-xl font-bold text-[#111113] tracking-tight">{card.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed font-normal">{t(card.descKey)}</p>
                </div>
                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5 text-left">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full border border-stone-200 bg-stone-50/80 text-[11px] font-sans font-medium text-stone-700"
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
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium bg-white border border-stone-200 text-stone-800 flex items-center gap-2 shadow-xs cursor-default hover:border-stone-400 transition-colors whitespace-nowrap"
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