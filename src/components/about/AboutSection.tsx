"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-6 lg:px-20 max-w-7xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="/projects/news/01 - Splash Screen.png"
              alt="Mohamed Ismael"
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback since the image might not exist yet
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x450/1a1f2e/ffffff?text=MI';
              }}
            />
          </div>
          <div className="absolute -inset-3 bg-blue-500/10 blur-3xl -z-10 rounded-3xl" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            About Me
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I am Mohamed Ismael, a Flutter Developer and Software Engineer
            focused on building scalable mobile applications with Clean
            Architecture, modern UI systems, and production-ready code.
          </p>

          <p className="text-gray-400 leading-relaxed mb-8">
            I specialize in Flutter, REST API integration, state management
            using BLoC/Cubit, and responsive UI design. My goal is to create
            high-performance applications that are maintainable, scalable,
            and user-focused.
          </p>

          {/* Stats */}
          <div className="flex gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400">3+</h3>
              <p className="text-gray-400 text-sm">Production Projects</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-400">2025+</h3>
              <p className="text-gray-400 text-sm">Active Development</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-400">Flutter</h3>
              <p className="text-gray-400 text-sm">Core Expertise</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
