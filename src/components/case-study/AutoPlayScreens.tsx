"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AutoPlayScreens({
  screens,
}: {
  screens: string[];
}) {
  const [index, setIndex] = useState(0);
  // const [isHovered, setIsHovered] = useState(false);

  // Auto play (pause on hover)
  useEffect(() => {
    // if (isHovered) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % screens.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [screens.length,]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}

      className="relative w-full h-[580px] flex flex-col items-center justify-center"
    // onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Gradient Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[40%] h-[40%] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-3xl rounded-full opacity-60" />
      </div>

      {/* Horizontal Slider Container */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {screens.map((screen, i) => (
            <div
              key={i}
              className="min-w-full h-full flex items-center justify-center"
            >
              <div className="relative w-[80%] max-w-md h-full transform transition-transform duration-700 hover:scale-[1.03]">
                <Image
                  src={screen}
                  alt={`app-screen-${i}`}
                  fill
                  priority={i === 0}
                  className="object-contain "
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>


    </motion.div>
  );
}
