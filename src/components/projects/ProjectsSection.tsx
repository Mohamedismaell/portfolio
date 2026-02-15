"use client";

import { motion } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import { Github } from "lucide-react";
import Image from "next/image";
import ProjectHighlights from "../case-study/ProjectHighlights";

export default function ProjectsSection() {
  const projects = Object.values(projectsMap);

  return (
    <section id="projects" className="py-28 px-6 lg:px-20 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="
  text-3xl lg:text-5xl font-bold mb-16 text-center
  text-white
  drop-shadow-[0_0_5px_rgba(255,255,255,0.45)]
"
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project: any, index: number) => {
          const color = project.color || "#475AD7";

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className="absolute -inset-1 rounded-[36px] blur-2xl opacity-40 group-hover:opacity-80 transition duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${color}55, transparent 70%)`,
                }}
              />

              <div
                className="
                  relative rounded-[32px]
                  p-5
                  backdrop-blur-2xl
                  border border-white/10
                  bg-white/[0.03]
                  overflow-hidden
                  transition-all duration-500
                  group-hover:scale-[1.03]
                "
                style={{
                  boxShadow: `0 10px 40px ${color}22`,
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                  }}
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${color}55, ${color}22)`,
                  }}
                />

                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-white/90 mb-5 shadow-inner">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>

                  <a
                    href={project.github}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <Github size={24} />
                  </a>
                </div>

                <p className="text-gray-300 text-sm mb-5 line-clamp-3">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2.5 mb-6">
                  {project.tech?.slice(0, 6).map((tech: string) => (
                    <span
                      key={tech}
                      className="
        px-3.5 py-1.5
        rounded-full
        text-xs font-semibold
        border
        backdrop-blur-md
        transition-all duration-300
      "
                      style={{
                        background: `${color}22`,
                        borderColor: `${color}55`,
                        color: "#F3F4F6",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="relative w-full h-[2px] my-6">
                  <div
                    className="absolute inset-0 rounded-full opacity-80"
                    style={{
                      background: `linear-gradient(
        90deg,
        transparent,
        ${color}AA,
        ${color}55,
        transparent
      )`,
                    }}
                  />
                  <div
                    className="absolute inset-0 blur-md opacity-60"
                    style={{
                      background: `linear-gradient(
        90deg,
        transparent,
        ${color}66,
        transparent
      )`,
                    }}
                  />
                </div>

                <div className="mt-2 text-center">
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
      </div>
    </section>
  );
}
