"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    key: "mind_trip",
    slug: "mindtrip",
    name: "MindTrip",
    eyebrow: "AI Travel Platform",
    tags: ["FLUTTER", "AI APIs", "MAPS", "CLEAN ARCH"],
    accent: "#5596FE",
    accentBg: "rgba(85,150,254,0.15)",
    accentBorder: "rgba(85,150,254,0.3)",
    image: "/projects/MindTrip/2D_preview/cover.png",
    logo: "/projects/MindTrip/2D_preview/cover.png",
    stat1Value: "40+",
    stat1Label: "Screens Built",
    stat2Value: "15+",
    stat2Label: "Features Shipped",
  },
  {
    key: "news_app",
    slug: "news-app",
    name: "Quick Read",
    eyebrow: "News Product",
    tags: ["FLUTTER", "BLOC", "OFFLINE-FIRST", "REST API"],
    accent: "#475AD7",
    accentBg: "rgba(71,90,215,0.15)",
    accentBorder: "rgba(71,90,215,0.3)",
    image: "/projects/news/cover.png",
    logo: "/projects/news/cover.png",
    stat1Value: "9+",
    stat1Label: "Screens",
    stat2Value: "10+",
    stat2Label: "Technologies",
  },
  {
    key: "book_reading_app",
    slug: "book-reading-app",
    name: "TinyShelf",
    eyebrow: "Reading Product",
    tags: ["FLUTTER", "SUPABASE", "CUBIT", "CLOUD SYNC"],
    accent: "#E06C75",
    accentBg: "rgba(224,108,117,0.15)",
    accentBorder: "rgba(224,108,117,0.3)",
    image: "/projects/book_reading/2d_preview/home.png",
    logo: "/projects/book_reading/2d_preview/home.png",
    stat1Value: "8+",
    stat1Label: "Screens",
    stat2Value: "15+",
    stat2Label: "Technologies",
  },
  {
    key: "tasky",
    slug: "tasky",
    name: "Tasky",
    eyebrow: "Productivity App",
    tags: ["FLUTTER", "HYDRATED BLOC", "GOROUTER", "CLEAN ARCH"],
    accent: "#15B86C",
    accentBg: "rgba(21,184,108,0.15)",
    accentBorder: "rgba(21,184,108,0.3)",
    image: "/projects/tasky/2D_preview/welcome.png",
    logo: "/projects/tasky/2D_preview/welcome.png",
    stat1Value: "7",
    stat1Label: "Screens",
    stat2Value: "10",
    stat2Label: "Technologies",
  },
];

export default function ProjectsSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id="projects" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-editorial text-4xl sm:text-6xl text-[var(--text-primary)]">
            {t("hero.ctaProjects").includes("Projects")
              ? <>Projects I&apos;ve <span className="font-editorial-italic">built.</span></>
              : t("hero.ctaProjects")}
          </h2>
          <p className="text-sm sm:text-base mt-3" style={{ color: "var(--text-muted)" }}>
            Production software serving thousands of daily active users across iOS and Android.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-14">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl overflow-hidden bg-[#1E122C] text-white border border-stone-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Text Content - Project Data */}
                <div className="p-8 sm:p-12 lg:col-span-6 flex flex-col justify-between">
                  <div>
                    {/* Eyebrow Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase"
                        style={{
                          background: project.accentBg,
                          color: project.accent,
                          border: `1px solid ${project.accentBorder}`,
                        }}
                      >
                        {project.eyebrow}
                      </span>
                    </div>
                    
                    {/* Project Name */}
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                      {project.name}
                    </h3>
                    
                    {/* Tags */}
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                      {project.tags.join(" · ")}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 my-6">
                      <div>
                        <div className="text-2xl font-bold font-mono" style={{ color: project.accent }}>
                          {project.stat1Value}
                        </div>
                        <div className="text-xs text-stone-400">{project.stat1Label}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white font-mono">{project.stat2Value}</div>
                        <div className="text-xs text-stone-400">{project.stat2Label}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-5 py-2.5 rounded-full bg-white text-stone-950 font-medium text-xs hover:bg-stone-200 transition-colors"
                    >
                      View Case Breakdown
                    </Link>
                    <span className="text-xs text-stone-400 font-mono">iOS & Android</span>
                  </div>
                </div>

                {/* Visual Preview Side - Full theme background with logo */}
                <div
                  className="lg:col-span-6 p-8 sm:p-12 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}66, ${project.accent}33)`,
                  }}
                >
                  {/* Background pattern with accent color */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 30%, ${project.accent}40 0%, transparent 50%),
                                        radial-gradient(circle at 80% 70%, ${project.accent}30 0%, transparent 50%)`,
                    }}
                  />
                  
                  {/* Logo/Cover Image */}
                  <div className="relative z-10 w-full max-w-xs">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-2"
                      style={{ borderColor: `${project.accent}60` }}
                    >
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 300px"
                      />
                    </div>
                    
                    {/* Project name overlay */}
                    <div className="mt-4 text-center">
                      <span className="text-white font-bold text-lg tracking-wide">{project.name}</span>
                      <span className="block text-white/70 text-xs mt-1 font-mono">{project.eyebrow}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
