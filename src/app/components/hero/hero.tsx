"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="min-h-screen flex items-center justify-between px-6 lg:px-20">
      {/* Left Content */}
      <div className="max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-6xl font-bold leading-tight"
        >
          {t("title")}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl lg:text-2xl mt-4 text-blue-400 font-medium"
        >
          {t("subtitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-gray-300 text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold">
            {t("ctaProjects")}
          </button>

          <button className="px-6 py-3 border border-white/20 hover:border-blue-500 transition rounded-xl">
            {t("ctaHire")}
          </button>
        </motion.div>
      </div>

      {/* Right Photo Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:block relative"
      >
        <div className="relative w-[380px] h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="/profile.png"
            alt="Mohamed Ismael"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-blue-500/20 blur-3xl -z-10 rounded-3xl"></div>
      </motion.div>
    </section>
  );
}
