"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GRADIENTS } from "@/lib/theme";
/* ── Typewriter hook ───────────────────────── */
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
/* ─────────────────────────────────────────── */

export default function Hero() {
  const role = useTypewriter("Software Engineer & Mobile Architect", 45, 800);

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (!section) return;
    const y = section.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 overflow-hidden"
    // style={{
    //   background: GRADIENTS.pageBg,
    //   backgroundAttachment: "fixed",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    // }}
    >
      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
      />

      {/* Top-left glow */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(200,200,220,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Bottom-right glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(180,180,200,0.03) 50%, transparent 70%)",
        }}
      />

      {/* Diagonal streak */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.02) 55%, transparent 80%)",
        }}
      />

      {/* ═════════ FLOATING CODE PANEL ═════════ */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.1, delay: 1.2, ease: "easeOut" }}
        className="hidden lg:block absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-3 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.035), transparent 70%)",
              filter: "blur(16px)",
            }}
          />

          {/* Code window */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: "320px",
              background:
                "linear-gradient(160deg, #141414 0%, #0f0f0f 50%, #111113 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              }}
            >
              <div
                className="text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                home_bloc.dart
              </div>
            </div>

            <div className="px-3 py-3 font-mono text-[10.5px] leading-5">
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                class HomeBloc extends Bloc&lt;HomeEvent, HomeState&gt;
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>
                &nbsp;&nbsp;Future&lt;void&gt; _onFetchNews(...)
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)" }}>
                &nbsp;&nbsp;// Fetch & emit states
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/* ═══════════════════════════════════════ */}

      {/* MAIN CONTENT */}
      <div className="relative w-full max-w-5xl mx-auto lg:pr-[360px]">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border text-sm font-medium tracking-widest uppercase"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          Flutter Developer
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-6"
          style={{
            background:
              "linear-gradient(175deg, #ffffff 0%, #e8e8e8 25%, #aaaaaa 65%, #555555 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 6px 40px rgba(255,255,255,0.12))",
          }}
        >
          Mohamed<br />Ismael
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-base sm:text-lg tracking-[0.25em] uppercase font-medium mb-6 flex items-center"
        >
          <span
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.25) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {role}
          </span>
          <span
            className="animate-pulse ml-[1px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            |
          </span>
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="origin-left h-px max-w-xs mb-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.15) 60%, transparent)",
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-base sm:text-lg leading-relaxed max-w-xl mb-12"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Building scalable mobile applications with Clean Architecture,
          complex state management, and production-grade Flutter systems
          that solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-3.5 rounded-xl font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #b0b0b0 100%)",
              boxShadow:
                "0 10px 40px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            View Projects →
          </button>

          <button
            className="px-8 py-3.5 rounded-xl font-semibold text-white/70 transition-all duration-300 hover:text-white hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.12)",
            }}
          >
            Hire Me
          </button>
        </motion.div>

      </div>
    </section>
  );
}