"use client";

import { motion } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectsSection() {
  const params = useParams();
  const locale = params?.locale as string || "en";
  const projects = Object.values(projectsMap);

  return (
    <section id="projects" className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-5xl font-bold mb-12 text-white"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                 {/* Icon placeholder or dynamic icon based on tech */}
                 <Github size={24} />
              </div>
              <a href={project.github} target="_blank" className="text-gray-400 hover:text-white transition">
                <Github size={20} />
              </a>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.slice(0, 3).map((t: string) => (
                <span key={t} className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-300 border border-white/5">
                  {t}
                </span>
              ))}
            </div>

            <Link
              href={`/${locale}/projects/${project.title
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className="inline-flex items-center gap-2 text-sm text-blue-400 group-hover:translate-x-1 transition-transform"
            >
              View Case Study <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
