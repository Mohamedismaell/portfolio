"use client";

import { motion, Variants } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import {
  ArrowRight,
  Github,
  Check,
  Plane,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" as const },
  },
};

function getCaseStudyHref(slug: string) {
  return `/en/projects/${slug}`;
}

function getProjectIcon(slug: string) {
  if (slug.toLowerCase().includes("trip")) return Plane;
  if (slug.toLowerCase().includes("read")) return BookOpen;
  return CheckCircle2;
}

export default function ProjectsSection() {
  const projects = Object.values(projectsMap);

  return (
    <SectionWrapper id="projects" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="rounded-[30px] px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,248,238,0.96) 0%, rgba(255,252,247,0.90) 100%)",
            border: "1px solid rgba(234, 216, 194, 0.78)",
            boxShadow: "0 18px 40px rgba(32,24,14,0.045)",
          }}
        >
          <div className="mb-4 flex items-start justify-between gap-4 px-1 sm:px-2">
            <div>
              <p
                className="text-[10px] sm:text-[11px] font-[800] uppercase tracking-[0.1em]"
                style={{ color: "#ef9d57" }}
              >
                Featured Projects
              </p>

              <h2
                className="mt-1 text-[1.75rem] sm:text-[2rem] lg:text-[2.35rem] font-[800] leading-[0.98] tracking-[-0.06em]"
                style={{ color: "var(--text-primary)" }}
              >
                My Recent Work
              </h2>
            </div>

            <Link
              href="/en/projects"
              className="inline-flex h-[36px] items-center gap-2 rounded-full px-4 text-[11px] sm:text-[12px] font-[700] transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(231, 212, 188, 0.78)",
                color: "var(--text-primary)",
                boxShadow: "0 8px 18px rgba(32,24,14,0.03)",
              }}
            >
              <span>View all projects</span>
              <ArrowRight size={14} style={{ color: "#ef9d57" }} />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col"
          >
            {projects.map((project: any, index: number) => {
              const highlights = (project.highlights || []).slice(0, 4);
              const tech = (project.tech || []).slice(0, 5);
              const caseStudyHref = getCaseStudyHref(project.slug);
              const githubHref = project.github || null;
              const liveHref = project.googlePlay || project.appStore || caseStudyHref;
              const Icon = getProjectIcon(project.slug);

              return (
                <motion.article
                  key={project.slug}
                  variants={cardVariants}
                  className={[
                    "relative px-2 py-4 sm:px-3 sm:py-5",
                    index !== projects.length - 1
                      ? "border-b border-[rgba(231,212,188,0.72)]"
                      : "",
                  ].join(" ")}
                >
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_minmax(0,1fr)_320px] lg:gap-5">
                    <div className="overflow-hidden rounded-[18px]">
                      <div
                        className="relative aspect-[1.18/1] overflow-hidden rounded-[18px]"
                        style={{
                          background:
                            "linear-gradient(180deg, #f7efe5 0%, #f2e5d5 100%)",
                          boxShadow: "0 10px 24px rgba(32,24,14,0.05)",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority={false}
                          className="object-cover object-center"
                        />

                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(15,10,6,0.04) 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="flex min-w-0 flex-col justify-between py-1 lg:pr-5"
                      style={{
                        borderRight: "1px solid rgba(231, 212, 188, 0.72)",
                      }}
                    >
                      <div>
                        <div className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
                            style={{
                              background:
                                "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                              color: "#fffaf4",
                              boxShadow: "0 10px 18px rgba(239,157,87,0.16)",
                            }}
                          >
                            <Icon size={16} strokeWidth={2.3} />
                          </span>

                          <div className="min-w-0">
                            <h3
                              className="text-[1.15rem] sm:text-[1.35rem] font-[800] leading-[1.02] tracking-[-0.05em]"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {project.title}
                            </h3>

                            <p
                              className="mt-1 text-[11px] sm:text-[12px] font-[600]"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {project.role}
                            </p>
                          </div>
                        </div>

                        <p
                          className="mt-3 text-[12px] sm:text-[13px] font-[500] leading-[1.78]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {project.shortDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {tech.map((item: string) => (
                            <span
                              key={item}
                              className="rounded-full px-3 py-1.5 text-[10px] sm:text-[10.5px] font-[700]"
                              style={{
                                background: "#fffaf4",
                                border: "1px solid rgba(231, 212, 188, 0.76)",
                                color: "#3b3229",
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col justify-between py-1 lg:pl-1">
                      <ul className="flex flex-col gap-2.5">
                        {highlights.map((item: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-[11.5px] sm:text-[12.5px] font-[600] leading-[1.55]"
                            style={{ color: "var(--text-primary)" }}
                          >
                            <span
                              className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                              style={{
                                background: "rgba(239,157,87,0.10)",
                                color: "#ef9d57",
                              }}
                            >
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap items-center gap-2 justify-start lg:justify-start">
                        <a
                          href={liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-[34px] items-center gap-1.5 rounded-[11px] px-3.5 text-[11px] font-[700] transition-transform duration-300 hover:-translate-y-0.5"
                          style={{
                            background: "rgba(255,255,255,0.94)",
                            border: "1px solid rgba(231, 212, 188, 0.78)",
                            color: "var(--text-primary)",
                            boxShadow: "0 8px 16px rgba(32,24,14,0.03)",
                          }}
                        >
                          <span>Live Demo</span>
                          <ArrowRight size={13} style={{ color: "#ef9d57" }} />
                        </a>

                        <Link
                          href={caseStudyHref}
                          className="inline-flex h-[34px] items-center gap-1.5 rounded-[11px] px-3.5 text-[11px] font-[700] transition-transform duration-300 hover:-translate-y-0.5"
                          style={{
                            background: "rgba(255,255,255,0.94)",
                            border: "1px solid rgba(231, 212, 188, 0.78)",
                            color: "var(--text-primary)",
                            boxShadow: "0 8px 16px rgba(32,24,14,0.03)",
                          }}
                        >
                          <span>Case Study</span>
                          <ArrowRight size={13} style={{ color: "#ef9d57" }} />
                        </Link>

                        {githubHref ? (
                          <a
                            href={githubHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub`}
                            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[11px] transition-transform duration-300 hover:-translate-y-0.5"
                            style={{
                              background: "rgba(255,255,255,0.94)",
                              border: "1px solid rgba(231, 212, 188, 0.78)",
                              color: "var(--text-primary)",
                              boxShadow: "0 8px 16px rgba(32,24,14,0.03)",
                            }}
                          >
                            <Github size={14} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}