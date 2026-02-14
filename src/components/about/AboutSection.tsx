"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Code2, Rocket } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 px-6 lg:px-20 max-w-7xl mx-auto"
    >
      {/* SECTION TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-5xl font-bold mb-16 text-white text-center"
      >
        About Me
      </motion.h2>

      {/* MAIN GLASS CARD (MATCHES PROJECTS / SKILLS STYLE) */}
      <div
        className="
          relative rounded-[32px]
          border border-white/10
          backdrop-blur-2xl
          bg-white/[0.03]
          overflow-hidden
          p-8 lg:p-12
        "
      >
        {/* GRADIENT GLOW (PORTFOLIO STYLE) */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, #475AD733, transparent 60%),
              radial-gradient(circle at 80% 70%, #475AD722, transparent 60%)
            `,
          }}
        />

        <div className="relative grid lg:grid-cols-2 gap-16 items-center">
          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md mx-auto"
          >
            {/* IMAGE CARD (GLASS STYLE) */}
            <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <Image
                src="/projects/news/cover.png"
                alt="Mohamed Ismael"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/400x450/0B0F19/FFFFFF?text=MI";
                }}
              />
            </div>

            {/* OUTER GLOW */}
            <div className="absolute -inset-4 bg-[#475AD7]/20 blur-3xl -z-10 rounded-3xl" />
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* NAME + ROLE */}
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Mohamed Ismael
            </h3>

            <p className="text-[#475AD7] font-semibold mb-6">
              Flutter Developer & Software Engineer
            </p>

            {/* MAIN DESCRIPTION */}
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I am a passionate Flutter Developer focused on building scalable,
              high-performance mobile applications using Clean Architecture,
              modern UI systems, and production-ready code.
            </p>

            <p className="text-gray-400 leading-relaxed mb-10">
              I specialize in Flutter, REST API integration, BLoC/Cubit state
              management, and responsive UI design. My goal is to craft
              maintainable, scalable, and user-focused applications with smooth
              performance and clean code structure.
            </p>

            {/* STATS CARDS (MATCH PORTFOLIO STYLE) */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                icon={<Code2 size={20} />}
                value="3+"
                label="Projects Built"
              />
              <StatCard
                icon={<Rocket size={20} />}
                value="2024+"
                label="Active Development"
              />
              <StatCard
                icon={<User size={20} />}
                value="Flutter"
                label="Core Expertise"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
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
        p-5 text-center
        transition-all duration-300
        hover:bg-white/[0.08]
        hover:border-white/20
        hover:shadow-[0_20px_50px_rgba(71,90,215,0.25)]
        group
      "
    >
      <div className="flex justify-center mb-2 text-[#475AD7] group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <h4 className="text-xl font-bold text-white">
        {value}
      </h4>

      <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
