"use client";

import { motion } from "framer-motion";

type Layer = {
  name: string;
  description: string;
};

export default function ArchitectureSection({
  title,
  layers,
}: {
  title: string;
  layers: Layer[];
}) {
  return (
    <section className="mb-40">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          The application follows Clean Architecture principles to ensure
          scalability, maintainability, and separation of concerns across layers.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="flex flex-col items-center gap-8">
        {layers.map((layer, index) => (
          <div key={layer.name} className="w-full max-w-3xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-500/40 transition">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {layer.name}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {layer.description}
                </p>
              </div>
            </motion.div>

            {/* Arrow Between Layers */}
            {index !== layers.length - 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 40 }}
                transition={{ delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                className="w-px bg-gradient-to-b from-blue-500/50 to-transparent my-2"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
