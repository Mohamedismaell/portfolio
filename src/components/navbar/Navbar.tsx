"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useAnimatedScroll } from "@/lib/useAnimatedScroll";

const NAV_ITEMS = [
  { id: "what-i-build", labelKey: "nav.whatIBuild" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "education", labelKey: "nav.education" },
];

export default function ResponsiveNavbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { animateScroll, isAutoScrollingRef, stopAnimation } =
    useAnimatedScroll();

  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const isProjectDetails = pathname.includes("/projects/");

  useEffect(() => {
    const onScroll = () => {
      if (isProjectDetails) return;
      if (isAutoScrollingRef.current) return;

      const scrollY = window.scrollY;
      setScrolled(scrollY > 120);

      let current = "home";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 140) {
          current = id;
        }
      });
      setActive(current);
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, isAutoScrollingRef, isProjectDetails]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (isProjectDetails) {
      window.location.assign(`${pathname.replace(/\/projects\/.*$/, "") || "/"}#${id}`);
      return;
    }

    if (id === "home") {
      stopAnimation();
      animateScroll(0);
      setActive("home");
      window.history.replaceState(null, "", pathname);
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;
    stopAnimation();
    animateScroll(element.getBoundingClientRect().top + window.pageYOffset - 96);
    setActive(id);
    window.history.replaceState(null, "", `${pathname}#${id}`);
  };

  const openContactModal = () => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  if (isProjectDetails) return null;

  return (
    <>
      {/* Fixed MI logo — top left, stroke-draw animation auto-loops */}
      <button
        onClick={() => scrollToSection("home")}
        aria-label="Back to top"
        className="fixed top-5 left-5 z-[130] w-14 h-10 sm:w-16 sm:h-11 pointer-events-auto cursor-pointer bg-transparent p-0 border-0"
      >
        <svg viewBox="0 0 600 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0,400) scale(0.1,-0.1)">
            {["M3537 3603 c-4 -6 -10 -292 -13 -635 -6 -622 -6 -623 -28 -674 -35 -76 -84 -119 -162 -144 -36 -11 -76 -20 -88 -21 -11 0 7 -7 40 -14 81 -18 135 -46 173 -92 62 -75 60 -53 65 -918 2 -442 8 -801 14 -814 14 -38 22 333 22 1005 0 655 0 655 64 731 43 50 120 84 204 91 l63 5 -4 -544 c-2 -393 -7 -554 -15 -581 -31 -93 -109 -168 -196 -189 -18 -4 41 -8 139 -8 606 -6 745 -6 785 0 42 6 43 6 9 8 -150 5 -263 107 -289 260 -7 45 -10 329 -8 906 l3 840 23 57 c42 104 132 172 245 185 147 16 36 22 -420 23 -277 0 -503 -2 -503 -4 0 -3 22 -12 49 -21 63 -21 120 -82 152 -161 23 -58 23 -65 24 -409 l0 -350 -58 3 c-114 6 -184 46 -232 133 l-30 54 -7 630 c-4 346 -9 636 -10 645 -3 10 -6 11 -11 3z",
              "M1397 3073 c-99 -2 -156 -7 -152 -13 3 -6 18 -10 33 -10 46 0 144 -54 192 -106 47 -50 173 -207 405 -504 685 -877 766 -977 994 -1235 151 -170 192 -235 212 -338 12 -56 4 -149 -17 -202 -28 -71 113 116 156 207 98 209 73 403 -78 618 -46 65 -638 843 -891 1170 -245 317 -282 355 -377 393 -47 18 -231 26 -477 20z",
              "M1680 1893 c0 -707 -1 -717 -64 -850 -65 -135 -175 -218 -305 -230 -34 -3 -64 -10 -67 -14 -3 -5 206 -9 465 -9 259 0 471 4 471 9 0 4 -25 11 -55 14 -162 17 -286 137 -346 337 -23 74 -23 83 -27 694 l-3 618 -27 34 c-15 19 -30 34 -34 34 -5 0 -8 -287 -8 -637z",
              "M2980 1837 c19 -25 91 -118 159 -207 206 -270 277 -399 305 -557 20 -114 30 -71 31 132 0 148 -3 180 -23 248 -40 141 -106 242 -207 318 -61 46 -174 93 -250 105 l-49 7 34 -46z",
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="var(--text-primary)"
                stroke="var(--text-primary)"
                strokeWidth={55}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="mi-logo-path"
                style={{ animationDelay: `${i * 0.22}s` }}
              />
            ))}
          </g>
        </svg>
      </button>

      <header className="fixed top-5 inset-x-0 z-[120] flex justify-center px-4 pointer-events-none">
        <motion.div
          layout
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-pill rounded-full pointer-events-auto flex items-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {scrolled ? (
              /* ── Shrunk state: image + Let's Talk only ── */
              <motion.div
                key="shrunk"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2 py-1.5 pl-2 pr-2.5"
              >
                <button
                  onClick={() => scrollToSection("home")}
                   className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-subtle)] shrink-0 pointer-events-auto hover:shadow-md transition-shadow"
                >
                  <Image
                    src="/person_profile.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
                <button
                  onClick={openContactModal}
                  className="text-xs bg-[var(--text-primary)] hover:opacity-90 text-[var(--text-inverse)] px-3.5 py-1.5 rounded-full font-medium transition-all"
                >
                  {t("nav.letsTalk")}
                </button>
              </motion.div>
            ) : (
              /* ── Full state ── */
              <motion.div
                key="full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-3 py-1.5 pl-2 pr-2.5"
              >
                {/* Brand */}
                <button
                  onClick={() => scrollToSection("home")}
                  className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 pl-2 pr-1 pointer-events-auto"
                >
                  <Image
                    src="/mi_logo.png"
                    alt="MI Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] px-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-1.5 rounded-full transition-colors ${
                        active === item.id
                          ? "text-[var(--text-primary)] bg-[var(--background-secondary)]"
                          : "hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
                      }`}
                    >
                      {t(item.labelKey as "nav.whatIBuild" | "nav.projects" | "nav.education")}
                    </button>
                  ))}
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-1.5">
                  <a
                    href="/Mohamed_Ismael_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex text-xs bg-[var(--text-primary)] hover:opacity-90 text-[var(--text-inverse)] px-3.5 py-1.5 rounded-full font-medium transition-all items-center gap-1.5 group shadow-sm"
                  >
                    <span>Resume</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </a>
                  <button
                    onClick={openContactModal}
                    className="hidden md:flex text-xs bg-[var(--text-primary)] hover:opacity-90 text-[var(--text-inverse)] px-3.5 py-1.5 rounded-full font-medium transition-all items-center gap-1.5 group shadow-sm"
                  >
                    <span>{t("nav.letsTalk")}</span>
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>

                  {/* Mobile toggle */}
                  <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    className="md:hidden flex h-8 w-8 items-center justify-center rounded-full bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
                  >
                    {mobileOpen ? <X size={14} /> : <Menu size={14} />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] md:hidden"
              style={{ background: "rgba(10, 8, 7, 0.28)", backdropFilter: "blur(6px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="fixed inset-x-4 top-[84px] z-[115] overflow-hidden rounded-[24px] md:hidden glass-pill"
            >
              <div className="p-4">
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition-all ${
                        active === item.id
                          ? "text-[var(--text-primary)] bg-[var(--background-secondary)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
                      }`}
                    >
                      <span>{t(item.labelKey as "nav.whatIBuild" | "nav.projects" | "nav.education")}</span>
                    </button>
                  ))}
                </div>
                <div className="my-3 h-px bg-[var(--border-subtle)]" />
                <a
                  href="/Mohamed_Ismael_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-[16px] px-4 py-3 text-sm font-bold bg-[var(--background-secondary)] text-[var(--text-primary)] text-center flex items-center justify-center gap-2 hover:bg-[var(--border-subtle)] transition-colors"
                >
                  Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
                <button
                  onClick={openContactModal}
                  className="w-full rounded-[16px] px-4 py-3 text-sm font-bold bg-[var(--text-primary)] text-[var(--text-inverse)] text-center flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-md transition-all"
                >
                  {t("nav.letsTalk")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
