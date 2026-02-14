"use client";

import { useEffect } from "react";
import FeaturesSection from "./FeaturesSection";
import AutoPlayScreens from "./AutoPlayScreens";
import FeatureStorySection from "./FeatureStorySection";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";

export default function CaseStudy({ project }: any) {

  // 🔥 Prevent scroll + animation desync on route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-28 pb-24 px-6 lg:px-20 max-w-7xl mx-auto">

      {/* ================= HERO (ANIMATE NOT whileInView) ================= */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }} // FIXED: was whileInView
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid lg:grid-cols-2 gap-16 items-center mb-40"
      >
        {/* LEFT: TEXT */}
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }} // FIXED
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-400 text-lg mb-6"
          >
            {project.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg leading-relaxed mb-8"
          >
            {project.description}
          </motion.p>

          <motion.a
            href={project.github}
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
          >
            <Github size={18} />
            View Source Code
          </motion.a>
        </div>

        {/* RIGHT: AUTO PLAY SCREENS */}
        {project.heroScreens && (
          <div className="relative flex justify-center items-center">
            <AutoPlayScreens screens={project.heroScreens} />
          </div>
        )}
      </motion.section>

      {/* ================= FEATURE STORY ================= */}
      {project.sections && (
        <FeatureStorySection sections={project.sections} />
      )}

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
    </main>
  );
}
