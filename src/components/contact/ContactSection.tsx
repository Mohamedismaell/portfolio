"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 lg:px-20 max-w-5xl mx-auto text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-5xl font-bold mb-6 text-white"
      >
        Hire Me / Contact
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-400 text-lg mb-12"
      >
        Open to freelance projects, remote opportunities, and Flutter
        development roles.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Email */}
        <a
          href="mailto:mohamed.ismael.dev@outlook.com"
          className="flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold text-white/90"
        >
          <Mail size={20} />
          Email Me
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/mohamed-ismail-dev"
          target="_blank"
          className="flex items-center gap-3 px-6 py-4 border border-white/20 hover:border-blue-500 transition rounded-xl text-white/90"
        >
          <Linkedin size={20} />
          LinkedIn
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Mohamedismaell"
          target="_blank"
          className="flex items-center gap-3 px-6 py-4 border border-white/20 hover:border-blue-500 transition rounded-xl text-white/90"
        >
          <Github size={20} />
          GitHub
        </a>
      </div>
    </section>
  );
}
