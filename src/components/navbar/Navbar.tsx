"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
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
                  className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-subtle)] shrink-0 pointer-events-auto"
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
                <div className="flex items-center gap-2 pl-2 pr-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-xs font-bold text-[var(--text-primary)] hover:opacity-80 transition-opacity tracking-tight whitespace-nowrap"
                  >
                    {t("hero.title")}
                  </button>
                </div>

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
                  <LanguageSwitcher />
                  <ThemeToggle />
                  <button
                    onClick={openContactModal}
                    className="hidden md:flex text-xs bg-[var(--text-primary)] hover:opacity-90 text-[var(--text-inverse)] px-3.5 py-1.5 rounded-full font-medium transition-all items-center gap-1.5 group shadow-sm"
                  >
                    <span>{t("nav.letsTalk")}</span>
                    <span className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>

                  {/* Mobile toggle */}
                  <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    className="md:hidden flex h-8 w-8 items-center justify-center rounded-full bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
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
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      <span>{t(item.labelKey as "nav.whatIBuild" | "nav.projects" | "nav.education")}</span>
                    </button>
                  ))}
                </div>
                <div className="my-3 h-px bg-[var(--border-subtle)]" />
                <button
                  onClick={openContactModal}
                  className="w-full rounded-[16px] px-4 py-3 text-sm font-bold bg-[var(--text-primary)] text-[var(--text-inverse)] text-center"
                >
                  {t("nav.letsTalk")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
