"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const CERTIFICATIONS = [
  {
    icon: "flutter",
    title: "Flutter Development",
    issuer: "Google (Coursera)",
    year: "2023",
    desc: "Build high-quality cross-platform apps with Flutter.",
    tags: ["Flutter", "Dart", "Mobile Development"],
    certType: "Professional Certificate",
    certName: "Flutter Development",
  },
  {
    icon: "ml",
    title: "Machine Learning with TensorFlow",
    issuer: "DeepLearning.AI (Coursera)",
    year: "2024",
    desc: "Learn and apply machine learning concepts using TensorFlow.",
    tags: ["TensorFlow", "Machine Learning", "AI"],
    certType: "Specialization",
    certName: "TensorFlow in Practice",
  },
  {
    icon: "dart",
    title: "Programming in Dart",
    issuer: "Meta (Coursera)",
    year: "2023",
    desc: "Learn the fundamentals of Dart programming for Flutter development.",
    tags: ["Dart", "Programming", "Mobile"],
    certType: "Course Certificate",
    certName: "Programming in Dart",
  },
  {
    icon: "udemy",
    title: "Mobile App Development",
    issuer: "Udemy",
    year: "2022",
    desc: "Hands-on projects and real-world mobile app development.",
    tags: ["Flutter", "UI/UX", "State Management"],
    certType: "Course",
    certName: "Mobile App Development",
  },
];

const KEY_AREAS = [
  "Data Structures & Algorithms",
  "Software Engineering",
  "Operating Systems",
  "Computer Networks",
  "Databases",
  "Human-Computer Interaction",
];

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
  switch (type) {
    case "flutter":
      return (
        <svg className="w-5 h-5 text-black fill-current" viewBox="0 0 24 24">
          <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4zm0 9.292L7.714 15.893 11.414 19.6l6.6-6.6-3.7-3.708zm0 7.422l-2.286 2.286L14.314 21.3 20.3 15.3l-2.286-2.286-3.7 3.7z" />
        </svg>
      );
    case "ml":
      return (
        <svg className="w-5 h-5 fill-current text-amber-600" viewBox="0 0 24 24">
          <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.2l7.5 4.1L12 12.4 4.5 8.3 12 4.2zm-8 5.6l7 3.8v7.4l-7-3.8V9.8zm9 11.2v-7.4l7-3.8v7.4l-7 3.8z" />
        </svg>
      );
    case "dart":
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2 text-purple-600" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
        </svg>
      );
    default:
      return <span className="text-emerald-700 font-black font-serif text-base">U</span>;
  }
}

function IconBg({ type }: { type: string }) {
  const bgMap: Record<string, string> = {
    flutter: "bg-blue-50/50 text-stone-900",
    ml: "bg-amber-500/10 text-amber-600",
    dart: "bg-purple-50 text-purple-600",
    udemy: "bg-emerald-50 text-emerald-700",
  };
  return (
    <div className={`w-10 h-10 rounded-xl border border-stone-200 ${bgMap[type]} flex items-center justify-center p-2 shrink-0`}>
      <CertIcon type={type} />
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
        <div className="hidden lg:flex flex-col items-start absolute -top-4 left-0 select-none pointer-events-none text-stone-500 z-10">
          <div className="text-xs font-mono tracking-tight leading-snug rotate-[-5deg] text-stone-500/90 font-medium">
            Knowledge today,<br />better products tomorrow.
          </div>
          <svg className="w-8 h-10 text-stone-400 mt-1 ml-6 rotate-[-10deg]" fill="none" stroke="currentColor" viewBox="0 0 36 48">
            <path d="M10 2 C6 18, 14 30, 24 40" strokeDasharray="2 2" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M18 39 L24 41 L25 34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Handwritten annotation top right */}
        <div className="hidden lg:flex flex-col items-end absolute -top-4 right-0 select-none pointer-events-none text-stone-500 z-10">
          <div className="text-xs font-mono tracking-tight text-right leading-snug rotate-[5deg] text-stone-500/90 font-medium">
            Continuous learning<br />for what&apos;s next.
          </div>
          <svg className="w-8 h-10 text-stone-400 mt-1 mr-6 rotate-[10deg]" fill="none" stroke="currentColor" viewBox="0 0 36 48">
            <path d="M26 2 C30 18, 22 30, 12 40" strokeDasharray="2 2" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M18 39 L12 41 L11 34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Central Header Content */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-stone-200 bg-white shadow-xs text-[11px] font-sans font-medium uppercase tracking-wider text-stone-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[var(--text-primary)] tracking-tight leading-none">
            {t("title")}{" "}
            <span className="font-editorial-italic font-normal">{t("titleItalic")}</span>
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
              <div className="w-10 h-10 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-center p-2 text-stone-800 shadow-xs">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="text-[11px] font-mono text-stone-400 font-medium tracking-wide">
                2018 - 2022 / UNDERGRADUATE DEGREE
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-[10px] font-mono font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{t("completed")}</span>
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                {t("degreeTitle")}
              </h3>
              <p className="text-xs font-medium text-stone-500 mt-1 mb-4">{t("university")}</p>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal mb-8">
                {t("degreeDesc")}
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block mb-3">
                {t("keyAreas")}
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {KEY_AREAS.slice(0, 3).map((area) => (
                    <span key={area} className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50/70 text-[11px] font-sans font-medium text-stone-700">
                      {area}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {KEY_AREAS.slice(3).map((area) => (
                    <span key={area} className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50/70 text-[11px] font-sans font-medium text-stone-700">
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
              {t("certifications")}
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-400">
              <span className="w-8 h-[1px] bg-stone-300 inline-block" />
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
                className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <IconBg type={cert.icon} />
                  <div className="text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{cert.title}</h4>
                      <span className="text-xs text-stone-500 font-normal">
                        {cert.issuer} · {cert.year}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 mb-2.5 font-normal">{cert.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md border border-stone-200 bg-stone-50 text-[10px] font-sans text-stone-600 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-36 h-20 rounded-lg border border-stone-200 bg-stone-50/70 p-2 flex flex-col justify-between shrink-0 shadow-xs hover:border-stone-400 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-stone-800 tracking-tight font-sans">
                      {cert.issuer.split(" ")[0]}
                    </span>
                    <svg className="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" x2="21" y1="14" y2="3" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[7.5px] uppercase font-mono text-stone-400 leading-none">{cert.certType}</div>
                    <div className="text-[8.5px] font-bold text-stone-700 leading-tight">{cert.certName}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-[1px] bg-stone-300" />
                    <div className="w-8 h-[1px] bg-stone-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Beyond the Classroom */}
      <div className="pt-10 border-t border-stone-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          <div className="lg:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block mb-1">
              {t("beyondClassroom")}
            </span>
            <h3 className="font-editorial text-2xl text-[var(--text-primary)] leading-snug">
              {t("beyondTitle")}
            </h3>
          </div>
          {BEYOND_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-1">
              <div className="w-7 h-7 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-700 mb-1 shadow-xs">
                <BeyondIcon type={item.icon} />
              </div>
              <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.title}</h4>
              <p className="text-[11px] text-stone-500 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
