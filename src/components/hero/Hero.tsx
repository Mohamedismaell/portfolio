"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center px-6">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Mohamed Ismael
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl mt-4 text-blue-400"
          >
            Flutter Developer & Software Engineer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0"
          >
            Building scalable Flutter apps with Clean Architecture,
            modern UI systems, and production-ready performance.
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold text-white">
              View Projects
            </button>
            <button className="w-full sm:w-auto px-6 py-3 border border-white/20 hover:border-blue-500 transition rounded-xl text-white">
              Hire Me
            </button>
          </div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ rotateY: 6, rotateX: 4 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative mx-auto w-[260px] sm:w-[320px] lg:w-[380px] h-[340px] sm:h-[420px] lg:h-[480px] perspective-1000"
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10 opacity-60"></div>
            <Image
              src="/projects/news/01 - Splash Screen.png"
              alt="Mohamed Ismael"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x500/1a1f2e/ffffff?text=MI';
              }}
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -inset-4 bg-blue-600/20 blur-3xl -z-10 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
