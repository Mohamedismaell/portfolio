"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PhoneShowcase({
  images,
}: {
  images: string[];
}) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl lg:text-3xl font-bold mb-10 text-white">
        App Showcase
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative w-[260px] h-[520px] rounded-[40px] shadow-2xl overflow-hidden">
              {/* Screen Image */}
              {/* <div className="absolute inset-2 rounded-[30px] overflow-hidden"> */}
                <Image
                  src={img}
                  alt={`app-screen-${index}`}
                  fill
                  className="object-cover"
                //   sizes="(max-width: 768px) 100vw, 300px"
                />
              {/* </div> */}

              {/* Gloss Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
