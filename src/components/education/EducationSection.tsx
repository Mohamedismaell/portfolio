"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";

const DEGREE = {
  period: "2022 — 2026",
  type: "BACHELOR'S DEGREE",
  title: "B.Sc. Computer Science",
  university: "Suez Canal University",
  desc: "Studied computer science fundamentals with a focus on software development, problem solving, algorithms, and building practical applications through hands-on projects.",
  keyAreas: [
    "Software Development",
    "Object Oriented Programming",
    "Algorithms & Data Structures",
    "Database Systems",
    "Computer Networks",
    "Operating Systems",
  ],
};

const CERTIFICATIONS = [
  {
    icon: "udemy",
    title: "Flutter & Dart - The Complete Guide",
    issuer: "Udemy (Academind)",
    year: "Dec 2025",
    hours: "30h",
    desc: "Comprehensive Flutter & Dart course covering widgets, state management, animations, and full app development.",
    tags: ["Flutter", "Dart", "Widgets", "State Management"],
    image: "/cert1.png",
    link: "https://drive.google.com/file/d/1D-pKCBOuh6sPcIYiSiKzfqmHG3DSufVQ/view",
  },
  {
    icon: "flutter",
    title: "Flutter Master Course",
    issuer: "Eng. Usama Elgendy",
    year: "Jul 2026",
    hours: "50h",
    desc: "Advanced Flutter development course with Google & Flutter technologies, covering production-grade apps.",
    tags: ["Flutter", "Advanced", "Production Apps", "Google"],
    image: "/cert2.png",
    link: "https://drive.google.com/file/d/1clJA7BAnfJuweim6HU_NzwCXkOyMMSX7/view",
  },
  {
    icon: "dart",
    title: "Dart Programming & OOP",
    issuer: "Eng. Usama Elgendy",
    year: "Jul 2026",
    hours: "25h",
    desc: "Deep dive into Dart programming language fundamentals and object-oriented programming concepts.",
    tags: ["Dart", "OOP", "Programming", "Google"],
    image: "/cert3.png",
    link: "https://drive.google.com/file/d/1Rm8ZR6EHXjW_Q2xlMUpvZpRTZ2boSkqT/view",
  },
  {
    icon: "iti",
    title: "Frontend Web Development",
    issuer: "Information Technology Institute",
    year: "Jul 2025",
    hours: "120h",
    desc: "Intensive frontend development training covering HTML, CSS, JavaScript, jQuery, Sass, and responsive design.",
    tags: ["HTML", "CSS", "JavaScript", "jQuery", "Sass", "Responsive"],
    image: "/cert4.png",
    link: "https://drive.google.com/file/d/11juAyk4SnoBFpa3kyFUFN8bAN6omWUAu/view",
  },
];

const KEY_AREAS = DEGREE.keyAreas;

const BEYOND_ITEMS = [
  {
    icon: "book",
    title: "Online Courses",
    desc: "Continuously learning new technologies and best practices.",
  },
  {
    icon: "code",
    title: "Hands-on Projects",
    desc: "Applying knowledge through real-world applications.",
  },
  {
    icon: "community",
    title: "Communities",
    desc: "Being part of developer communities and sharing ideas.",
  },
  {
    icon: "trend",
    title: "What's Next",
    desc: "Keep learning, keep building, keep improving.",
  },
];

function CertIcon({ type }: { type: string }) {
  const iconMap: Record<string, string> = {
    flutter: "/icons/icon-flutter.svg",
    dart: "/icons/icon-dart.svg",
    iti: "/icons/icon-iti.svg",
    udemy: "/icons/icon-udemy.svg",
  };
  const bgMap: Record<string, string> = {
    flutter: "bg-[#027DFD]/10",
    dart: "bg-[#00B4AB]/10",
    iti: "bg-[#006DF0]/10",
    udemy: "bg-[#A435F0]/10",
  };
  return (
    <div className={`w-10 h-10 rounded-xl border border-stone-200 ${bgMap[type]} flex items-center justify-center shrink-0`}>
      <img src={iconMap[type]} alt="" className="w-6 h-6 object-contain" />
    </div>
  );
}

