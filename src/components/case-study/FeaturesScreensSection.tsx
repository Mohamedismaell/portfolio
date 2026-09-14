"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";

type SectionItem = {
  label?: string;
  title: string;
  description: string;
  features?: string[];
  image: string;
};

export default function FeaturesScreensSection({
  projectName,
  sections,
}: {
  projectName: string;
  sections: SectionItem[];
}) {
  const safeSections = useMemo(() => sections?.filter(Boolean) ?? [], [sections]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !safeSections.length) return;

    autoScrollRef.current = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      if (el.scrollLeft >= maxScroll - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollLeft += 1;
      }
    }, 33);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [safeSections.length]);

  const scrollByAmount = useCallback((direction: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction * 280, behavior: "smooth" });
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
              className="w-8 h-8 rounded-full border border-[var(--subtle-border)] bg-white flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              aria-label="Next screen"
              className="w-8 h-8 rounded-full border border-[var(--subtle-border)] bg-white flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Screens Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-2"
      >
        {safeSections.map((section, idx) => (
          <div key={`${section.title}-${idx}`} className="flex flex-col shrink-0 w-[200px] sm:w-[240px]">
            <div className="rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center h-[400px] sm:h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-contain"
              />
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
  );
}
