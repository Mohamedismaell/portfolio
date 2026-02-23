"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import {
  Home,
  Folder,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Download,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { SiDiscord } from "react-icons/si";
import { GRADIENTS, SHADOWS, BORDERS, TEXT } from "@/lib/theme";

// ── Nav items ─────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <Home size={15} /> },
  { id: "projects", label: "Projects", icon: <Folder size={15} /> },
  { id: "contact", label: "Contact", icon: <Mail size={15} /> },
];

// ── Social links ──────────────────────────────────────────
const SOCIAL_LINKS = [
  { href: "https://github.com/Mohamedismaell", icon: <Github size={17} /> },
  { href: "https://www.linkedin.com/in/mohamed-ismail-dev", icon: <Linkedin size={17} /> },
  { href: "https://discord.com/users/406180177261887489", icon: <SiDiscord size={17} /> },
  { href: "https://wa.me/201068645641?text=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20project.", icon: <MessageCircle size={17} /> },
];

// ── Smooth scroll ─────────────────────────────────────────
function useAnimatedScroll() {
  return (targetY: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 850;
    let startTime: number | null = null;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };
}

// ─────────────────────────────────────────────────────────

export default function ResponsiveNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const animateScroll = useAnimatedScroll();

  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide on scroll down
  useEffect(() => {
    let last = 0;
    const unsub = scrollY.on("change", (latest) => {
      setHidden(latest > last && latest > 120);
      last = latest;
    });
    return () => unsub();
  }, [scrollY]);

  // Show when mouse near top
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 80) setHidden(false);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "projects", "contact"];
    const onScroll = () => {
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (id === "home") {
      pathname === "/" ? animateScroll(0) : router.push("/");
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      animateScroll(el.getBoundingClientRect().top + window.pageYOffset - 120);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX: scrollYProgress, background: GRADIENTS.progressBar }}
      />

      {/* ── Desktop navbar ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl hidden sm:block"
        style={{
          background: GRADIENTS.navBg,
          borderBottom: `1px solid ${BORDERS.subtle}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

          {/* Nav links */}
          <div className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200"
                style={{
                  color: active === item.id
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.45)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  if (active !== item.id)
                    e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (active !== item.id)
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.icon}
                <span>{item.label}</span>

                {/* Hover underline */}
                <span
                  className="absolute inset-x-3 -bottom-px h-px rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)",
                    opacity: active === item.id ? 0 : 1,
                  }}
                />

                {/* Active underline */}
                {active === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: GRADIENTS.progressBar }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Socials + CV */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((link, i) => (
                <SocialIcon key={i} href={link.href}>
                  {link.icon}
                </SocialIcon>
              ))}
            </div>

            <motion.a
              href="/Mohamed_Ismael_CV.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative ml-2 px-5 py-2 rounded-xl text-sm font-semibold text-black overflow-hidden flex items-center gap-2 transition-all duration-300"
              style={{
                background: GRADIENTS.primaryBtn,
                boxShadow: SHADOWS.primaryBtn,
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
              />
              <Download size={14} className="relative z-10" />
              <span className="relative z-10">Download CV</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile top bar ── */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl sm:hidden flex items-center justify-between px-4 py-3"
        style={{
          background: GRADIENTS.navBg,
          borderBottom: `1px solid ${BORDERS.subtle}`,
        }}
      >
        {/* Logo */}
        <span
          className="text-sm font-black tracking-tighter"
          style={{
            background: GRADIENTS.heading,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Mohamed Ismael
        </span>

        {/* Burger */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${BORDERS.subtle}`,
            color: TEXT.dim,
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </motion.div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 sm:hidden"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-16 inset-x-4 z-50 sm:hidden rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10,10,10,0.97)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
              }}
            >
              <div className="flex flex-col p-4 gap-1">

                {/* Nav links */}
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                    style={{
                      color: active === item.id
                        ? "rgba(255,255,255,0.95)"
                        : TEXT.dim,
                      background: active === item.id
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = active === item.id
                        ? "rgba(255,255,255,0.06)"
                        : "transparent";
                    }}
                  >
                    {item.icon}
                    {item.label}

                    {/* Active dot */}
                    {active === item.id && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.6)" }}
                      />
                    )}
                  </motion.button>
                ))}

                {/* Divider */}
                <div
                  className="my-2 h-px rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${BORDERS.medium}, transparent)`,
                  }}
                />

                {/* Social icons */}
                <div className="flex items-center justify-center gap-3 py-1">
                  {SOCIAL_LINKS.map((link, i) => (
                    <SocialIcon key={i} href={link.href}>
                      {link.icon}
                    </SocialIcon>
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="my-2 h-px rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${BORDERS.medium}, transparent)`,
                  }}
                />

                {/* CV button */}
                <motion.a
                  href="/Mohamed_Ismael_CV.pdf"
                  target="_blank"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMobileOpen(false)}
                  className="group relative flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black overflow-hidden transition-all duration-200"
                  style={{
                    background: GRADIENTS.primaryBtn,
                    boxShadow: SHADOWS.primaryBtn,
                  }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
                  />
                  <Download size={14} className="relative z-10" />
                  <span className="relative z-10">Download CV</span>
                </motion.a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── SocialIcon ────────────────────────────────────────────
function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all duration-300"
      style={{
        x: springX,
        y: springY,
        background: "rgba(255,255,255,0.04)",
        borderColor: BORDERS.subtle,
        color: TEXT.soft,
      }}
      whileHover={{
        background: GRADIENTS.socialHover,
        borderColor: BORDERS.medium,
        boxShadow: SHADOWS.socialHover,
        color: "#ffffff",
      }}
    >
      {children}
    </motion.a>
  );
}
