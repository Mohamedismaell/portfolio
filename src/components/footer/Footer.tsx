import { Github, Linkedin, Mail } from "lucide-react";
import { SiDiscord } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-[#0B0F19]/60 backdrop-blur-xl text-white">

      <div className="absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-[#475AD7]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">

        <h3 className="text-2xl font-bold mb-3">
          Mohamed
          <span className="bg-gradient-to-r from-[#475AD7] to-[#8B5CF6] bg-clip-text text-transparent">
            Ismael
          </span>
        </h3>

        <p className="text-gray-400 mb-6">
          Flutter Developer • Software Engineer
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://discord.com/users/406180177261887489"
            target="_blank"
            className="hover:text-white transition"
          >
            <SiDiscord size={20} />
          </a>
          <a
            href="https://github.com/Mohamedismaell"
            target="_blank"
            className="hover:text-white transition"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/mohamed-ismail-dev"
            target="_blank"
            className="hover:text-white transition"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="mailto:your@email.com"
            className="hover:text-white transition"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} mohamedismael.dev — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
