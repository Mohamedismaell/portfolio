"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Layers3,
  Zap,
  MapPin,
  Search,
  Bell,
  Plane,
  Hotel,
  Utensils,
  Compass,
  Star,
  Clock3,
  Lightbulb,
  Boxes,
  Smartphone,
  Code2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BORDERS, GRADIENTS, SHADOWS, SURFACES, TEXT } from "@/lib/theme";

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
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 96,
      behavior: "smooth",
    });
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
      <div className="grid items-start gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-2">
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
              className="max-w-[8.8ch] text-[2.95rem] font-[800] leading-[0.95] tracking-[-0.07em] sm:text-[4.15rem] lg:text-[5.25rem]"
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
          className="relative mx-auto mt-2 w-full max-w-[760px] overflow-visible"
        >
          <div className="flex items-end justify-center gap-3 px-2 pb-2 sm:hidden">
            <div className="rotate-[-10deg]">
              <PhoneShell widthClass="w-[158px]" heightClass="h-[315px]">
                <TripMindScreen />
              </PhoneShell>
            </div>

            <div className="translate-y-3 rotate-[10deg]">
              <PhoneShell widthClass="w-[138px]" heightClass="h-[278px]">
                <MapScreen />
              </PhoneShell>
            </div>
          </div>

          <div className="relative hidden min-h-[620px] sm:block lg:min-h-[690px]">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 52% 30%, rgba(239,157,87,0.12), transparent 18%),
                  radial-gradient(circle at 74% 18%, rgba(239,157,87,0.08), transparent 16%),
                  radial-gradient(circle at 72% 69%, rgba(239,157,87,0.08), transparent 18%),
                  radial-gradient(circle at 37% 68%, rgba(239,157,87,0.09), transparent 18%)
                `,
                filter: "blur(8px)",
              }}
            />

            <div
              className="absolute left-[28%] top-[14%] hidden h-[210px] w-[210px] rounded-full lg:block"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,157,87,0.12) 0%, rgba(239,157,87,0.05) 45%, transparent 72%)",
              }}
            />
            <div
              className="absolute right-[2%] top-[7%] hidden h-[230px] w-[230px] rounded-full lg:block"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,157,87,0.08) 0%, rgba(239,157,87,0.03) 45%, transparent 72%)",
              }}
            />
            <div
              className="absolute bottom-[12%] left-[14%] hidden h-[220px] w-[220px] rounded-full lg:block"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,157,87,0.08) 0%, rgba(239,157,87,0.03) 45%, transparent 72%)",
              }}
            />

            <svg
              className="absolute left-[7%] top-[7%] hidden lg:block"
              width="184"
              height="214"
              viewBox="0 0 184 214"
              fill="none"
            >
              <path
                d="M118 14C94 42 71 70 75 103C80 139 119 140 117 171C116 191 98 201 84 203"
                stroke="#F09D57"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="7 8"
              />
              <circle
                cx="84"
                cy="203"
                r="16"
                stroke="#F09D57"
                strokeOpacity="0.48"
                strokeWidth="2"
                strokeDasharray="6 7"
              />
              <path
                d="M104 21L132 24L124 48"
                stroke="#F09D57"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div
              className="absolute bottom-[4%] left-1/2 h-[98px] w-[72%] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(239,157,87,0.24) 0%, rgba(239,157,87,0.10) 30%, rgba(239,157,87,0.03) 52%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 26, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="absolute left-[20%] top-[0%] z-20"
            >
              <PhoneShell
                widthClass="w-[300px] lg:w-[340px]"
                heightClass="h-[600px] lg:h-[680px]"
              >
                <TripMindScreen />
              </PhoneShell>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26, rotate: 9 }}
              animate={{ opacity: 1, y: 0, rotate: 9 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="absolute right-[7%] top-[7%] z-10"
            >
              <PhoneShell
                widthClass="w-[270px] lg:w-[300px]"
                heightClass="h-[540px] lg:h-[610px]"
              >
                <MapScreen />
              </PhoneShell>
            </motion.div>
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

function PhoneShell({
  children,
  widthClass,
  heightClass,
}: {
  children: ReactNode;
  widthClass: string;
  heightClass: string;
}) {
  return (
    <div
      className={`relative ${widthClass} ${heightClass} overflow-hidden rounded-[34px] border-[5px] sm:rounded-[42px] sm:border-[7px]`}
      style={{
        borderColor: SURFACES.dark,
        background: SURFACES.cardStrong,
        boxShadow: SHADOWS.card,
      }}
    >
      <div
        className="absolute left-1/2 top-[8px] z-30 h-[20px] w-[82px] -translate-x-1/2 rounded-full sm:top-[10px] sm:h-[28px] sm:w-[122px]"
        style={{ background: SURFACES.dark }}
      />
      <div className="absolute inset-[4px] overflow-hidden rounded-[27px] bg-[#fffaf2] sm:inset-[6px] sm:rounded-[34px]">
        {children}
      </div>
    </div>
  );
}

function TripMindScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fffaf2] text-[#171717]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 12%, rgba(239,157,87,0.08), transparent 18%), radial-gradient(circle at 26% 72%, rgba(239,157,87,0.05), transparent 22%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col px-3 pb-3 pt-6 sm:px-5 sm:pb-4 sm:pt-9">
        <div className="flex items-center justify-between text-[8px] font-[800] sm:text-[11px]">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-[#171717]">
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90 sm:h-2 sm:w-2" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70 sm:h-2 sm:w-2" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50 sm:h-2 sm:w-2" />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between sm:mt-4">
          <div>
            <p className="text-[8px] font-[800] text-[#1e1c18] sm:text-[11px]">
              TripMind
            </p>
            <p className="mt-1 text-[7px] font-[600] text-[#8b7d6b] sm:text-[10px]">
              AI Trip Planner
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_6px_14px_rgba(28,20,10,0.08)] sm:h-8 sm:w-8">
              <Bell size={10} className="sm:hidden" />
              <Bell size={14} className="hidden sm:block" />
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f7be84,#ef9d57)] text-white shadow-[0_8px_18px_rgba(239,157,87,0.25)] sm:h-8 sm:w-8">
              <Compass size={10} className="sm:hidden" />
              <Compass size={14} className="hidden sm:block" />
            </span>
          </div>
        </div>

        <div className="mt-4 sm:mt-5">
          <p className="text-[16px] font-[800] leading-[1.02] tracking-[-0.06em] sm:text-[34px]">
            Your journey,
            <br />
            <span className="text-[#ef9d57]">perfected.</span>
          </p>
          <p className="mt-2 max-w-[18ch] text-[7px] font-[600] leading-3.5 text-[#7e7161] sm:mt-3 sm:text-[12px] sm:leading-5">
            Plan, explore and experience the world your way.
          </p>
        </div>

        <div className="mt-4 rounded-[14px] bg-white px-3 py-2.5 shadow-[0_12px_28px_rgba(29,20,12,0.08)] sm:mt-5 sm:rounded-[18px] sm:px-4 sm:py-3">
          <div className="flex items-center gap-2 text-[#9a8c7b] sm:gap-3">
            <Search size={10} className="sm:hidden" />
            <Search size={15} className="hidden sm:block" />
            <span className="text-[7px] font-[700] sm:text-[12px]">
              Where do you want to go?
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-6">
          <p className="text-[7px] font-[800] sm:text-[12px]">
            Popular Destinations
          </p>
          <p className="text-[7px] font-[700] text-[#a08f7c] sm:text-[11px]">
            See all
          </p>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:mt-3 sm:gap-2.5">
          {[
            { city: "Paris", country: "France" },
            { city: "Bali", country: "Indonesia" },
            { city: "Dubai", country: "UAE" },
          ].map((item, index) => (
            <div
              key={item.city}
              className="overflow-hidden rounded-[10px] bg-white shadow-[0_12px_28px_rgba(29,20,12,0.08)] sm:rounded-[16px]"
            >
              <div
                className="h-10 sm:h-24"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(180deg, #f5c997 0%, #8b5a34 100%)"
                      : index === 1
                      ? "linear-gradient(180deg, #f0c89d 0%, #7f5632 100%)"
                      : "linear-gradient(180deg, #efbf88 0%, #724728 100%)",
                }}
              />
              <div className="px-1.5 py-1.5 sm:px-2.5 sm:py-2">
                <p className="text-[6px] font-[800] sm:text-[11px]">
                  {item.city}
                </p>
                <div className="mt-1 flex items-center justify-between text-[#7c6f61]">
                  <span className="text-[5px] font-[700] sm:text-[10px]">
                    {item.country}
                  </span>
                  <span className="flex items-center gap-0.5 text-[5px] font-[800] text-[#171717] sm:gap-1 sm:text-[10px]">
                    <Star size={6} className="sm:hidden" fill="currentColor" />
                    <Star
                      size={10}
                      className="hidden sm:block"
                      fill="currentColor"
                    />
                    4.{index + 5}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-5">
          <p className="text-[7px] font-[800] sm:text-[12px]">Your Trips</p>
          <p className="text-[7px] font-[700] text-[#a08f7c] sm:text-[11px]">
            See all
          </p>
        </div>

        <div className="mt-2.5 flex items-center gap-2 rounded-[14px] bg-white p-2 shadow-[0_12px_28px_rgba(29,20,12,0.08)] sm:mt-3 sm:gap-3 sm:rounded-[18px] sm:p-3">
          <div
            className="h-9 w-9 rounded-[10px] sm:h-14 sm:w-14 sm:rounded-[14px]"
            style={{
              background: "linear-gradient(180deg, #f4c287 0%, #9d6236 100%)",
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[7px] font-[800] sm:text-[12px]">
              Cappadocia Adventure
            </p>
            <div className="mt-1 flex items-center gap-1 text-[#8b7d6b]">
              <Clock3 size={7} className="sm:hidden" />
              <Clock3 size={11} className="hidden sm:block" />
              <span className="text-[5px] font-[700] sm:text-[10px]">
                7 day trip
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#fff2e4] px-1.5 py-1 text-[5px] font-[800] text-[#ef9d57] sm:px-2.5 sm:text-[10px]">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fffaf2] text-[#171717]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 22%, rgba(239,157,87,0.05), transparent 16%), radial-gradient(circle at 22% 78%, rgba(239,157,87,0.05), transparent 18%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col px-2.5 pb-2.5 pt-6 sm:px-4 sm:pb-3.5 sm:pt-9">
        <div className="flex items-center justify-between text-[8px] font-[800] sm:text-[10px]">
          <span>9:41</span>
          <div className="flex items-center gap-1 text-[#171717]">
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90 sm:h-2 sm:w-2" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70 sm:h-2 sm:w-2" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50 sm:h-2 sm:w-2" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-[12px] bg-white px-2.5 py-2 shadow-[0_10px_24px_rgba(29,20,12,0.08)] sm:mt-4 sm:rounded-[16px] sm:px-3 sm:py-2.5">
          <Search size={10} className="text-[#a08f7c] sm:hidden" />
          <Search size={14} className="hidden text-[#a08f7c] sm:block" />
          <span className="text-[7px] font-[700] text-[#9a8c7b] sm:text-[11px]">
            Where to?
          </span>
        </div>

        <div
          className="relative mt-3 flex-1 overflow-hidden rounded-[18px] border border-[#f0dfca] bg-[#f9f0e4] sm:mt-4 sm:rounded-[26px]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(228,214,194,0.55) 1px, transparent 1px),
              linear-gradient(90deg, rgba(228,214,194,0.55) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(185,220,231,0.8) 0%, rgba(185,220,231,0.55) 10%, transparent 11%), radial-gradient(circle at 58% 74%, rgba(186,220,231,0.65) 0%, rgba(186,220,231,0.45) 9%, transparent 10%), linear-gradient(135deg, transparent 0%, transparent 46%, rgba(181,209,228,0.8) 47%, rgba(181,209,228,0.85) 53%, transparent 54%, transparent 100%)",
            }}
          />

          <div className="absolute left-[24%] top-[18%] text-[#ef9d57]">
            <MapPin size={10} className="sm:hidden" fill="currentColor" />
            <MapPin size={18} className="hidden sm:block" fill="currentColor" />
          </div>
          <div className="absolute left-[63%] top-[22%] text-[#ef9d57]">
            <MapPin size={10} className="sm:hidden" fill="currentColor" />
            <MapPin size={18} className="hidden sm:block" fill="currentColor" />
          </div>
          <div className="absolute left-[47%] top-[41%] text-[#ef9d57]">
            <MapPin size={10} className="sm:hidden" fill="currentColor" />
            <MapPin size={18} className="hidden sm:block" fill="currentColor" />
          </div>
          <div className="absolute left-[68%] top-[55%] text-[#ef9d57]">
            <MapPin size={10} className="sm:hidden" fill="currentColor" />
            <MapPin size={18} className="hidden sm:block" fill="currentColor" />
          </div>
          <div className="absolute left-[28%] top-[64%] text-[#ef9d57]">
            <MapPin size={10} className="sm:hidden" fill="currentColor" />
            <MapPin size={18} className="hidden sm:block" fill="currentColor" />
          </div>

          <div className="absolute right-2 top-2 flex flex-col gap-1.5 sm:right-3 sm:top-3 sm:gap-2">
            {[Search, Compass, Bell].map((Icon, index) => (
              <span
                key={index}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(29,20,12,0.08)] sm:h-9 sm:w-9"
              >
                <Icon size={9} className="text-[#ef9d57] sm:hidden" />
                <Icon size={14} className="hidden text-[#ef9d57] sm:block" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2.5 rounded-[14px] bg-white p-2.5 shadow-[0_12px_26px_rgba(29,20,12,0.08)] sm:mt-3 sm:rounded-[18px] sm:p-3">
          <p className="text-[7px] font-[800] sm:text-[11px]">Explore nearby</p>

          <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:mt-3 sm:gap-2">
            {[
              { icon: Hotel, label: "Hotels" },
              { icon: Utensils, label: "Food" },
              { icon: Plane, label: "Activities" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff2e4] text-[#ef9d57] sm:h-10 sm:w-10">
                    <Icon size={10} className="sm:hidden" />
                    <Icon size={15} className="hidden sm:block" />
                  </span>
                  <span className="text-[5px] font-[700] text-[#806f60] sm:text-[10px]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-2.5 flex items-center gap-2 rounded-[12px] bg-[#fffaf2] p-2 sm:mt-3 sm:gap-3 sm:rounded-[14px] sm:p-2.5">
            <div
              className="h-8 w-8 rounded-[9px] sm:h-12 sm:w-12 sm:rounded-[12px]"
              style={{
                background: "linear-gradient(180deg, #f4c287 0%, #9d6236 100%)",
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[6px] font-[800] sm:text-[11px]">
                Grand Pyramids Hotel
              </p>
              <div className="mt-1 flex items-center gap-1 text-[#8b7d6b]">
                <MapPin size={6} className="sm:hidden" />
                <MapPin size={10} className="hidden sm:block" />
                <span className="text-[5px] font-[700] sm:text-[10px]">
                  Cairo, Egypt
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[6px] font-[800] sm:text-[11px]">$120</p>
              <p className="text-[5px] font-[700] text-[#8b7d6b] sm:text-[9px]">
                per night
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}