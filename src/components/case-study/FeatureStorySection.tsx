"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Section = {
  label: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

export default function FeatureStorySection({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <div className="space-y-40">
      {sections.map((section, index) => (
        <section
          key={index}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT: TEXT CONTENT */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-mono">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="text-blue-400 tracking-[0.3em] text-xs font-semibold uppercase">
                  {section.label}
                </p>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {section.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {section.description}
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-6">
              {section.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <span className="text-blue-400 font-bold text-lg leading-none mt-1">
                    •
                  </span>
                  <p className="text-gray-300 leading-tight">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: SCREEN (Sticky Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-[650px] flex items-center justify-center"
          >
            {/* Gradient Glow */}
            <div className="absolute w-[70%] h-[70%] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-3xl rounded-full" />

            {/* App Screen */}
            <div className="relative w-full max-w-md h-full">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)] transform transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
          </motion.div>
        </section>
      ))}
    </div>
  );
}