function BeyondIcon({ type }: { type: string }) {
  switch (type) {
    case "book":
      return (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "community":
      return (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
  }
}

export default function EducationSection() {
  const t = useTranslations("education");

  return (
    <section className="py-24 max-w-6xl mx-auto" id="education">
      {/* Top Annotations & Section Header */}
      <div className="relative mb-14">
        {/* Handwritten annotation top left */}
        <div className="hidden lg:flex flex-col items-start absolute -top-4 left-0 select-none pointer-events-none text-stone-500 dark:text-[var(--text-muted)] z-10">
          <div className="text-xs font-mono tracking-tight leading-snug rotate-[-5deg] text-stone-500/90 dark:text-[var(--text-muted)]/90 font-medium">
            Knowledge today,<br />better products tomorrow.
          </div>
          <svg className="w-8 h-10 text-stone-400 dark:text-[var(--text-muted)] mt-1 ml-6 rotate-[-10deg]" fill="none" stroke="currentColor" viewBox="0 0 36 48">
            <path d="M10 2 C6 18, 14 30, 24 40" strokeDasharray="2 2" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M18 39 L24 41 L25 34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Handwritten annotation top right */}
        <div className="hidden lg:flex flex-col items-end absolute -top-4 right-0 select-none pointer-events-none text-stone-500 dark:text-[var(--text-muted)] z-10">
          <div className="text-xs font-mono tracking-tight text-right leading-snug rotate-[5deg] text-stone-500/90 dark:text-[var(--text-muted)]/90 font-medium">
            Continuous learning<br />for what&apos;s next.
          </div>
          <svg className="w-8 h-10 text-stone-400 dark:text-[var(--text-muted)] mt-1 mr-6 rotate-[10deg]" fill="none" stroke="currentColor" viewBox="0 0 36 48">
            <path d="M26 2 C30 18, 22 30, 12 40" strokeDasharray="2 2" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M18 39 L12 41 L11 34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Central Header Content */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-stone-200 bg-white shadow-xs text-[11px] font-sans font-medium uppercase tracking-wider text-stone-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[var(--text-primary)] tracking-tight leading-none">
            <CursorRepulsionText text="Education &" className="inline-block" />{" "}
            <span className="font-editorial-italic font-normal inline-block"><CursorRepulsionText text="Certifications." className="inline-block" /></span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 leading-relaxed">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 bg-white border border-stone-200/90 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl border border-stone-200 bg-white flex items-center justify-center p-2 text-stone-700 shadow-xs">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="text-[11px] font-mono text-stone-400 dark:text-[var(--text-muted)] font-medium tracking-wide">
                {DEGREE.period} / {DEGREE.type}
              </span>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-medium text-emerald-700"
                style={{ borderColor: "var(--border-subtle)", background: "var(--background-secondary)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{t("completed")}</span>
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                {DEGREE.title}
              </h3>
              <p className="text-xs font-medium text-stone-500 dark:text-[var(--text-muted)] mt-1 mb-4">{DEGREE.university}</p>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal mb-8">
                {DEGREE.desc}
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-[var(--text-muted)] font-semibold block mb-3">
                {t("keyAreas")}
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {KEY_AREAS.slice(0, 3).map((area) => (
                    <span key={area} className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50/80 text-[11px] font-sans font-medium text-stone-700">
                      {area}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {KEY_AREAS.slice(3).map((area) => (
                    <span key={area} className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50/80 text-[11px] font-sans font-medium text-stone-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Certifications Stack */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 dark:text-[var(--text-muted)] font-semibold">
              {t("certifications")}
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-[var(--text-muted)]">
              <span className="w-8 h-[1px] bg-stone-300 dark:bg-[var(--border-subtle)] inline-block" />
              <span>{t("keepLearning")}</span>
            </div>
          </div>
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <CertIcon type={cert.icon} />
                  <div className="text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{cert.title}</h4>
                      <span className="text-xs text-stone-500 dark:text-[var(--text-muted)] font-normal">
                        {cert.issuer} · {cert.year}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-[var(--text-soft)] mt-1 mb-2.5 font-normal">{cert.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md border border-stone-200 bg-stone-50/80 text-[10px] font-sans text-stone-700 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative w-36 h-20 shrink-0">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full rounded-lg border border-stone-200 bg-white p-1 flex items-center justify-center shadow-xs hover:border-stone-300 hover:shadow-sm cursor-pointer transition-all overflow-hidden"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </a>
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-56 h-40 rounded-xl border border-stone-200 bg-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none transition-all duration-300 z-50 overflow-hidden p-1.5">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Beyond the Classroom */}
      <div className="pt-10 border-t border-stone-200 dark:border-[var(--border-subtle)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          <div className="lg:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-[var(--text-muted)] font-semibold block mb-1">
              {t("beyondClassroom")}
            </span>
            <h3 className="font-editorial text-2xl text-[var(--text-primary)] leading-snug">
              {t("beyondTitle")}
            </h3>
          </div>
          {BEYOND_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-1">
              <div className="w-7 h-7 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-600 mb-1 shadow-xs">
                <BeyondIcon type={item.icon} />
              </div>
              <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.title}</h4>
              <p className="text-[11px] text-stone-500 dark:text-[var(--text-muted)] leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
