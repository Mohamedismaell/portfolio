"use client";

import ProjectHighlights from "./ProjectHighlights";
import FeaturesSection from "./FeaturesSection";
import HybridShowcase from "./HybridShowcase";
import ArchitectureSection from "./ArchitectureSection";
import AutoPlayScreens from "./AutoPlayScreens";
import FeatureStorySection from "./FeatureStorySection";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";

export default function CaseStudy({ project }: any) {
  return (
    <main className="pt-28 pb-24 px-6 lg:px-20 max-w-7xl mx-auto">

      {/* ================= HERO SECTION (TITLE LEFT + AUTO SCREENS RIGHT) ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="grid lg:grid-cols-2 gap-16 items-center mb-40"
      >
        {/* LEFT: DETAILS */}
        <div className="max-w-xl">
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            {project.title}
          </motion.h1>

          {/* ROLE */}
          <p className="text-blue-400 text-lg mb-6">
            {project.role}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {/* PROJECT HIGHLIGHTS (GOOD POSITION) */}
          {/* <div className="mb-8">
  <ProjectHighlights
    tech={project.tech}
    year={project.duration}
    platform={project.platform}
  />
</div> */}

          {/* GITHUB BUTTON */}
          <a
            href={project.github}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
          >
            <Github size={18} />
            View Source Code
          </a>
        </div>


        {/* RIGHT: AUTO PLAY SCREENS */}
        {project.heroScreens ? (
          <div className="case-glow relative">
            <AutoPlayScreens screens={project.heroScreens} />
          </div>
        ) : (
          project.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-white/5"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain p-6"
              />
            </motion.div>
          )
        )}
      </motion.section>

      {/* ================= APP FEATURE STORY (APPLE STYLE LAYOUT) ================= */}
      {project.sections && (
        <FeatureStorySection sections={project.sections} />
      )}




      {/* ================= PROJECT HIGHLIGHTS ================= */}
      {/* <section className="mb-32">
        <ProjectHighlights
          // highlights={project.highlights}
          platform={project.platform}
          duration={project.duration}
        />
      </section> */}

      {/* ================= CHALLENGE & SOLUTION ================= */}
      <section className="grid lg:grid-cols-2 gap-12 mb-32">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Challenge
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Solution
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      {project.features && (
        <section className="mb-32">
          <FeaturesSection features={project.features} />
        </section>
      )}

      {/* ================= TECH STACK ================= */}
      <section className="mb-32">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
