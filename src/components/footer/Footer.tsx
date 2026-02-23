import { Github, Linkedin, Mail } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

const SOCIAL_LINKS = [
  {
    href: "https://discord.com/users/406180177261887489",
    icon: <SiDiscord size={17} />,
    label: "Discord",
  },
  {
    href: "https://github.com/Mohamedismaell",
    icon: <Github size={17} />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/mohamed-ismail-dev",
    icon: <Linkedin size={17} />,
    label: "LinkedIn",
  },
  {
    href: "mailto:mohamed.ismael.dev@outlook.com",
    icon: <Mail size={17} />,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-24 sm:mt-32"
      style={{ borderTop: `1px solid ${BORDERS.subtle}` }}
    >
      {/* Top ambient glow */}
      <div
        className="absolute inset-x-0 -top-12 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04), transparent 70%)",
        }}
      />

      {/* Glass background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.015)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-12 sm:py-16 flex flex-col items-center gap-6 text-center">

        {/* Name */}
        <div>
          <span
            className="text-xl sm:text-2xl font-black tracking-tighter"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            Mohamed{" "}
          </span>
          <span
            className="text-xl sm:text-2xl font-black tracking-tighter"
            style={{
              background: GRADIENTS.heading,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ismael
          </span>
        </div>

        {/* Role */}
        <p
          className="text-[11px] sm:text-xs tracking-widest uppercase font-medium"
          style={{ color: TEXT.muted }}
        >
          Flutter Developer · Software Engineer
        </p>

        {/* Divider */}
        <div
          className="w-16 h-px rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${BORDERS.medium}, transparent)`,
          }}
        />

        {/* Social icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {SOCIAL_LINKS.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${BORDERS.subtle}`,
                color: TEXT.muted,
              }}
            >
              <span className="transition-colors duration-200 group-hover:text-white">
                {icon}
              </span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-[10px] sm:text-xs"
          style={{ color: TEXT.muted }}
        >
          © {new Date().getFullYear()} Mohamed Ismael — All rights reserved.
        </p>

      </div>
    </footer>
  );
}
