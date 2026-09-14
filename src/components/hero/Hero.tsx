"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiDiscord, SiWhatsapp } from "react-icons/si";

const SOCIAL_LINKS = [
  { href: "mailto:mohamed.ismael.dev@gmail.com", icon: Mail, label: "Email" },
  { href: "https://github.com/Mohamedismaell", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/mohamed-ismail-dev", icon: Linkedin, label: "LinkedIn" },
  { href: "https://discord.com/users/406180177261887489", icon: SiDiscord, label: "Discord" },
  { href: "https://wa.me/201026564376", icon: SiWhatsapp, label: "WhatsApp" },
];

const SHOWCASE_IMAGES = [
  { name: "Quick Read Home", image: "/projects/news/homedisplay.png" },
  { name: "Quick Read Splash", image: "/projects/news/splash.png" },
  { name: "MindTrip Explore", image: "/projects/MindTrip/normal/Device(15).png" },
  { name: "MindTrip Trip", image: "/projects/MindTrip/normal/Device(10).png" },
  { name: "TinyShelf Light", image: "/projects/book_reading/normal/light/Screenshot_1771920580-portrait.png" },
  { name: "TinyShelf Home", image: "/projects/book_reading/normal/light/Screenshot_1771920602-portrait.png" },
  { name: "Tasky Tasks", image: "/projects/tasky/normal/Screenshot_1771159896-portrait.png" },
  { name: "Tasky Splash", image: "/projects/tasky/normal/Screenshot_1771161022-portrait.png" },
];

function PhoneCard({ project, isCenter }: { project: typeof SHOWCASE_IMAGES[0]; isCenter: boolean }) {
  return (
    <div className={`phone-showcase-card shrink-0 w-44 sm:w-52 h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-xl transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-40"}`}>
      <div className="relative w-full h-full">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 176px, 208px"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const xRef = useRef(0);

  const detectCenter = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>(".phone-showcase-card");
    const viewCenter = window.innerWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - viewCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i % SHOWCASE_IMAGES.length;
      }
    });
    setCenterIdx((prev) => (prev === closest ? prev : closest));
  }, []);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      detectCenter();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [detectCenter]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    let lastTime = performance.now();
    const speed = 40;

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      xRef.current -= speed * (delta / 1000);

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0 && Math.abs(xRef.current) >= halfWidth) {
        xRef.current += halfWidth;
      }

      track.style.transform = `translateX(${xRef.current}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="pt-28 sm:pt-36 pb-16 w-full flex flex-col items-center text-center">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center w-full">
        {/* Interactive portrait with orbiting social pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-8 group cursor-pointer px-16 pt-20 pb-16 -mx-16 -mb-16 -mt-12"
          tabIndex={0}
        >
          {SOCIAL_LINKS.map((social, i) => {
            const Icon = social.icon;
            return (
              <div key={social.label} className={`orbit-item orbit-item-${i + 1}`}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-[var(--subtle-border)] shadow-lg flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 hover:scale-110 hover:bg-[var(--text-primary)] hover:text-white hover:border-[var(--text-primary)]"
                >
                  <Icon size={20} />
                </a>
              </div>
            );
          })}

          {/* Arch portrait frame */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src="/person_profile.jpg"
              alt="Mohamed Ismael"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 176px, 224px"
              priority
            />
          </div>
        </motion.div>

        {/* Editorial headline with cursor repulsion */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-editorial text-6xl sm:text-8xl md:text-9xl font-normal tracking-tight text-[var(--text-primary)] max-w-5xl leading-none"
        >
          <div className="block"><CursorRepulsionText text="Let's see" /></div>
          <div className="block mt-2"><CursorRepulsionText text="where this goes." /></div>
        </motion.div>
      </div>

      {/* Marquee of phone showcase cards */}
      <div className="w-full mt-12 sm:mt-16 relative py-6 overflow-hidden">
        <div className="w-full relative overflow-hidden mask-gradient-edges py-4">
          <div ref={trackRef} className="flex w-max items-center py-8 select-none cursor-grab active:cursor-grabbing will-change-transform">
            {/* First track */}
            <div className="flex items-center gap-5 sm:gap-7 shrink-0 pr-5 sm:pr-7">
              {SHOWCASE_IMAGES.map((project, i) => (
                <PhoneCard key={`first-${project.name}`} project={project} isCenter={i === centerIdx} />
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center gap-5 sm:gap-7 shrink-0 pr-5 sm:pr-7">
              {SHOWCASE_IMAGES.map((project, i) => (
                <PhoneCard key={`second-${project.name}`} project={project} isCenter={i === centerIdx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
