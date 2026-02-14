"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";

type Skill = {
  name: string;
  icon: any;
};

type SkillCategory = {
  title: string;
  icon: any;
  skills: Skill[];
};

const PRIMARY = "#475AD7";
const FlutterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 3L4 13L7 16L20 3H14Z"
      fill={PRIMARY}
    />
    <path
      d="M7 16L11 20L20 11H14L7 16Z"
      fill={PRIMARY}
    />
  </svg>
);
const skillData: SkillCategory[] = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", icon: FlutterIcon }, // same color as rest (not special blue)
      { name: "Dart Programming Language", icon: Code2 },
      { name: "Theming (Dark & Light)", icon: Palette },
      { name: "Custom Animations", icon: Zap },
      { name: "Adaptive & Responsive UI Design", icon: Layers },
      { name: "Deep Links (Android & iOS)", icon: Link2 },
      { name: "App Publishing (Google Play & App Store)", icon: UploadCloud },
    ],
  },
  {
    title: "Architecture & Tools",
    icon: Layers,
    skills: [
      { name: "Clean Architecture & MVVM", icon: Layers },
      { name: "State Management (BLoC, Provider)", icon: Cpu },
      { name: "SOLID Principles & OOP", icon: Code2 },
      { name: "Dependency Injection (GetIt / Injectable)", icon: Wrench },
      { name: "Collaboration Tools (Figma, Trello, Slack)", icon: Globe },
      { name: "Git / GitHub", icon: GitBranch },
    ],
  },
  {
    title: "API & Services",
    icon: Server,
    skills: [
      { name: "REST APIs & Dio", icon: Server },
      { name: "Secure Storage (Hive / Shared Preferences) & Encryption", icon: Lock },
      { name: "Authentication (OAuth 2.0, Token-Based, Google & Apple Sign-In)", icon: Shield },
      { name: "Firebase Suite (Auth, Firestore, Analytics, Crashlytics)", icon: Database },
      { name: "Push Notifications", icon: Bell },
    ],
  },
  {
    title: "AI & Realtime",
    icon: Brain,
    skills: [
      { name: "Integrate with AI APIs & Models", icon: Brain },
      { name: "Pusher", icon: Zap },
      { name: "Real-time Data", icon: Server },
      { name: "Smart AI Assistance Chat", icon: Brain },
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

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-28 px-6 lg:px-20 max-w-7xl mx-auto"
    >


      {/* MAIN GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          relative rounded-[32px]
          border border-white/10
          backdrop-blur-2xl
          bg-white/[0.03]
          overflow-hidden
          p-8 lg:p-12
        "
      >
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-5xl font-bold mb-16 text-white text-center"
        >
          Skills & Technologies
        </motion.h2>
        {/* GLOBAL GRADIENT GLOW */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, ${PRIMARY}33, transparent 60%),
              radial-gradient(circle at 80% 70%, ${PRIMARY}22, transparent 60%)
            `,
          }}
        />

        {/* GRID COLUMNS */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {skillData.map((category, index) => {
            const TitleIcon = category.icon;

            return (
              <div key={index} className="flex flex-col">
                {/* TITLE CARD (ONE ROW + ICON) */}
                <div
                  className="
                    mb-6
                    px-5 py-4
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    backdrop-blur-xl
                    flex items-center gap-3
                    whitespace-nowrap
                    overflow-hidden
                  "
                  style={{
                    boxShadow: `0 8px 30px ${PRIMARY}22`,
                  }}
                >
                  <TitleIcon
                    size={22}
                    style={{ color: PRIMARY }}
                    className="shrink-0"
                  />

                  <h3
                    className="
                      text-lg lg:text-xl
                      font-bold
                      text-transparent bg-clip-text
                      truncate
                    "
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${PRIMARY}, #6B7CFF)`,
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* SKILLS LIST (NO BOXES) */}
                <div className="space-y-4 pl-1">
                  {category.skills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={i}
                        className="
                          flex items-start gap-3
                          text-gray-300
                          text-base lg:text-lg
                          leading-relaxed
                          transition-all duration-300
                          hover:text-white
                        "
                      >
                        {/* ICON (UNIFIED COLOR INCLUDING FLUTTER) */}
                        <Icon
                          size={20}
                          className="mt-[3px] shrink-0"
                          style={{ color: PRIMARY }}
                        />

                        <span className="font-medium">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
