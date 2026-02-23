"use client";

import { motion, Variants } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import { Github } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";
import GradientText from "@/components/ui/GradientText";
import ProjectHighlights from "../case-study/ProjectHighlights";
import { GRADIENTS, BORDERS, TEXT, SHADOWS } from "@/lib/theme";

//  Animation variants 
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};


export default function ProjectsSection() {
  const projects = Object.values(projectsMap);

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto">

        {/*  Header  */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <SectionBadge label="What I've Built" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-4"
          >
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              Featured Projects
            </GradientText>
          </motion.h2>

          <SectionDivider delay={0.3} className="w-24 mb-5 mx-auto" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ color: TEXT.dim }}
          >
            A selection of production-grade mobile applications built with
            Flutter, Clean Architecture, and modern engineering practices.
          </motion.p>
        </div>

        {/*  Projects grid  */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
        >
          {projects.map((project: any) => {
            const color = project.color || "#475AD7";

            return (
              <motion.div
                key={project.slug}
                variants={cardVariants}
                className="group relative flex flex-col rounded-[28px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  //  Glass morphism base
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`,
                }}
              >
                {/*  Per-project ambient glow — outer */}
                <div
                  className="absolute -inset-2 rounded-[32px] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${color}55, transparent 70%)`,
                  }}
                />

                {/*  Per-project color tint overlay — resting */}
                <div
                  className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px]"
                  style={{
                    background: `linear-gradient(135deg, ${color}18, ${color}06)`,
                  }}
                />

                {/*  Per-project color tint overlay — hover intensifies */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px]"
                  style={{
                    background: `linear-gradient(135deg, ${color}35, ${color}12)`,
                  }}
                />

                {/*  Image  */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom fade into card */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                </div>

                {/*  Body  */}
                <div className="relative flex flex-col flex-1 p-5">

                  {/* Title + GitHub */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3
                      className="text-base sm:text-lg font-bold leading-snug"
                      style={{ color: "rgba(255,255,255,0.92)" }}
                    >
                      {project.title}
                    </h3>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 transition-colors duration-200 hover:text-white"
                        style={{ color: TEXT.muted }}
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4"
                    style={{ color: TEXT.dim }}
                  >
                    {project.shortDescription}
                  </p>

                  {/*  colored border using project color */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech?.slice(0, 5).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium backdrop-blur-sm"
                        style={{
                          background: `${color}15`,
                          border: `1px solid ${color}40`,
                          color: "rgba(255,255,255,0.75)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* divider line per project */}
                  <div className="relative w-full h-px mb-4">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}99, ${color}55, transparent)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 blur-sm"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
                      }}
                    />
                  </div>

                  {/* Highlights / CTA */}
                  <div className="mt-auto">
                    <ProjectHighlights
                      tech={project.tech}
                      year={project.duration}
                      platform={project.platform}
                      gallery={project.gallery}
                      slug={project.slug}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
