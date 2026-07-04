"use client";

import { motion, Variants } from "framer-motion";
import {
  Smartphone,
  Code2,
  Palette,
  Link2,
  UploadCloud,
  Layers,
  GitBranch,
  Wrench,
  Database,
  Shield,
  Bell,
  Brain,
  Zap,
  CreditCard,
  Map,
  Navigation,
  Cpu,
  Lock,
  Globe,
  Server,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FlutterIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 3L4 13L7 16L20 3H14Z" fill="currentColor" opacity={0.9} />
    <path d="M7 16L11 20L20 11H14L7 16Z" fill="currentColor" opacity={0.55} />
  </svg>
);

type Skill = { name: string; icon: any };
type SkillCategory = {
  title: string;
  icon: any;
  color: string;
  skills: Skill[];
};

const skillData: SkillCategory[] = [
  {
    title: "Core",
    icon: Smartphone,
    color: "#ef9d57",
    skills: [
      { name: "Flutter", icon: FlutterIcon },
      { name: "Dart", icon: Code2 },
      { name: "Theming", icon: Palette },
      { name: "Animations", icon: Zap },
    ],
  },
  {
    title: "Architecture",
    icon: Layers,
    color: "#ef9d57",
    skills: [
      { name: "Clean Architecture", icon: Layers },
      { name: "BLoC / Cubit", icon: Cpu },
      { name: "MVVM", icon: Layers },
      { name: "Provider", icon: Code2 },
      { name: "Dependency Injection", icon: Wrench },
    ],
  },
  {
    title: "State & Local",
    icon: Database,
    color: "#ef9d57",
    skills: [
      { name: "Hive", icon: Database },
      { name: "Provider", icon: Cpu },
      { name: "Shared Prefs", icon: Globe },
      { name: "SQLite", icon: Server },
    ],
  },
  {
    title: "Integrations",
    icon: Link2,
    color: "#ef9d57",
    skills: [
      { name: "Firebase", icon: Database },
      { name: "REST APIs", icon: Server },
      { name: "Supabase", icon: Database },
      { name: "Google APIs", icon: Globe },
      { name: "WebSockets", icon: Bell },
    ],
  },
  {
    title: "Platform & Tools",
    icon: Wrench,
    color: "#ef9d57",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GitBranch },
      { name: "Dart Code", icon: Code2 },
      { name: "Figma", icon: Palette },
      { name: "Postman", icon: UploadCloud },
    ],
  },
  {
    title: "Advanced",
    icon: Brain,
    color: "#ef9d57",
    skills: [
      { name: "AI APIs", icon: Brain },
      { name: "Real-time Data", icon: Zap },
      { name: "Search & Filters", icon: Cpu },
      { name: "Analytics", icon: Database },
      { name: "Geo-features", icon: Map },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="rounded-[28px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,248,238,0.92) 0%, rgba(255,252,247,0.84) 100%)",
            border: "1px solid rgba(234, 216, 194, 0.7)",
            boxShadow: "0 16px 38px rgba(32,24,14,0.04)",
          }}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p
                className="text-[11px] sm:text-[12px] font-[800] uppercase tracking-[0.08em]"
                style={{ color: "#ef9d57" }}
              >
                Tech Stack
              </p>

              <h2
                className="mt-1 text-[1.95rem] sm:text-[2.2rem] lg:text-[2.55rem] font-[800] leading-[0.96] tracking-[-0.06em]"
                style={{ color: "var(--text-primary)" }}
              >
                Technologies I Use
              </h2>
            </div>

            {/* <Link
              href="#"
              className="inline-flex h-[38px] items-center gap-2 rounded-full px-4 text-[12px] font-[700] transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.88)",
                border: "1px solid rgba(231, 212, 188, 0.72)",
                color: "var(--text-primary)",
                boxShadow: "0 8px 18px rgba(32,24,14,0.03)",
              }}
            >
              <span>View all technologies</span>
              <ArrowRight size={14} style={{ color: "#ef9d57" }} />
            </Link> */}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {skillData.map((category, index) => {
              const TitleIcon = category.icon;

              return (
                <motion.div
                  key={category.title + index}
                  variants={cardVariants}
                  className="rounded-[20px] px-4 py-4 sm:px-5 sm:py-5"
                  style={{
                    background: "#fffdf9",
                    border: "1px solid rgba(231, 212, 188, 0.72)",
                    boxShadow: "0 10px 24px rgba(32,24,14,0.035)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
                      style={{
                        background:
                          "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                        color: "#fffaf4",
                        boxShadow: "0 8px 16px rgba(239,157,87,0.18)",
                      }}
                    >
                      <TitleIcon size={16} strokeWidth={2.2} />
                    </span>

                    <h3
                      className="text-[14px] sm:text-[15px] font-[800] tracking-[-0.03em]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {category.title}
                    </h3>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {category.skills.map((skill, i) => {
                      const Icon = skill.icon;

                      return (
                        <motion.div
                          key={skill.name + i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.05 + i * 0.04,
                            duration: 0.28,
                          }}
                          className="flex items-center gap-2.5"
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{
                              background: "rgba(239,157,87,0.10)",
                              color: category.color,
                            }}
                          >
                            <Icon size={11} />
                          </span>

                          <span
                            className="text-[13px] sm:text-[13.5px] font-[600] leading-[1.45]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}