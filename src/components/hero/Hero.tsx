"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 px-6">
      {/* GLASS CONTAINER (matches your portfolio style) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
        {/* PORTFOLIO GRADIENT GLOW */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, #475AD733, transparent 60%),
              radial-gradient(circle at 80% 70%, #8B5CF622, transparent 60%)
            `,
          }}
        />

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          Mohamed Ismael
        </motion.h1>

        {/* ROLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            text-xl sm:text-2xl lg:text-3xl
            mt-5
            font-semibold
            bg-clip-text text-transparent
          "
          style={{
            backgroundImage: "linear-gradient(135deg, #475AD7, #8B5CF6)",
          }}
        >
          Junior Flutter Developer & Software Engineer
        </motion.h2>

        {/* ABOUT (Merged instead of separate About section) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          {/* Building scalable structures and finding innovative solutions that drive business growth. Specializing in handling complex cases, architecting robust systems,
          and delivering mobile applications that solve real-world problems and scale with your business. */}

          Building scalable, production-grade mobile applications with Clean Architecture and modern UI systems.
          I focus on performance, maintainable codebases, and solving complex technical challenges to deliver apps that are reliable, scalable, and user-focused.
        </motion.p>

        {/* SECOND PARAGRAPH (Professional depth) */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="
            mt-4
            text-gray-400
            text-base sm:text-lg
            max-w-2xl
            mx-auto
          "
        >
          Specialized in Flutter, API integration, scalable architecture, and
          performance optimization — delivering real-world apps ready for
          production and app stores.
        </motion.p> */}

        {/* STATS (Glass + Portfolio style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="
            mt-10
            grid grid-cols-1 sm:grid-cols-3
            gap-6
          "
        >
          <Stat value="3+" label="Production Projects" />
          <Stat value="2025+" label="Active Development" />
          <Stat value="Flutter" label="Core Expertise" />
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            className="
              px-8 py-3
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r from-[#475AD7] to-[#8B5CF6]
              hover:scale-105
              transition-all duration-300
              shadow-[0_15px_40px_rgba(71,90,215,0.4)]
            "
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            View Projects
          </button>

          <button
            className="
              px-8 py-3
              rounded-xl
              border border-white/20
              text-white
              hover:border-[#475AD7]
              hover:bg-white/5
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        py-6
        px-4
      "
    >
      <h3 className="text-2xl lg:text-3xl font-bold text-[#475AD7] mb-1">
        {value}
      </h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}
