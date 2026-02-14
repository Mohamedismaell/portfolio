"use client";

import { motion } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProjectHighlights from "../case-study/ProjectHighlights";
export default function ProjectsSection() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const projects = Object.values(projectsMap);

  return (
    <section id="projects" className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl lg:text-5xl font-bold mb-16 text-white"
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project: any, index: number) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500"
          >
            {/* Image Cover */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">

              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>

                <a
                  href={project.github}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Github size={18} />
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 4).map((tech: string) => (
                  <span
                    key={tech}
                    className="text-sm px-3 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mb-8">
                <ProjectHighlights
                  tech={project.tech}
                  year={project.duration}
                  platform={project.platform}
                  gallery={project.gallery}
                  slug={project.slug}
                // github={project.github}
                />
              </div>

              {/* CTA */}
              {/* <Link
                href={`/${locale}/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all"
              >
                View Case Study
                <ArrowRight size={16} />
              </Link> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
