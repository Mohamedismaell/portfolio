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
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-center
            min-h-[650px]
          "
        >
          {/* LEFT: TEXT (ALWAYS LEFT) */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-mono">
                  {String(index + 1).padStart(2, "0")}
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

            {/* Features List */}
            <div className="space-y-6">
              {section.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-4 items-start"
                >
                  <span className="text-blue-400 font-bold text-lg mt-1">
                    •
                  </span>
                  <p className="text-gray-300 leading-relaxed">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: IMAGE (ALWAYS RIGHT) */}
          <div className="relative w-full h-[650px] flex items-center justify-center">
            {/* Glow Background (no dark box) */}
            <div className="absolute w-[70%] h-[70%] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* Phone/Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md h-full"
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="
                  object-contain
                  drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]
                "
                sizes="(max-width: 768px) 90vw, 420px"
                priority={index === 0} // FIX: first image loads instantly
              />
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
