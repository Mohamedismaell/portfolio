"use client";

import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { SiDiscord, SiWhatsapp } from "react-icons/si";
import { useAnimatedScroll } from "@/lib/useAnimatedScroll";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/mohamed-ismail-dev",
    icon: <Linkedin size={17} />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/Mohamedismaell",
    icon: <Github size={17} />,
    label: "GitHub",
  },
  {
    href: "https://discord.com/users/406180177261887489",
    icon: <SiDiscord size={16} />,
    label: "Discord",
  },
  {
    href: "https://wa.me/201026564376",
    icon: <SiWhatsapp size={16} />,
    label: "WhatsApp",
  },
];

export default function Footer() {
  const { animateScroll, stopAnimation } = useAnimatedScroll();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    stopAnimation();
    animateScroll(el.getBoundingClientRect().top + window.pageYOffset - 96);
  };

  return (
    <footer className="mt-16 px-4 pb-6 sm:mt-20 sm:px-6 sm:pb-8 lg:mt-24">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="relative overflow-hidden rounded-[24px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 8% 18%, rgba(239,157,87,0.12), transparent 20%)",
            backgroundColor: "var(--background-secondary)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 24%, rgba(239,157,87,0.10), transparent 18%), radial-gradient(circle at 68% 38%, rgba(239,157,87,0.07), transparent 16%)",
            }}
          />

          <div
            className="pointer-events-none absolute left-[34%] top-[18%] hidden h-[110px] w-[220px] lg:block"
            style={{
              borderTop: "1.5px dashed var(--border-medium)",
              borderRight: "1.5px dashed var(--border-medium)",
              borderRadius: "999px",
              transform: "rotate(8deg)",
            }}
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.05fr_2px_0.95fr] lg:items-center lg:gap-8">
              <div className="min-w-0">
                <h2
                  className="text-[1.65rem] sm:text-[1.9rem] lg:text-[2.05rem] font-[800] leading-[0.95] tracking-[-0.06em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Let's build something
                  <br />
                  <span className="gradient-text">amazing</span>{" "}
                  together
                </h2>

                <p
                  className="mt-3 max-w-[30ch] text-[13px] sm:text-[14px] leading-[1.7]"
                  style={{ color: "var(--text-soft)" }}
                >
                  I'm open to full-time opportunities and exciting projects.
                </p>
              </div>

              <div
                className="hidden lg:block h-full min-h-[120px] w-0.5 rounded-full"
                style={{ background: "var(--border-medium)" }}
              />

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:mohamed.ismael.dev@outlook.com"
                  className="group inline-flex w-fit max-w-full items-center gap-2 rounded-[14px] px-3.5 py-2.5 text-[12px] sm:text-[13px] font-[600] transition-all duration-300"
                  style={{
                    background: "var(--background-tertiary)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "var(--gradient-badge)",
                      color: "var(--accent)",
                    }}
                  >
                    <Mail size={14} />
                  </span>

                  <span className="truncate">mohamed.ismael.dev@outlook.com</span>
                </a>

                <div className="flex items-center gap-2.5">
                  {SOCIAL_LINKS.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group flex h-11 w-11 items-center justify-center rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: "var(--background-tertiary)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-soft)",
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:pl-4">
              <button
                onClick={() => scrollTo("contact")}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-[18px] px-6 py-4 text-[14px] sm:text-[15px] font-[700] transition-all duration-300 hover:-translate-y-0.5 lg:min-w-[190px]"
                style={{
                  background: "var(--gradient-primary-btn)",
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-inverse)",
                  boxShadow: "var(--shadow-primary-btn)",
                }}
              >
                <span>Let's Connect</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}