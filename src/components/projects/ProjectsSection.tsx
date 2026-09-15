"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import SectionWrapper from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    key: "mind_trip",
    slug: "mindtrip",
    name: "MindTrip",
    eyebrow: "AI Travel Platform",
    tags: "FLUTTER · AI APIs · MAPS · CLEAN ARCH",
    accent: "#5596FE",
    accentLight: "rgba(85,150,254,0.12)",
    accentBorder: "rgba(85,150,254,0.25)",
    image: "/projects/MindTrip/mindtrip_logo.png",
    stat1Value: "40+",
    stat1Label: "Screens Built",
    stat2Value: "15+",
    stat2Label: "Features Shipped",
    number: "01",
    category: "AI & Travel",
    icon: "compass",
  },
  {
    key: "news_app",
    slug: "news-app",
    name: "Quick Read",
    eyebrow: "Mobile Application",
    tags: "FLUTTER · BLOC · HIVE · OFFLINE-FIRST",
    accent: "#475AD7",
    accentLight: "rgba(71,90,215,0.12)",
    accentBorder: "rgba(71,90,215,0.25)",
    image: "/projects/news/quick_read_logo.png",
    stat1Value: "9+",
    stat1Label: "Screens",
    stat2Value: "10+",
    stat2Label: "Features",
    number: "02",
    category: "News & Media",
    icon: "newspaper",
  },
  {
    key: "book_reading_app",
    slug: "book-reading-app",
    name: "TinyShelf",
    eyebrow: "Reading Product",
    tags: "FLUTTER · SUPABASE · CUBIT · CLOUD SYNC",
    accent: "#E06C75",
    accentLight: "rgba(224,108,117,0.12)",
    accentBorder: "rgba(224,108,117,0.25)",
    image: "/projects/book_reading/TinyShelf_logo.png",
    stat1Value: "8+",
    stat1Label: "Screens",
    stat2Value: "15+",
    stat2Label: "Technologies",
    number: "03",
    category: "Books & Reading",
    icon: "book",
  },
  {
    key: "tasky",
    slug: "tasky",
    name: "Tasky",
    eyebrow: "Productivity App",
    tags: "FLUTTER · HYDRATED BLOC · GOROUTER · CLEAN ARCH",
    accent: "#15B86C",
    accentLight: "rgba(21,184,108,0.12)",
    accentBorder: "rgba(21,184,108,0.25)",
    image: "/projects/tasky/tasky_logo.png",
    stat1Value: "7",
    stat1Label: "Screens",
    stat2Value: "10",
    stat2Label: "Technologies",
    number: "04",
    category: "Productivity",
    icon: "check-circle",
  },
];

export default function ProjectsSection() {

  return (
    <SectionWrapper id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-stone-200/80 bg-white/90 dark:border-[var(--border-subtle)] dark:bg-[var(--surface-solid)] shadow-xs text-[11px] font-mono uppercase tracking-widest text-stone-600 dark:text-[var(--text-muted)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Selected Case Studies</span>
          </div>
          <h2 className="font-editorial text-5xl sm:text-7xl text-[var(--text-primary)] tracking-tight">
            <CursorRepulsionText text="Projects I've" className="inline-block" />{" "}
            <span className="font-editorial-italic font-normal inline-block"><CursorRepulsionText text="built." className="inline-block" /></span>
          </h2>
          <p className="text-stone-500 dark:text-[var(--text-muted)] text-sm sm:text-base mt-3 max-w-lg mx-auto leading-relaxed">
            Production software serving thousands of daily active users across iOS and Android.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group mb-12 rounded-[2.5rem] bg-white border border-[#E6E6EA] dark:bg-[var(--surface-solid)] dark:border-[var(--border-subtle)] p-3 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] bg-white overflow-hidden border border-stone-100 dark:border-[var(--border-subtle)]"
              >
                {/* Left Column - Project Data */}
                <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl border shadow-xs flex items-center justify-center p-2.5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: project.accentLight,
                            borderColor: project.accentBorder,
                            color: project.accent,
                          }}
                        >
                          <ProjectIcon icon={project.icon} />
                        </div>
                        <div>
                          <span
                            className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold"
                            style={{
                              background: project.accentLight,
                              color: project.accent,
                              border: `1px solid ${project.accentBorder}`,
                            }}
                          >
                            {project.eyebrow}
                          </span>
                          <span className="text-stone-400 dark:text-[var(--text-muted)] text-xs font-mono ml-2">{project.category}</span>
                        </div>
                      </div>
                      <span
                        className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
                        style={{
                          color: project.accent,
                          background: project.accentLight,
                          borderColor: project.accentBorder,
                        }}
                      >
                        {project.number} / {project.category}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                      {project.name}
                    </h3>

                    <p className="text-stone-600 dark:text-[var(--text-soft)] text-sm sm:text-base leading-relaxed mb-6">
                      {project.tags}
                    </p>

                    {/* Metrics bar */}
                    <div className="grid grid-cols-2 gap-4 py-5 border-y border-stone-200/60 dark:border-[var(--border-subtle)] my-6 bg-white dark:bg-[var(--surface-solid)] rounded-2xl px-5 shadow-xs">
                      <div>
                        <div
                          className="text-2xl sm:text-3xl font-bold font-mono tracking-tight"
                          style={{ color: project.accent }}
                        >
                          {project.stat1Value}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-[var(--text-muted)] font-sans mt-0.5">{project.stat1Label}</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-[var(--text-primary)] font-mono tracking-tight">
                          {project.stat2Value}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-[var(--text-muted)] font-sans mt-0.5">{project.stat2Label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--text-primary)] hover:opacity-90 hover:shadow-md text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-sm group/btn"
                    >
                      <span>View Case Breakdown</span>
                      <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                    <span className="text-xs text-stone-400 dark:text-[var(--text-muted)] font-mono">iOS & Android</span>
                  </div>
                </div>

                {/* Right Visual - Logo Background */}
                <div className="lg:col-span-5 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProjectIcon({ icon }: { icon: string }) {
  const className = "w-6 h-6";
  const props = { className, fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 2 };

  switch (icon) {
    case "compass":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "newspaper":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M2 9h20" />
          <path d="M10 3l-2 6 4 12 4-12-2-6" />
        </svg>
      );
  }
}
