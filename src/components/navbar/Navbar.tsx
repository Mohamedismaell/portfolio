"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Download, Github, Linkedin, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Mohamedismaell",
    icon: <Github size={16} />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/mohamed-ismail-dev",
    icon: <Linkedin size={16} />,
    label: "LinkedIn",
  },
];

function useAnimatedScroll() {
  const frameRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);

  const animateScroll = useCallback((targetY: number) => {
    if (typeof window === "undefined") return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 700;
    let startTime: number | null = null;

    isAutoScrollingRef.current = true;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextY = startY + distance * ease(progress);

      window.scrollTo(0, nextY);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = null;
        isAutoScrollingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, []);

  const stopAnimation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { animateScroll, isAutoScrollingRef, stopAnimation };
}

export default function ResponsiveNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const { animateScroll, isAutoScrollingRef, stopAnimation } = useAnimatedScroll();

  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      if (isAutoScrollingRef.current) return;

      let current = "home";

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          current = id;
        }
      });

      setActive(current);
    };

    const cancelAutoScrollOnTouch = () => stopAnimation();
    const cancelAutoScrollOnWheel = () => stopAnimation();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", cancelAutoScrollOnTouch, { passive: true });
    window.addEventListener("wheel", cancelAutoScrollOnWheel, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", cancelAutoScrollOnTouch);
      window.removeEventListener("wheel", cancelAutoScrollOnWheel);
    };
  }, [sectionIds, isAutoScrollingRef, stopAnimation]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        animateScroll(el.getBoundingClientRect().top + window.pageYOffset - 96);
        setActive(hash);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, animateScroll]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);

    if (id === "home") {
      if (pathname === "/") {
        stopAnimation();
        animateScroll(0);
        setActive("home");
      } else {
        router.push("/");
      }
      return;
    }

    const el = document.getElementById(id);

    if (el) {
      stopAnimation();
      animateScroll(el.getBoundingClientRect().top + window.pageYOffset - 96);
      setActive(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  const navShellStyle: CSSProperties = {
    background: GRADIENTS.navBg,
    border: `1px solid ${BORDERS.subtle}`,
    boxShadow: scrolled ? SHADOWS.card : "0 10px 28px rgba(39, 30, 20, 0.06)",
    backdropFilter: "blur(22px) saturate(180%)",
    WebkitBackdropFilter: "blur(22px) saturate(180%)",
  };

  const brandMarkStyle: CSSProperties = {
    background: GRADIENTS.cvBtn,
    color: TEXT.inverse,
    boxShadow: SHADOWS.cvBtn,
  };

  const socialBtnStyle: CSSProperties = {
    background: GRADIENTS.ghostBtn,
    border: `1px solid ${BORDERS.subtle}`,
    color: TEXT.soft,
    boxShadow: SHADOWS.ghostBtn,
  };

  const primaryBtnStyle: CSSProperties = {
    background: GRADIENTS.primaryBtn,
    color: TEXT.inverse,
    boxShadow: SHADOWS.primaryBtn,
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[120] h-[2px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: GRADIENTS.progressBar,
        }}
      />

      <header className="fixed inset-x-0 top-0 z-[110] px-4 pt-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-[1280px]"
        >
          <div
            className="hidden items-center justify-between rounded-[24px] px-4 py-3 sm:flex lg:px-5"
            style={navShellStyle}
          >
            <button
              onClick={() => scrollToSection("home")}
              className="shrink-0 text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[14px] text-sm font-extrabold"
                  style={brandMarkStyle}
                >
                  M
                </div>

                <div className="leading-none">
                  <div
                    className="text-[15px] font-bold tracking-tight"
                    style={{ color: TEXT.primary }}
                  >
                    Mohamed Ismail
                  </div>
                  <div
                    className="mt-1 text-[11px] font-medium"
                    style={{ color: TEXT.dim }}
                  >
                    Flutter Developer
                  </div>
                </div>
              </div>
            </button>

            <div className="flex items-center gap-1 rounded-full px-2 py-1">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-300"
                    style={{
                      color: isActive ? TEXT.badge : TEXT.soft,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="desktop-nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: GRADIENTS.badge,
                          border: `1px solid ${BORDERS.medium}`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="mr-1 hidden items-center gap-2 lg:flex">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
                    style={socialBtnStyle}
                  >
                    <span
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: GRADIENTS.socialHover,
                      }}
                    />
                    <span
                      className="relative z-10 transition-all duration-300 group-hover:scale-110"
                      style={{ color: "inherit" }}
                    >
                      {item.icon}
                    </span>
                  </a>
                ))}
              </div>

              <a
                href="/Mohamed_Ismael_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-[14px] px-4 text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 lg:px-5"
                style={primaryBtnStyle}
              >
                <span>Download CV</span>
                <Download
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>

              <ThemeToggle />
            </div>
          </div>

          <div
            className="flex items-center justify-between rounded-[20px] px-4 py-3 sm:hidden"
            style={navShellStyle}
          >
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2.5 text-left"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-[12px] text-sm font-extrabold"
                style={brandMarkStyle}
              >
                M
              </div>

              <div className="leading-none">
                <div
                  className="text-[14px] font-bold tracking-tight"
                  style={{ color: TEXT.primary }}
                >
                  Mohamed Ismail
                </div>
                <div
                  className="mt-1 text-[10px] font-medium"
                  style={{ color: TEXT.dim }}
                >
                  Flutter Developer
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-[14px] transition-all duration-300"
                style={socialBtnStyle}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[100] sm:hidden"
              style={{
                background: "rgba(10, 8, 7, 0.28)",
                backdropFilter: "blur(6px)",
              }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed inset-x-4 top-[84px] z-[115] overflow-hidden rounded-[24px] sm:hidden"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.card,
                backdropFilter: "blur(22px) saturate(180%)",
                WebkitBackdropFilter: "blur(22px) saturate(180%)",
              }}
            >
              <div className="p-4">
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = active === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.22 }}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition-all duration-300"
                        style={{
                          color: isActive ? TEXT.badge : TEXT.soft,
                          background: isActive ? GRADIENTS.badge : "transparent",
                          border: isActive
                            ? `1px solid ${BORDERS.medium}`
                            : "1px solid transparent",
                        }}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: "var(--accent)" }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div
                  className="my-4 h-px"
                  style={{
                    background: GRADIENTS.divider,
                  }}
                />

                <div className="mb-4 flex items-center justify-center gap-2">
                  {SOCIAL_LINKS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] transition-all duration-300"
                      style={socialBtnStyle}
                    >
                      <span
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: GRADIENTS.socialHover,
                        }}
                      />
                      <span
                        className="relative z-10 transition-all duration-300 group-hover:scale-110"
                        style={{ color: "inherit" }}
                      >
                        {item.icon}
                      </span>
                    </a>
                  ))}
                </div>

                <a
                  href="/Mohamed_Ismael_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-[16px] text-sm font-bold transition-all duration-300"
                  style={primaryBtnStyle}
                >
                  <span>Download CV</span>
                  <Download
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}