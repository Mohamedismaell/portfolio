"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0B0F19] pointer-events-none animate-fadeOut">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
          className="text-3xl font-bold text-white"
        >
          Mohamed Ismael
        </motion.h1>

        <p className="text-gray-400 mt-3">
          Flutter Developer & Software Engineer
        </p>

        <motion.div
          className="mt-6 h-1 w-40 bg-blue-500 rounded-full mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
