import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { SiDiscord } from "react-icons/si";

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
];

export default function Footer() {
  return (
    <footer className="mt-16 px-4 pb-6 sm:mt-20 sm:px-6 sm:pb-8 lg:mt-24">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="relative overflow-hidden rounded-[24px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5"
          style={{
            background:
              "radial-gradient(circle at 8% 18%, rgba(247,190,132,0.10), transparent 20%), linear-gradient(135deg, #1b1714 0%, #11100f 58%, #161311 100%)",
            border: "1px solid rgba(244,181,109,0.24)",
            boxShadow:
              "0 16px 34px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.035)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 20% 24%, rgba(244,181,109,0.10), transparent 18%), radial-gradient(circle at 68% 38%, rgba(244,181,109,0.07), transparent 16%)",
            }}
          />

          <div
            className="pointer-events-none absolute left-[34%] top-[18%] hidden h-[110px] w-[220px] lg:block"
            style={{
              borderTop: "1.5px dashed rgba(244,181,109,0.16)",
              borderRight: "1.5px dashed rgba(244,181,109,0.16)",
              borderRadius: "999px",
              transform: "rotate(8deg)",
            }}
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.05fr_1px_0.95fr] lg:items-center lg:gap-6">
              <div className="min-w-0">
                <h2 className="text-[1.65rem] sm:text-[1.9rem] lg:text-[2.05rem] font-[800] leading-[0.95] tracking-[-0.06em] text-white">
                  Let’s build something
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    amazing
                  </span>{" "}
                  together
                </h2>

                <p className="mt-3 max-w-[30ch] text-[13px] sm:text-[14px] leading-[1.7] text-white/68">
                  I’m open to full-time opportunities and exciting projects.
                </p>
              </div>

              <div
                className="hidden lg:block h-full min-h-[92px] w-px"
                style={{ background: "rgba(244,181,109,0.12)" }}
              />

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:mohamed.ismael.dev@outlook.com"
                  className="group inline-flex w-fit max-w-full items-center gap-2 rounded-[14px] px-3.5 py-2.5 text-[12px] sm:text-[13px] font-[600] text-white/90 transition-all duration-300 hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(244,181,109,0.18)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(239,157,87,0.14)",
                      color: "#ef9d57",
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
                      className="group flex h-11 w-11 items-center justify-center rounded-[14px] text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                      style={{
                        background: "rgba(255,255,255,0.035)",
                        border: "1px solid rgba(244,181,109,0.16)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.025), 0 8px 16px rgba(0,0,0,0.15)",
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
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-[18px] px-6 py-4 text-[14px] sm:text-[15px] font-[700] text-white transition-all duration-300 hover:-translate-y-0.5 lg:min-w-[190px]"
                style={{
                  background: "linear-gradient(180deg, #f3bb7f 0%, #de934a 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 16px 28px rgba(222,147,74,0.22)",
                }}
              >
                <span>Let’s Connect</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}