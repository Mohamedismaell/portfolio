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
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";
import GradientText from "@/components/ui/GradientText";

type Section = {
  label: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

export default function FeatureStorySection({ sections }: { sections: Section[] }) {
  return (
    <div className="relative">
      {sections.map((section, index) => (
        <FeatureBlock key={index} section={section} index={index} />
      ))}
    </div>
  );
}

function FeatureBlock({ section, index }: { section: Section; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const isActive = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const activeScale = useTransform(isActive, [0, 1], [1, 1.05]);
  const activeOpacity = useTransform(isActive, [0, 1], [0.5, 1]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // ✅ Fix 1 — added parentheses around arithmetic expression
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const resetTilt = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <section
      ref={ref}
      className="relative grid lg:grid-cols-2 gap-10 lg:gap-24 items-start min-h-[auto] lg:min-h-[750px] py-14 lg:py-32"
    >
      {/* ── Left — text ── */}
      <div className="relative max-w-xl order-1 lg:order-none">
        <div className="relative lg:sticky lg:top-32">

          {/* Number + label */}
          <div className="flex items-center gap-4 mb-6 lg:mb-10">
            {/* ✅ Fix 2 — removed duplicate style prop, merged into one */}
            <motion.div
              style={{
                scale: activeScale,
                opacity: activeOpacity,
                border: `1px solid ${BORDERS.medium}`,
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.85)",
              }}
              className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 shrink-0 rounded-full text-sm lg:text-base font-bold"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>

            <span
              className="text-[10px] lg:text-xs tracking-[0.3em] uppercase font-semibold"
              style={{ color: TEXT.muted }}
            >
              {section.label || "Feature"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-4 lg:mb-6">
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              {section.title}
            </GradientText>
          </h2>

          {/* Description */}
          <p
            className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 lg:mb-12"
            style={{ color: TEXT.dim }}
          >
            {section.description}
          </p>

          {/* Features list */}
          <div className="space-y-3 lg:space-y-5">
            {section.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    boxShadow: "0 0 8px rgba(255,255,255,0.3)",
                  }}
                />
                <p className="text-xs sm:text-sm lg:text-base" style={{ color: TEXT.soft }}>
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right — image ── */}
      <div className="relative flex justify-center items-center order-2 lg:order-none">

        {/* Vertical scroll indicator */}
        <div
          className="hidden lg:block absolute left-[-28px] top-[20%] h-[60%] w-px rounded-full overflow-hidden"
          style={{ background: BORDERS.subtle }}
        >
          {/* ✅ Fix 3 — removed duplicate style prop */}
          <motion.div
            style={{ height: progressHeight, background: GRADIENTS.statValue }}
            className="w-full rounded-full"
          />
        </div>

        {/* 3D parallax image */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            y: isMobile ? 0 : imageY,
            rotateX: springX,
            rotateY: springY,
            transformPerspective: 1200,
          }}
          className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-[340px] sm:h-[440px] lg:h-[620px]"
        >
          <div
            className="absolute w-[65%] h-[65%] rounded-full blur-3xl pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)",
            }}
          />

          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 420px"
            priority={index === 0}
          />
        </motion.div>
      </div>
    </section>
  );
}
