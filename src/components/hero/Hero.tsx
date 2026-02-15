"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (!section) return;

    // Smooth animated scroll with offset for navbar
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, #475AD733, transparent 60%),
            radial-gradient(circle at 80% 70%, #8B5CF622, transparent 60%)
          `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="
          relative
          max-w-4xl w-full
          text-center
          rounded-[32px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          p-10 sm:p-14
          overflow-hidden
        "
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(71,90,215,0.12), rgba(139,92,246,0.08))",
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
  text-3xl lg:text-5xl font-bold mb-8 text-center
  text-white
  drop-shadow-[0_0_5px_rgba(255,255,255,0.45)]
"
        >
          Mohamed Ismael
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl lg:text-3xl mt-5 font-semibold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #475AD7, #8B5CF6)",
          }}
        >
          Flutter Developer & Software Engineer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="
            mt-6
            text-gray-300
            text-lg sm:text-xl
            leading-relaxed
            max-w-3xl
            mx-auto
          "
        >
          Building scalable structures and architecting robust mobile
          applications that solve real-world problems and scale with
          business growth. Specialized in Clean Architecture, complex
          state management, and production-grade Flutter apps with
          modern UI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <Stat value="3+" label="Production Projects" />
          <Stat value="2025+" label="Active Development" />
          <Stat value="Flutter" label="Core Expertise" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToProjects}
            className="
              group relative
              px-8 py-3
              rounded-xl
              font-semibold
              text-white
              overflow-hidden
              transition-all duration-300
              hover:scale-105
              active:scale-95
            "
            style={{
              background:
                "linear-gradient(135deg, #475AD7, #8B5CF6)",
              boxShadow:
                "0 15px 40px rgba(71,90,215,0.45)",
            }}
          >
            <span
              className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition duration-500
              "
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)",
              }}
            />
            <span className="relative z-10">
              View Projects
            </span>
          </button>

          <button
            className="
              px-8 py-3
              rounded-xl
              border border-white/20
              text-white
              backdrop-blur-xl
              hover:border-[#475AD7]
              hover:bg-white/[0.05]
              hover:scale-105
              active:scale-95
              transition-all duration-300
            "
          >
            Hire Me
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        relative rounded-2xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        py-6 px-4
        transition-all duration-300
        hover:bg-white/[0.08]
        hover:shadow-[0_20px_60px_rgba(71,90,215,0.25)]
      "
    >
      <h3 className="text-2xl lg:text-3xl font-bold mb-1 bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg, #475AD7, #8B5CF6)",
        }}
      >
        {value}
      </h3>
      <p className="text-gray-400 text-sm">
        {label}
      </p>
    </div>
  );
}
