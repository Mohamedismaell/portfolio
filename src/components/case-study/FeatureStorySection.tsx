"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Section = {
  label: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

export default function FeatureStorySection({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <div className="relative">
      {sections.map((section, index) => (
        <FeatureBlock
          key={index}
          section={section}
          index={index}
        />
      ))}
    </div>
  );
}

function FeatureBlock({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // State to disable parallax on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  // Active state detection
  const isActive = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0]
  );

  const activeScale = useTransform(isActive, [0, 1], [1, 1.05]);
  const activeOpacity = useTransform(isActive, [0, 1], [0.6, 1]);

  // Smaller animated progress indicator
  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "110%"]
  );

  // Parallax movement - DISABLED on mobile by using conditional logic in style below
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // ================= 3D Tilt =================
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: hover)").matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rotateY.set((x / rect.width - 0.5) * 12);
      rotateX.set(-(y / rect.height - 0.5) * 12);
    }
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative grid lg:grid-cols-2 gap-12 lg:gap-24 items-start min-h-[auto] lg:min-h-[750px] py-16 lg:py-32"
    >
      {/* ================= LEFT (Text) ================= */}
      <div className="relative max-w-xl order-1 lg:order-none">
        <div className="relative lg:sticky lg:top-32">

          {/* Number + Label */}
          <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-10">
            <motion.div
              style={{
                scale: activeScale,
                opacity: activeOpacity,
              }}
              // UPDATED: Added shrink-0 and aspect-square to guarantee perfect circle
              className="
                flex items-center justify-center
                w-14 h-14 lg:w-16 lg:h-16
                shrink-0 aspect-square
                rounded-full
                border border-white/20
                text-base lg:text-lg font-semibold
                bg-white/[0.04]
                text-white
              "
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>

            <span className="text-xs lg:text-sm tracking-[0.25em] lg:tracking-[0.45em] text-[#475AD7] uppercase font-semibold">
              {section.label || "Screen"}
            </span>
          </div>

          {/* Title */}
          <h2
            className="
              text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6
              bg-clip-text text-transparent
            "
            style={{
              backgroundImage:
                "linear-gradient(135deg,#ffffff,#cbd5ff)",
            }}
          >
            {section.title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12">
            {section.description}
          </p>

          {/* Features */}
          <div className="space-y-4 lg:space-y-6 mb-12 lg:mb-0">
            {section.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 lg:gap-4"
              >
                <div className="mt-1.5 lg:mt-2 w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-[#475AD7] shadow-[0_0_12px_rgba(71,90,215,0.6)] shrink-0" />
                <p className="text-gray-300 text-sm lg:text-base">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RIGHT (Image) ================= */}
      <div className="relative flex justify-center items-center order-2 lg:order-none">
        {/* Vertical indicator (Hidden on mobile) */}
        <div className="hidden lg:block absolute left-[-30px] top-[20%] h-[60%] w-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-gradient-to-b from-[#475AD7] to-[#8B5CF6]"
          />
        </div>

        {/* 3D Parallax Image */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            // UPDATED: Disable parallax (y movement) on mobile
            y: isMobile ? 0 : imageY,
            rotateX: springX,
            rotateY: springY,
            transformPerspective: 1200,
          }}
          className="relative w-full max-w-md h-[400px] md:h-[500px] lg:h-[650px]"
        >
          {/* Glow */}
          <div className="absolute w-[70%] h-[70%] bg-gradient-to-br from-[#475AD7]/20 via-purple-500/10 to-transparent blur-3xl rounded-full pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          <Image
            src={section.image}
            alt={section.title}
            fill
            className="
              object-contain
              drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]
              lg:drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]
            "
            sizes="(max-width: 768px) 90vw, 420px"
            priority={index === 0}
          />
        </motion.div>
      </div>
    </section>
  );
}
