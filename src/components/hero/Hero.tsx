"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Layers3,
  Zap,
  Lightbulb,
  Boxes,
  Smartphone,
  Code2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useAnimatedScroll } from "@/lib/useAnimatedScroll";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

const FEATURES = [
  { label: "Clean Architecture", icon: Layers3 },
  { label: "Performance Focused", icon: Zap },
  { label: "Product Thinking", icon: Lightbulb },
];

const SOCIALS = [
  {
    href: "https://github.com/Mohamedismaell",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/mohamed-ismail-dev",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

const NUMBERS = [
  {
    value: "4+",
    label: "Production Apps",
    icon: Boxes,
  },
  {
    value: "50+",
    label: "Screens Built",
    icon: Smartphone,
  },
  {
    value: "100+",
    label: "Reusable Widgets",
    icon: Layers3,
  },
  {
    value: "1K+",
    label: "Hours of Coding",
    icon: Code2,
  },
];

export default function Hero() {
  const { animateScroll, stopAnimation } = useAnimatedScroll();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    stopAnimation();
    animateScroll(el.getBoundingClientRect().top + window.pageYOffset - 96);
  };

  const softCardStyle = {
    background: GRADIENTS.cardBg,
    border: `1px solid ${BORDERS.subtle}`,
    boxShadow: SHADOWS.ghostBtn,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  };

  const solidCardStyle = {
    background: GRADIENTS.solidCard,
    border: `1px solid ${BORDERS.subtle}`,
    boxShadow: SHADOWS.card,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  };

  const primaryButtonStyle = {
    background: GRADIENTS.primaryBtn,
    color: TEXT.inverse,
    border: `1px solid ${BORDERS.medium}`,
    boxShadow: SHADOWS.primaryBtn,
  };

  const ghostButtonStyle = {
    background: GRADIENTS.ghostBtn,
    border: `1px solid ${BORDERS.subtle}`,
    color: TEXT.primary,
    boxShadow: SHADOWS.ghostBtn,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  };

  return (
    <SectionWrapper
      id="home"
      className="pt-[94px] pb-14 sm:pt-[116px] sm:pb-14 lg:pt-[124px] lg:pb-16"
    >
      <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-2">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-[560px] px-1 sm:px-0"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-[700] sm:text-[13px]"
            style={{
              ...softCardStyle,
              color: TEXT.dim,
            }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: "#30c86d",
                boxShadow: "0 0 0 4px rgba(48,200,109,0.12)",
              }}
            />
            <span>Available for opportunities</span>
          </div>

          <div className="mt-7 sm:mt-8">
            <h1
              className="max-w-[8.8ch] text-[2.95rem] font-[800] leading-[1.02] tracking-[-0.07em] sm:text-[4.15rem] lg:text-[5.25rem]"
              style={{ color: TEXT.primary }}
            >
              I build production
              <br />
              <span style={{ color: "var(--accent)" }}>Flutter apps</span>
              <br />
              that users love.
            </h1>

            <p
              className="mt-4 max-w-[22rem] text-[14px] font-[500] leading-[1.85] sm:max-w-[31rem] sm:text-[17px]"
              style={{ color: TEXT.soft }}
            >
              I help startups and businesses turn ideas into scalable,
              high-performance mobile applications with clean architecture and
              beautiful user experiences.
            </p>
          </div>

          <div className="mt-7 hidden max-w-[540px] flex-wrap gap-3 sm:flex">
            {FEATURES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="group inline-flex min-h-[58px] items-center gap-3 rounded-[16px] px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                  style={softCardStyle}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: GRADIENTS.badge,
                      color: "var(--accent)",
                      border: `1px solid ${BORDERS.medium}`,
                    }}
                  >
                    <Icon size={16} strokeWidth={2.1} />
                  </span>

                  <span
                    className="max-w-[118px] text-[13px] font-[700] leading-[1.1] tracking-[-0.025em] sm:text-[14px]"
                    style={{ color: TEXT.primary }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-[16px] px-6 text-[14px] font-[800] tracking-[-0.02em] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] sm:min-w-[168px] sm:w-auto sm:text-[15px]"
              style={primaryButtonStyle}
            >
              <span>View My Work</span>
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex h-[54px] w-full items-center justify-center rounded-[16px] px-6 text-[14px] font-[700] tracking-[-0.02em] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] sm:min-w-[154px] sm:w-auto sm:text-[15px]"
              style={ghostButtonStyle}
            >
              Get In Touch
            </button>

            <div className="flex items-center justify-center gap-3 pt-1 sm:ml-1 sm:justify-start sm:pt-0">
              {SOCIALS.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="group relative inline-flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[14px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] sm:h-[56px] sm:w-[56px] sm:rounded-[16px]"
                    style={ghostButtonStyle}
                  >
                    <span
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: GRADIENTS.socialHover }}
                    />
                    <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--text-inverse)]">
                      <Icon size={18} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          className="relative mx-auto mt-2 w-full max-w-[820px] overflow-visible"
        >
          <div className="relative isolate mx-auto w-full max-w-[760px]">
            <div
              className="pointer-events-none absolute inset-x-[10%] bottom-[4%] h-[120px] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(239,157,87,0.18) 0%, rgba(239,157,87,0.08) 35%, rgba(239,157,87,0.02) 60%, transparent 74%)",
                filter: "blur(18px)",
              }}
            />

            <Image
              src="/hero_section.png"
              alt="Two mobile app mockups showing architecture flow and product journey"
              width={2000}
              height={1800}
              priority
              className="h-auto w-full select-none object-contain"
              style={{
                filter: "drop-shadow(0 34px 60px rgba(201,120,52,0.10))",
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="mx-auto mt-8 max-w-[1240px]"
      >
        <div
          className="relative grid grid-cols-2 gap-3 overflow-hidden rounded-[30px] p-4 sm:gap-4 sm:p-5 lg:grid-cols-4 lg:p-6"
          style={solidCardStyle}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 20% 18%, rgba(239,157,87,0.08), transparent 22%), radial-gradient(circle at 86% 72%, rgba(239,157,87,0.06), transparent 24%)",
            }}
          />

          {NUMBERS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group relative flex items-center gap-3 rounded-[22px] px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.025] sm:px-4 sm:py-4"
                style={{
                  ...softCardStyle,
                  boxShadow: SHADOWS.ghostBtn,
                }}
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: GRADIENTS.badge,
                    border: `1px solid ${BORDERS.medium}`,
                    color: "var(--accent)",
                    boxShadow: SHADOWS.ghostBtn,
                  }}
                >
                  <Icon size={24} strokeWidth={1.9} />
                </span>

                <div>
                  <p
                    className="text-[1.85rem] font-[800] leading-[0.95] tracking-[-0.05em] sm:text-[2.2rem]"
                    style={{ color: TEXT.primary }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="mt-1 text-[12px] font-[600] leading-[1.35] sm:text-[13px]"
                    style={{ color: TEXT.soft }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}