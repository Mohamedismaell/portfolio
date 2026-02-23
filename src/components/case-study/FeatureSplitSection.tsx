"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";
import GradientText from "@/components/ui/GradientText";

export default function FeatureSplitSection({
  features,
}: {
  features: { title: string; description: string; image: string }[];
}) {
  return (
    <section className="mb-24 sm:mb-32 space-y-24 sm:space-y-40">
      {features.map((feature, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isReverse ? "lg:order-2" : "lg:order-1"}
            >
              {/* Divider line */}
              <div
                className="w-10 h-px rounded-full mb-5"
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,0.5), transparent)`,
                }}
              />

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter leading-tight mb-4 lg:mb-6">
                <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
                  {feature.title}
                </GradientText>
              </h2>

              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
                style={{ color: TEXT.dim }}
              >
                {feature.description}
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative w-full h-[400px] sm:h-[500px] lg:h-[580px] flex items-center justify-center ${isReverse ? "lg:order-1" : "lg:order-2"
                }`}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)",
                }}
              />

              <div
                className="relative w-full h-full max-w-sm mx-auto rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${BORDERS.subtle}`,
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
