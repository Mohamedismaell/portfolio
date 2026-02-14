"use client";

import { motion } from "framer-motion";
import PhoneShowcase from "./PhoneShowcase";
import { Github } from "lucide-react";
import Image from "next/image";

export default function CaseStudy({ project }: any) {
  return (
    <main className="pt-28 pb-24 px-6 lg:px-20 max-w-7xl mx-auto">
      {/* HERO SECTION */}
      <section className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-4"
          >
            {project.title}
          </motion.h1>

          <p className="text-blue-400 text-lg mb-8">
            {project.role}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            {project.description}
          </p>

          <a
            href={project.github}
            target="_blank"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
          >
            <Github size={18} />
            View Source Code
          </a>
        </div>

        {/* COVER IMAGE */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-white/10"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </section>

      {/* DETAILS SECTION */}
      <section className="grid lg:grid-cols-3 gap-16 mb-24">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Overview
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Challenge
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Solution
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6 text-white">
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

      {/* APP SHOWCASE (NEW PREMIUM SECTION) */}
      {project.gallery && project.gallery.length > 0 && (
        <PhoneShowcase images={project.gallery} />
      )}
    </main>
  );
}
