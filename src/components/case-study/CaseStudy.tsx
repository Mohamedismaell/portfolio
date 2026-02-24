"use client";

import { useEffect, useState } from "react";
import ArchitectureSection from "./ArchitectureSection";
import AutoPlayScreens from "./AutoPlayScreens";
import FeatureStorySection from "./FeatureStorySection";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ArrowDown } from "lucide-react";
import TechStackSection from "./TechStackSection";
import ChallengesTimeline from "./ChallengesTimeline";
import { GRADIENTS, BORDERS, TEXT, SHADOWS } from "@/lib/theme";
import GradientText from "@/components/ui/GradientText";
import { useRouter } from "@/i18n/routing";
export default function CaseStudy({ project }: any) {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);
  const heroY = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : 80]);

  //  Smooth scroll 
  const scrollToNext = () => {
    const el = document.getElementById("next-section");
    if (!el) return;

    const targetY =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      window.innerHeight * 0.18;

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 850;
    let startTime: number | null = null;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };
  const router = useRouter();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto"
    >

      {/*  Hero  */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24"
      >
        {/* Ambient glow — uses project color */}
        <div
          className="absolute -inset-10 blur-3xl -z-20 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${project.color || "#475AD7"}44, transparent 70%)`,
          }}
        />

        {/* Left — text */}
        <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">

          {/* Back link */}
          <motion.button
            onClick={() => router.back()}

            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 px-4 py-2 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/[0.06] -ml-2"
            style={{
              color: TEXT.soft,
              border: `1px solid ${BORDERS.subtle}`,
            }}
          >
            ← All Projects
          </motion.button>


          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-4 md:mb-6"
          >
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              {project.title}
            </GradientText>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0"
            style={{ color: TEXT.dim }}
          >
            {project.shortDescription}
          </motion.p>

          {/* GitHub button */}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-semibold text-sm md:text-base overflow-hidden transition-all duration-300"
              style={{
                background: GRADIENTS.primaryBtn,
                color: "#000",
                boxShadow: SHADOWS.primaryBtn,
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                }}
              />
              <Github size={18} className="relative z-10" />
              <span className="relative z-10">View Source Code</span>
            </motion.a>
          )}
        </div>

        {/* Right — screens */}
        {project.heroScreens && (
          <div className="relative flex justify-center items-center w-full mt-8 lg:mt-0">
            <AutoPlayScreens screens={project.heroScreens} />
          </div>
        )}
      </motion.section>

      {/*  Scroll indicator  */}
      <div className="flex flex-col items-center mb-16 md:mb-24 gap-3">
        <motion.p
          className="text-[10px] sm:text-xs tracking-widest uppercase font-medium"
          style={{ color: TEXT.muted }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          Explore More
        </motion.p>

        <motion.button
          onClick={scrollToNext}
          animate={{
            y: [0, 0, 10, -4, 8, 0],       // quick drop, slight bounce back
            opacity: [1, 1, 1, 1, 1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: ["easeIn", "easeIn", "easeOut", "easeOut", "easeOut", "easeOut"],
            times: [0, 0.25, 0.55, 0.7, 0.85, 1],  // pause → fast drop → bounce
            repeatDelay: 0.6,                        // pause between each jump
          }}
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 hover:text-white"
          style={{
            border: `1px solid ${BORDERS.medium}`,
            background: "rgba(255,255,255,0.04)",
            color: TEXT.dim,
          }}
          aria-label="Scroll to content"
        >
          <ArrowDown size={14} />
        </motion.button>
      </div>


      {/*  Section divider  */}
      <div
        className="w-full h-px mb-16 md:mb-32 lg:mb-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${BORDERS.medium}, transparent)`,
        }}
      />

      {/*  Feature story  */}
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

      {/*  Architecture  */}
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

      {/*  Challenges  */}
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

      {/*  Tech stack  */}
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
