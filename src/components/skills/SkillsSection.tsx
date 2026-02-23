"use client";

import { motion, Variants } from "framer-motion";
import {
  Smartphone, Code2, Palette, Link2, UploadCloud,
  Layers, GitBranch, Wrench, Database, Shield, Bell,
  Brain, Zap, CreditCard, Map, Navigation, Cpu,
  Lock, Globe, Server,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";
import GradientText from "@/components/ui/GradientText";
import { GRADIENTS, BORDERS, TEXT, SHADOWS } from "@/lib/theme";

// ── Flutter SVG icon ─────────────────────────────────────
const FlutterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 3L4 13L7 16L20 3H14Z" fill="rgba(255,255,255,0.75)" />
    <path d="M7 16L11 20L20 11H14L7 16Z" fill="rgba(255,255,255,0.45)" />
  </svg>
);

// ── Types ────────────────────────────────────────────────
type Skill = { name: string; icon: any };
type SkillCategory = { title: string; icon: any; skills: Skill[] };

// ── Data ─────────────────────────────────────────────────
const skillData: SkillCategory[] = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", icon: FlutterIcon },
      { name: "Dart Programming Language", icon: Code2 },
      { name: "Theming (Dark & Light)", icon: Palette },
      { name: "Custom Animations", icon: Zap },
      { name: "Adaptive & Responsive UI Design", icon: Layers },
      { name: "Deep Links (Android & iOS)", icon: Link2 },
      { name: "App Publishing (Play Store & App Store)", icon: UploadCloud },
    ],
  },
  {
    title: "Architecture & Tools",
    icon: Layers,
    skills: [
      { name: "Clean Architecture & MVVM", icon: Layers },
      { name: "State Management (BLoC, Provider)", icon: Cpu },
      { name: "SOLID Principles & OOP", icon: Code2 },
      { name: "Dependency Injection (GetIt)", icon: Wrench },
      { name: "Collaboration Tools (Figma, Trello)", icon: Globe },
      { name: "Git / GitHub", icon: GitBranch },
    ],
  },
  {
    title: "API & Services",
    icon: Server,
    skills: [
      { name: "REST APIs & Dio", icon: Server },
      { name: "Secure Storage & Encryption", icon: Lock },
      { name: "Auth (OAuth 2.0, Google & Apple)", icon: Shield },
      { name: "Firebase (Auth, Firestore, Analytics)", icon: Database },
      { name: "Push Notifications", icon: Bell },
    ],
  },
  {
    title: "AI & Realtime",
    icon: Brain,
    skills: [
      { name: "AI API & Model Integration", icon: Brain },
      { name: "Pusher", icon: Zap },
      { name: "Real-time Data", icon: Server },
      { name: "Smart AI Chat Assistance", icon: Brain },
      { name: "Smart AI Search", icon: Cpu },
    ],
  },
  {
    title: "Payment Integration",
    icon: CreditCard,
    skills: [
      { name: "Stripe", icon: CreditCard },
      { name: "Opay", icon: CreditCard },
      { name: "In-App Purchase (Google & iOS)", icon: CreditCard },
      { name: "Secure Payment Flows", icon: Shield },
      { name: "Subscription Handling", icon: Layers },
    ],
  },
  {
    title: "Maps & Location",
    icon: Map,
    skills: [
      { name: "Google Maps", icon: Map },
      { name: "Mapbox", icon: Map },
      { name: "Location Services & Geolocator", icon: Navigation },
      { name: "Real-time Tracking", icon: Navigation },
      { name: "Directions / Navigation", icon: Navigation },
    ],
  },
];

// ── Animation variants ───────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};
// ────────────────────────────────────────────────────────

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <SectionBadge label="What I Work With" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-4"
          >
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              Skills & Technologies
            </GradientText>
          </motion.h2>

          <SectionDivider
            delay={0.3}
            className="w-24 mb-5 mx-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ color: TEXT.dim }}
          >
            A full breakdown of the tools, frameworks, and practices
            I use to build production-grade mobile applications.
          </motion.p>
        </div>

        {/* ── Skills grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
        >
          {skillData.map((category, index) => {
            const TitleIcon = category.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: GRADIENTS.solidCard,
                  border: `1px solid ${BORDERS.subtle}`,
                  boxShadow: SHADOWS.card,
                }}
              >
                {/* Category header */}
                <div
                  className="flex items-center gap-3 px-5 py-4 border-b"
                  style={{
                    borderColor: BORDERS.subtle,
                    background: GRADIENTS.cardBg,
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${BORDERS.subtle}`,
                    }}
                  >
                    <TitleIcon size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
                  </div>

                  <GradientText
                    gradient={GRADIENTS.subtext}
                    className="text-sm sm:text-base font-bold tracking-tight truncate"
                  >
                    {category.title}
                  </GradientText>
                </div>

                {/* Skills list */}
                <motion.div
                  variants={containerVariants}
                  className="flex flex-col divide-y px-5 py-2"
                  style={{ borderColor: BORDERS.subtle }}
                >
                  {category.skills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={i}
                        variants={skillVariants}
                        className="flex items-center gap-3 py-3 group transition-all duration-200"
                      >
                        {/* Icon */}
                        <div
                          className="shrink-0 transition-all duration-200"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          {typeof Icon === "function" && Icon.length === 0
                            ? <Icon />
                            : <Icon size={15} />
                          }
                        </div>

                        {/* Skill name */}
                        <span
                          className="text-xs sm:text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-white"
                          style={{ color: TEXT.soft }}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
