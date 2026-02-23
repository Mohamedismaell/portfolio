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
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { SiDiscord } from "react-icons/si";
import { GRADIENTS, SHADOWS, BORDERS, TEXT } from "@/lib/theme";

//  Nav items ─
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <Home size={15} /> },
  { id: "projects", label: "Projects", icon: <Folder size={15} /> },
  { id: "contact", label: "Contact", icon: <Mail size={15} /> },
];

//  Social links ─
const SOCIAL_LINKS = [
  {
    href: "https://github.com/Mohamedismaell",
    icon: <Github size={17} />,
  },
  {
    href: "https://www.linkedin.com/in/mohamed-ismail-dev",
    icon: <Linkedin size={17} />,
  },
  {
    href: "https://discord.com/users/406180177261887489",
    icon: <SiDiscord size={17} />,
  },
  {
    href: "https://wa.me/201068645641?text=Hello%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20project.",
    icon: <MessageCircle size={17} />,
  },
];

//  Custom smooth scroll hook 
function useAnimatedScroll() {
  const animateScroll = (targetY: number) => {
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

  return animateScroll;
}

// ─

export default function ResponsiveNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const animateScroll = useAnimatedScroll();

  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");

  //  Hide on scroll down, show on scroll up 
  useEffect(() => {
    let last = 0;
    const unsub = scrollY.on("change", (latest) => {
      setHidden(latest > last && latest > 120);
      last = latest;
    });
    return () => unsub();
  }, [scrollY]);

  //  Show when mouse approaches top 
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setHidden(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  //  Active section tracking 
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

  //  Scroll to section 
  const scrollToSection = (id: string) => {
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
      {/*  Scroll progress bar  */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: GRADIENTS.progressBar,
        }}
      />

      {/*  Navbar  */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{
          background: GRADIENTS.navBg,
          borderBottom: `1px solid ${BORDERS.subtle}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-4">

          {/*  Left: Nav links  */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible scrollbar-none">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={{
                  color:
                    active === item.id
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.45)",
                }}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>

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

          {/*  Right: Socials + CV  */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Social icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {SOCIAL_LINKS.map((link, i) => (
                <SocialIcon key={i} href={link.href}>
                  {link.icon}
                </SocialIcon>
              ))}
            </div>

            {/* CV button */}
            <motion.a
              href="/Mohamed_Ismael_CV.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="
                group relative ml-1 sm:ml-2
                px-3 sm:px-5 py-1.5 sm:py-2
                rounded-lg sm:rounded-xl
                text-xs sm:text-sm font-semibold text-black
                overflow-hidden flex items-center gap-1.5 sm:gap-2
                transition-all duration-300
              "
              style={{
                background: GRADIENTS.cvBtn,
                boxShadow: SHADOWS.cvBtn,
              }}
            >
              {/* Hover shine */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                }}
              />
              <Download size={13} className="relative z-10 sm:w-4 sm:h-4" />
              <span className="relative z-10 hidden sm:inline">Download CV</span>
              <span className="relative z-10 sm:hidden">CV</span>
            </motion.a>

          </div>
        </div>
      </motion.nav>
    </>
  );
}

//  SocialIcon 
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
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="
        relative w-8 h-8 sm:w-9 sm:h-9
        flex items-center justify-center
        rounded-lg sm:rounded-xl
        border transition-all duration-300
      "
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
