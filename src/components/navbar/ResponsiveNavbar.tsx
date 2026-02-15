"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
} from "framer-motion";
import {
  Home,
  Folder,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Disc,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { SiDiscord } from "react-icons/si";

export default function ResponsiveNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");

  /* ================= AUTO HIDE ================= */
  useEffect(() => {
    let last = 0;

    const unsub = scrollY.on("change", (latest) => {
      if (latest > last && latest > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      last = latest;
    });

    return () => unsub();
  }, [scrollY]);

  /* ===== SHOW NAV IF MOUSE NEAR TOP ===== */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setHidden(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ================= ACTIVE SECTION ================= */
  useEffect(() => {
    const sections = ["home", "projects", "contact"];

    const handleScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop - 200;
        if (window.scrollY >= top) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SMOOTH SCROLL ================= */
  const animateScroll = (targetY: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 850;
    let startTime: number | null = null;

    const ease = (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const eased = ease(percent);

      window.scrollTo(0, startY + distance * eased);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const smoothScrollTo = (id: string) => {
    const scrollToSection = () => {
      if (id === "home") {
        animateScroll(0);
        return;
      }

      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const absoluteY = rect.top + window.pageYOffset - 120;

      animateScroll(absoluteY);
    };

    // 🔥 FIX: Navigate with hash so it knows target section
    if (pathname !== "/") {
      router.push(`/#${id}`);

      setTimeout(() => {
        scrollToSection();
      }, 600);
    } else {
      scrollToSection();
    }
  };

  /* ================= NAV ITEMS ================= */
  const navItems = [
    { id: "home", label: "Home", icon: <Home size={16} /> },
    { id: "projects", label: "Projects", icon: <Folder size={16} /> },
    { id: "contact", label: "Contact", icon: <Mail size={16} /> },
  ];

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#475AD7] to-[#8B5CF6] z-[60]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35 }}
        className="
          fixed top-0 w-full z-50
          backdrop-blur-xl bg-[#0B0F19]/80
          border-b border-white/10
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center gap-6">

          {/* NAV BUTTONS */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => smoothScrollTo(item.id)}
              className="relative flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              {item.icon}
              {item.label}

              {active === item.id && (
                <motion.div
                  layoutId="underline"
                  className="
                    absolute -bottom-2 left-0 right-0 h-[3px]
                    bg-gradient-to-r from-[#475AD7] to-[#8B5CF6]
                    rounded-full
                  "
                />
              )}
            </button>
          ))}

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 ml-6">
            <SocialIcon href="https://github.com/Mohamedismaell">
              <Github size={18} />
            </SocialIcon>

            <SocialIcon href="https://www.linkedin.com/in/mohamed-ismail-dev">
              <Linkedin size={18} />
            </SocialIcon>

            <SocialIcon href="https://discord.com/users/406180177261887489">
              <SiDiscord size={18} />
            </SocialIcon>

            <SocialIcon href="https://wa.me/201068645641?text=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20project.
">
              <MessageCircle size={18} />
            </SocialIcon>
          </div>
          {/* DOWNLOAD CV BUTTON */}
          <motion.a
            href="/Mohamed_Ismael_CV.pdf"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="
    relative ml-6
    px-5 py-2.5
    rounded-xl
    text-sm font-semibold text-white
    overflow-hidden
    backdrop-blur-xl
    border border-white/10
    transition-all duration-300
  "
          >
            {/* Gradient Background */}
            <span
              className="
      absolute inset-0
      bg-gradient-to-r from-[#475AD7] to-[#8B5CF6]
      opacity-90
    "
            />

            {/* Glow Pulse */}
            <motion.span
              className="absolute inset-0 rounded-xl border border-white/20"
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <span className="relative z-10 flex items-center gap-2">
              <Download size={16} />
              Download CV
            </span>
          </motion.a>

        </div>
      </motion.nav>
    </>
  );
}

/* ================= SOCIAL CARD ================= */

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="
        relative w-10 h-10 flex items-center justify-center
        rounded-xl backdrop-blur-xl bg-white/5
        border border-white/10 text-white
        hover:border-[#8B5CF6]/60
        hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]
        transition-all duration-300
      "
    >
      {children}
    </motion.a>
  );
}
