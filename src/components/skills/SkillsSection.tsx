"use client";

import { motion } from "framer-motion";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-20 max-w-7xl mx-auto bg-white/5 rounded-3xl backdrop-blur-sm">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-5xl font-bold mb-12 text-white text-center"
      >
        Skills
      </motion.h2>
      <div className="text-center text-gray-400">
        <p>Technical Skills coming soon...</p>
      </div>
    </section>
  );
}
