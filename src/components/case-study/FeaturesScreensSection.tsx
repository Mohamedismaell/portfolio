"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

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
  const [page, setPage] = useState(0);

  if (!safeSections.length) return null;

  const pageSize = 2;
  const totalPages = Math.ceil(safeSections.length / pageSize);
  const start = page * pageSize;
  const visibleSections = safeSections.slice(start, start + pageSize);

  const goTo = (nextPage: number) => {
    if (nextPage < 0) {
      setPage(totalPages - 1);
      return;
    }

    if (nextPage >= totalPages) {
      setPage(0);
      return;
    }

    setPage(nextPage);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[11px] font-[800] uppercase tracking-[0.08em] sm:text-[12px]"
              style={{ color: TEXT.badge }}
            >
              Features & Screens
            </p>

            <h2
              className="mt-1 text-[1.45rem] font-[800] leading-[1.2] tracking-[-0.03em] sm:text-[1.65rem] lg:text-[1.85rem]"
              style={{ color: TEXT.primary }}
            >
              Take a closer look at{" "}
              <span style={{ color: "var(--accent)" }}>{projectName}</span>{" "}
              through real app screens.
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              aria-label="Previous screens"
              className="flex h-11 w-11 items-center justify-center rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: GRADIENTS.ghostBtn,
                border: `1px solid ${BORDERS.subtle}`,
                color: TEXT.primary,
                boxShadow: SHADOWS.ghostBtn,
              }}
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() => goTo(page + 1)}
              aria-label="Next screens"
              className="flex h-11 w-11 items-center justify-center rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: GRADIENTS.ghostBtn,
                border: `1px solid ${BORDERS.subtle}`,
                color: TEXT.primary,
                boxShadow: SHADOWS.ghostBtn,
              }}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <div className="grid w-full gap-4 xl:grid-cols-2 xl:gap-8">
            {visibleSections.map((section, localIndex) => {
              const absoluteIndex = start + localIndex;

              return (
                <motion.article
                  key={`${section.title}-${page}-${absoluteIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: localIndex * 0.06,
                    ease: "easeOut",
                  }}
                  className="flex h-full min-w-0 flex-col rounded-[24px] px-4 py-4 sm:px-5 sm:py-5"
                  style={{
                    background: GRADIENTS.cardBg,
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.ghostBtn,
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full text-[1.65rem] font-[900] tracking-[-0.06em]"
                      style={{
                        background: GRADIENTS.badge,
                        border: `1px solid ${BORDERS.medium}`,
                        color: "var(--accent)",
                        boxShadow: SHADOWS.ghostBtn,
                      }}
                    >
                      {String(absoluteIndex + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className="mt-4 text-[1.22rem] font-[800] leading-[1.1] tracking-[-0.04em] sm:text-[1.38rem]"
                      style={{ color: TEXT.primary }}
                    >
                      {section.title}
                    </h3>
                  </div>

                  <p
                    className="mt-4 min-h-[88px] text-[14px] font-[500] leading-[1.8] sm:text-[15px]"
                    style={{ color: TEXT.soft }}
                  >
                    {section.description}
                  </p>

                  {!!section.features?.length && (
                    <div className="mt-4 grid gap-3">
                      {section.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <span
                            className="mt-[8px] h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{
                              background: "var(--accent)",
                              boxShadow: "0 0 0 4px rgba(239,157,87,0.12)",
                            }}
                          />

                          <p
                            className="text-[13px] font-[600] leading-[1.6] sm:text-[14px]"
                            style={{ color: TEXT.primary }}
                          >
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-7 flex flex-1 items-start justify-center">
                    <div className="relative aspect-[10/20.2] w-[58%] sm:w-[48%] lg:w-[44%] xl:w-[52%]">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 640px) 52vw, (max-width: 1024px) 34vw, 280px"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {visibleSections.length === 2 ? (
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 xl:block"
              style={{
                width: "1px",
                background: `linear-gradient(to bottom, transparent, ${BORDERS.medium}, transparent)`,
              }}
            />
          ) : null}
        </div>

        {totalPages > 1 ? (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const isActive = index === page;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to page ${index + 1}`}
                  onClick={() => setPage(index)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "28px" : "8px",
                    height: "8px",
                    background: isActive
                      ? GRADIENTS.primaryBtn
                      : GRADIENTS.badge,
                    border: isActive
                      ? `1px solid ${BORDERS.medium}`
                      : `1px solid ${BORDERS.subtle}`,
                    opacity: isActive ? 1 : 0.72,
                    boxShadow: isActive ? SHADOWS.ghostBtn : "none",
                  }}
                />
              );
            })}
          </div>
        ) : null}

        <div className="flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            aria-label="Previous screens"
            className="flex h-10 w-10 items-center justify-center rounded-[14px]"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            aria-label="Next screens"
            className="flex h-10 w-10 items-center justify-center rounded-[14px]"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}