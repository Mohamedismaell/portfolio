"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeatureSplitSection({
  features,
}: {
  features: {
    title: string;
    description: string;
    image: string;
  }[];
}) {
  return (
    <section className="mb-40 space-y-40">
      {features.map((feature, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`grid lg:grid-cols-2 gap-16 items-center ${
              isReverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isReverse ? "lg:order-2" : "lg:order-1"}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {feature.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                {feature.description}
              </p>
            </motion.div>

            {/* SCREEN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative w-full h-[600px] flex items-center justify-center ${
                isReverse ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="relative w-full h-full max-w-md mx-auto">
                 <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                 />
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
