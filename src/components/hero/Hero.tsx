"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";
import GradientText from "@/components/ui/GradientText";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { GRADIENTS, SHADOWS, BORDERS, TEXT } from "@/lib/theme";

//  Typewriter hook ─
function useTypewriter(text: string, speed = 45, delay = 400) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i === text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
}

//  Code panel data ─
const codeLines = [
  { tokens: [{ t: "keyword", v: "class " }, { t: "class", v: "HomeBloc " }, { t: "keyword", v: "extends " }, { t: "class", v: "Bloc" }, { t: "plain", v: "<HomeEvent, HomeState>" }] },
  { tokens: [{ t: "plain", v: "  HomeBloc({" }] },
  { tokens: [{ t: "plain", v: "    " }, { t: "keyword", v: "required this.useCase," }] },
  { tokens: [{ t: "plain", v: "  }) : " }, { t: "keyword", v: "super" }, { t: "plain", v: "(HomeInitial());" }] },
  { tokens: [] },
  { tokens: [{ t: "comment", v: "  // Fetch & emit states" }] },
  { tokens: [{ t: "keyword", v: "  Future<void> _onFetch(" }] },
  { tokens: [{ t: "class", v: "    FetchNewsEvent" }, { t: "plain", v: " event," }] },
  { tokens: [{ t: "class", v: "    Emitter<HomeState>" }, { t: "plain", v: " emit) async {" }] },
  { tokens: [{ t: "plain", v: "    emit(HomeLoading());" }] },
  { tokens: [{ t: "keyword", v: "    final " }, { t: "plain", v: "result = " }, { t: "keyword", v: "await " }, { t: "plain", v: "useCase();" }] },
  { tokens: [{ t: "plain", v: "    result.fold(" }] },
  { tokens: [{ t: "plain", v: "      (l) => emit(HomeError(l))," }] },
  { tokens: [{ t: "plain", v: "      (r) => emit(HomeLoaded(r))," }] },
  { tokens: [{ t: "plain", v: "    );" }] },
  { tokens: [{ t: "plain", v: "  }" }] },
  { tokens: [{ t: "plain", v: "}" }] },
];

const tokenColor: Record<string, string> = {
  keyword: "rgba(255,255,255,0.85)",
  class: "rgba(209,213,219,0.75)",
  comment: "rgba(107,114,128,0.8)",
  plain: "rgba(156,163,175,0.6)",
};

//  Stats data 
const stats = [
  { value: "3+", label: "Projects" },
  { value: "2025", label: "Active Dev" },
  { value: "Flutter", label: "Core Stack" },
];

// ─
const animateScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const targetY = el.getBoundingClientRect().top + window.pageYOffset - 80;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 850;
  let startTime: number | null = null;

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
export default function Hero() {
  const role = useTypewriter("Software Engineer & Mobile Developer", 45, 800);

  const scrollToProjects = () => animateScrollTo("projects");
  const scrollToContact = () => animateScrollTo("contact");

  return (
    <SectionWrapper id="home" fullHeight>

      {/*  CONTENT CONTAINER  */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12 pt-16 sm:pt-20">

        {/*  LEFT SIDE  */}
        <div className="flex-1 min-w-0">
          <SectionBadge label="Flutter Developer" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-5 sm:mb-6"
          >
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              Mohamed<br />Ismael
            </GradientText>
          </motion.h1>

          {/* Role typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-xs sm:text-sm lg:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium mb-5 sm:mb-6 flex items-center"
          >
            <GradientText gradient={GRADIENTS.subtext}>{role}</GradientText>
            <span
              className="animate-pulse ml-[1px]"
              style={{ color: TEXT.cursor }}
            >
              |
            </span>
          </motion.p>

          <SectionDivider delay={0.5} />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mb-8 sm:mb-12"
            style={{ color: TEXT.dim }}
          >
            Building scalable mobile applications with Clean Architecture,
            complex state management, and production-grade Flutter systems
            that solve real-world problems.
          </motion.p>

          {/*  CTA Buttons  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-16"
          >
            <PrimaryButton variant="primary" onClick={scrollToProjects}>
              View Projects →
            </PrimaryButton>

            {/* ✅ Renamed + navigates to #contact */}
            <PrimaryButton variant="ghost" onClick={scrollToContact}>
              Work With Me
            </PrimaryButton>
          </motion.div>
        </div>

        {/* RIGHT SIDE — code panel */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
          className="hidden lg:block lg:w-[300px] xl:w-[400px] shrink-0 pointer-events-none select-none"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Title bar */}
              <div
                className="px-4 py-2.5 border-b"
                style={{ borderColor: BORDERS.subtle }}
              >
                <div className="text-[11px] font-mono" style={{ color: TEXT.muted }}>
                  home_bloc.dart
                </div>
              </div>

              {/* Code lines — bigger font + more padding */}
              <div className="px-4 py-4 font-mono text-[11px] leading-[1.75]">
                {codeLines.map((line, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span style={{ color: "rgba(255,255,255,0.1)" }}>
                      {idx + 1}
                    </span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: tokenColor[token.t] }}>
                          {token.v}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/*  STATS  */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-14"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="flex rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${BORDERS.subtle}`,
              boxShadow: SHADOWS.card,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 px-6 py-6 border-l first:border-l-0 transition-all duration-300 hover:bg-white/[0.04]"
                style={{ borderColor: BORDERS.subtle }}
              >
                <GradientText
                  gradient={GRADIENTS.statValue}
                  className="text-2xl font-bold block mb-1"
                >
                  {stat.value}
                </GradientText>

                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: TEXT.muted }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </SectionWrapper>
  );
}
