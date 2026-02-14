"use client";

import { motion } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import { Github, Eye, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ScreenshotsModal from "@/components/ScreenshotsModal";

export default function ProjectsSection() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const projects = Object.values(projectsMap);

  return (
    <section id="projects" className="py-28 px-6 lg:px-20 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl lg:text-5xl font-bold mb-20 text-white text-center"
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project: any, index: number) => {
          const color = project.color || "#15803d"; // fallback

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* OUTER GLOW (STRONG COLOR) */}
              <div
                className="absolute -inset-[1px] rounded-[36px] opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${color}55, transparent 70%)`,
                }}
              />

              {/* MAIN GLASS CARD */}
              <div
                className="
                  relative
                  rounded-[32px]
                  p-5
                  backdrop-blur-2xl
                  border border-white/10
                  bg-white/[0.03]
                  shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                  transition-all duration-500
                  group-hover:scale-[1.03]
                  group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                  overflow-hidden
                "
              >
                {/* COLOR GRADIENT BACKGROUND */}
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-70 transition"
                  style={{
                    background: `linear-gradient(135deg, ${color}30, transparent 60%)`,
                  }}
                />

                {/* IMAGE CONTAINER (WHITE CARD LIKE REFERENCE) */}
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-white mb-6 shadow-inner">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* CATEGORY BADGE */}
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md"
                    style={{
                      backgroundColor: `${color}cc`,
                    }}
                  >
                    {project.category || "Mobile App"}
                  </div>

                  {/* STATUS BADGE */}
                  <div
                    className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-white backdrop-blur-md flex items-center gap-2"
                    style={{
                      backgroundColor: `${color}cc`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Live Project
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="relative px-2">
                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* TECH TAGS */}
                  {project.tech && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 6).map((tech: string) => (
                        <span
                          key={tech}
                          className="
                            px-3 py-1 rounded-full
                            text-[10px] uppercase tracking-wider font-semibold
                            bg-white/5 text-gray-300
                            border border-white/10
                            backdrop-blur-md
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* DETAILS */}
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="
                        flex items-center justify-center gap-2
                        py-3 rounded-full
                        text-white text-xs font-medium
                        border border-white/10
                        backdrop-blur-md
                        transition
                        hover:scale-[1.02]
                      "
                      style={{
                        backgroundColor: `${color}20`,
                      }}
                    >
                      <Eye size={14} />
                      Details
                    </Link>

                    {/* SCREENSHOTS (CONNECTED TO YOUR MODAL) */}
                    <div
                      className="
                        flex items-center justify-center
                        rounded-full
                        border border-white/10
                        backdrop-blur-md
                        transition
                        hover:scale-[1.02]
                      "
                      style={{
                        backgroundColor: `${color}20`,
                      }}
                    >
                      <ScreenshotsModal images={project.gallery || []} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
