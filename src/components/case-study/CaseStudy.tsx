"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function CaseStudy({ project }: any) {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6 lg:px-20 max-w-5xl mx-auto">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white"
      >
        {project.title}
      </motion.h1>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-blue-400 mb-10 text-lg"
      >
        {project.role}
      </motion.p>

      {/* Description */}
      <Section title="Overview" content={project.description} delay={0.1} />
      <Section title="Challenge" content={project.challenge} delay={0.2} />
      <Section title="Solution" content={project.solution} delay={0.3} />

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Demo + GitHub */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4 mt-12"
      >
        <a
          href={project.github}
          target="_blank"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition text-white"
        >
          <Github size={18} />
          View Source Code
        </a>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-blue-500 rounded-xl transition text-white"
          >
            <ExternalLink size={18} />
            Live Demo
          </a>
        )}
      </motion.div>

      {/* Flutter Web Demo Embed */}
      {project.demo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">Live Demo</h2>
          <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={project.demo}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}
    </main>
  );
}

function Section({
  title,
  content,
  delay,
}: {
  title: string;
  content: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-10"
    >
      <h2 className="text-2xl font-semibold mb-3 text-white">{title}</h2>
      <p className="text-gray-400 leading-relaxed">{content}</p>
    </motion.div>
  );
}
