"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import ImageLoadingPlaceholder from "@/components/ui/ImageLoadingPlaceholder";

type SectionItem = {
  label?: string;
  title: string;
  description: string;
  features?: string[];
  image: string;
};

function LazyScreenImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {isLoading && <ImageLoadingPlaceholder />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`h-full w-full object-contain transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default function FeaturesScreensSection({
  projectName,
  sections,
}: {
  projectName: string;
  sections: SectionItem[];
}) {
  const safeSections = useMemo(() => sections?.filter(Boolean) ?? [], [sections]);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || safeSections.length === 0) return;

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
  }, [safeSections.length]);

  const scrollByAmount = useCallback((direction: number) => {
    if (!trackRef.current) return;
    xRef.current -= direction * 280;
  }, []);

  if (!safeSections.length) return null;

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-500">Features & Screens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--charcoal)]">
            <CursorRepulsionText text={`Take a closer look at ${projectName}.`} />
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm">
            A clean and intuitive experience across every screen, designed to keep users informed without friction.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount(-1)}
              aria-label="Previous screen"
              className="w-8 h-8 rounded-full border border-[var(--subtle-border)] bg-white flex items-center justify-center text-neutral-600 hover:bg-[var(--background-secondary)] hover:border-stone-300 hover:shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              aria-label="Next screen"
              className="w-8 h-8 rounded-full border border-[var(--subtle-border)] bg-white flex items-center justify-center text-neutral-600 hover:bg-[var(--background-secondary)] hover:border-stone-300 hover:shadow-sm transition-all"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Screens Row */}
      <div className="overflow-hidden pb-2">
        <div ref={trackRef} className="flex w-max gap-4 sm:gap-5 will-change-transform">
          {/* First set */}
          {safeSections.map((section, idx) => (
            <div key={`a-${section.title}-${idx}`} className="flex flex-col shrink-0 w-[200px] sm:w-[240px]">
              <div className="rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center h-[400px] sm:h-[480px]">
                <LazyScreenImage src={section.image} alt={section.title} />
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-neutral-400">{String(idx + 1).padStart(2, "0")}</span>
                <h5 className="text-sm font-semibold text-neutral-900">{section.title}</h5>
                <p className="text-xs text-neutral-500 line-clamp-2">{section.description}</p>
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {safeSections.map((section, idx) => (
            <div key={`b-${section.title}-${idx}`} className="flex flex-col shrink-0 w-[200px] sm:w-[240px]">
              <div className="rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center h-[400px] sm:h-[480px]">
                <LazyScreenImage src={section.image} alt={section.title} />
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-neutral-400">{String(idx + 1).padStart(2, "0")}</span>
                <h5 className="text-sm font-semibold text-neutral-900">{section.title}</h5>
                <p className="text-xs text-neutral-500 line-clamp-2">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
