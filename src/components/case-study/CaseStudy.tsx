"use client";

import { useEffect, useRef } from "react";
import FeaturesSection from "./FeaturesSection";
import AutoPlayScreens from "./AutoPlayScreens";
import FeatureStorySection from "./FeatureStorySection";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Github } from "lucide-react";

export default function CaseStudy({ project }: any) {
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const scrollToNext = () => {
    const el = document.getElementById("next-section");
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const absoluteY = rect.top + window.pageYOffset;

    const topSpacing = window.innerHeight * 0.18;
    const targetY = absoluteY - topSpacing;

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 850;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const eased = easeInOutCubic(percent);

      window.scrollTo(0, startY + distance * eased);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-32 pb-32 px-6 lg:px-20 max-w-7xl mx-auto"
    >
      {/* ================= HERO ================= */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative grid lg:grid-cols-2 gap-10 items-center mb-10"



      >
        {/* Glass Background */}
        {/* <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/5 -z-10" /> */}
        <div className="absolute -inset-10 bg-[#475AD7]/10 blur-3xl -z-20" />

        {/* LEFT */}
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]">
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            {project.shortDescription}
          </p>

          <motion.a
            href={project.github}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              group relative inline-flex items-center gap-2
              px-8 py-3 rounded-xl font-semibold text-white
              transition-all duration-300
            "
            style={{
              background:
                "linear-gradient(135deg, #475AD7, #8B5CF6)",
              boxShadow:
                "0 15px 40px rgba(71,90,215,0.45)",
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)",
              }}
            />
            <Github size={24} className="relative z-10" />
            <span className="relative z-10">
              View Source Code
            </span>
          </motion.a>
        </div>

        {/* RIGHT */}
        {project.heroScreens && (
          <div className="relative flex justify-center items-center scale-90 lg:scale-90">
            <AutoPlayScreens screens={project.heroScreens} />
          </div>
        )}
      </motion.section>

      {/* ================= EXPLORE MORE ================= */}
      <div className="flex flex-col items-center mb-12">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="
      text-white font-semibold tracking-widest text-sm mb-3
      drop-shadow-[0_0_6px_rgba(71,90,215,0.6)]
    "
        >
          EXPLORE MORE
        </motion.span>

        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="
      w-8 h-14 border border-white/50 rounded-full
      flex justify-center pt-3 backdrop-blur-lg
      shadow-[0_0_15px_rgba(71,90,215,0.3)]
    "
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="
        w-1.5 h-3 bg-gradient-to-b from-[#475AD7] to-[#8B5CF6]
        rounded-full
      "
          />
        </motion.button>
      </div>


      {/* Divider */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-40" />

      {/* ================= FEATURE STORY ================= */}
      {project.sections && (
        <motion.section
          id="next-section"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-24"
        >
          <FeatureStorySection sections={project.sections} />
        </motion.section>
      )}

      {/* ================= FEATURES ================= */}
      {project.features && (
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-24"
        >
          <FeaturesSection features={project.features} />
        </motion.section>
      )}
    </motion.main>
  );
}
