"use client";

import { useEffect, useState } from "react";
import ArchitectureSection from "./ArchitectureSection";
import AutoPlayScreens from "./AutoPlayScreens";
import FeatureStorySection from "./FeatureStorySection";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Github } from "lucide-react";
import TechStackSection from "./TechStackSection";
import ChallengesTimeline from "./ChallengesTimeline";

export default function CaseStudy({ project }: any) {
  const { scrollY } = useScroll();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const heroY = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : 80]);

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
      className="relative pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 md:px-6 lg:px-20 max-w-7xl mx-auto"
    >

      <motion.section
        style={{
          opacity: heroOpacity,
          y: heroY
        }}
        className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24"
      >
        <div className="absolute -inset-10 bg-[#475AD7]/10 blur-3xl -z-20" />

        <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.45)] leading-tight">
            {project.title}
          </h1>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg mx-auto lg:mx-0">
            {project.shortDescription}
          </p>

          <motion.a
            href={project.github}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              group relative inline-flex items-center gap-2
              px-6 py-3 md:px-8 md:py-3 rounded-xl font-semibold text-white
              transition-all duration-300 text-sm md:text-base
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
            <Github size={20} className="relative z-10 md:w-6 md:h-6" />
            <span className="relative z-10">
              View Source Code
            </span>
          </motion.a>
        </div>

        {project.heroScreens && (
          <div className="relative flex justify-center items-center scale-100 lg:scale-100 w-full mt-8 lg:mt-0">
            <AutoPlayScreens screens={project.heroScreens} />
          </div>
        )}
      </motion.section>

      <div className="flex flex-col items-center mb-16 md:mb-24">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="
      text-white font-semibold tracking-widest text-xs md:text-sm mb-3
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
      shadow-[0_0_15px_rgba(71,90,215,0.3)] cursor-pointer hover:bg-white/5 transition-colors
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


      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 md:mb-32 lg:mb-40" />

      {project.sections && (
        <motion.section
          id="next-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <FeatureStorySection sections={project.sections} />
        </motion.section>
      )}

      {project.features && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 md:mb-24 w-full overflow-hidden"
        >
          <ArchitectureSection features={project.features} />
        </motion.section>
      )}
      {project.challenges && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 md:mb-32"
        >
          <ChallengesTimeline items={project.challenges} />
        </motion.section>
      )}

      {project.techStack && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <TechStackSection stack={project.techStack} />
        </motion.section>
      )}


    </motion.main>
  );
}
