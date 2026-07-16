"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

type SectionItem = {
  label?: string;
  title: string;
  description: string;
  features?: string[];
  image: string;
};

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
  }),
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
  const [direction, setDirection] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize(window.innerWidth >= 1024 ? 2 : 1);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [pageSize]);

  if (!safeSections.length) return null;

  const totalPages = Math.ceil(safeSections.length / pageSize);
  const start = page * pageSize;
  const visibleSections = safeSections.slice(start, start + pageSize);

  const goTo = (nextPage: number, nextDirection: number) => {
    setDirection(nextDirection);

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
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[11px] font-[800] uppercase tracking-[0.08em] sm:text-[12px]"
              style={{ color: TEXT.badge }}
            >
              Features & Screens
            </p>

            <h2
              className="mt-1 text-[1.35rem] font-[800] leading-[1.15] tracking-[-0.03em] sm:text-[1.55rem] lg:text-[1.75rem]"
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
              onClick={() => goTo(page - 1, -1)}
              aria-label="Previous screens"
              className="flex h-10 w-10 items-center justify-center rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: GRADIENTS.ghostBtn,
                border: `1px solid ${BORDERS.subtle}`,
                color: TEXT.primary,
                boxShadow: SHADOWS.ghostBtn,
              }}
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              onClick={() => goTo(page + 1, 1)}
              aria-label="Next screens"
              className="flex h-10 w-10 items-center justify-center rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: GRADIENTS.ghostBtn,
                border: `1px solid ${BORDERS.subtle}`,
                color: TEXT.primary,
                boxShadow: SHADOWS.ghostBtn,
              }}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={`${page}-${pageSize}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:gap-8"
            >
              {visibleSections.map((section, localIndex) => {
                const absoluteIndex = start + localIndex;

                return (
                  <article
                    key={`${section.title}-${absoluteIndex}`}
                    className="flex min-w-0 flex-col rounded-[24px] px-4 py-4 sm:px-5 sm:py-5"
                    style={{
                      background: GRADIENTS.cardBg,
                      border: `1px solid ${BORDERS.subtle}`,
                      boxShadow: SHADOWS.ghostBtn,
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span
                        className="text-[1.55rem] font-[900] leading-none tracking-[-0.07em] sm:text-[1.75rem]"
                        style={{ color: "var(--accent)" }}
                      >
                        {String(absoluteIndex + 1).padStart(2, "0")}
                      </span>

                      <h3
                        className="mt-2 text-[1.12rem] font-[800] leading-[1.12] tracking-[-0.04em] sm:text-[1.25rem]"
                        style={{ color: TEXT.primary }}
                      >
                        {section.title}
                      </h3>
                    </div>

                    <p
                      className="mt-3 text-center text-[13px] font-[500] leading-[1.72] sm:mt-3.5 sm:text-[14px]"
                      style={{ color: TEXT.soft }}
                    >
                      {section.description}
                    </p>

                    {!!section.features?.length && (
                      <div className="mt-4 grid gap-2.5">
                        {section.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <span
                              className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                              style={{
                                background: "var(--accent)",
                                boxShadow: "0 0 0 4px rgba(239,157,87,0.12)",
                              }}
                            />

                            <p
                              className="text-[12.5px] font-[600] leading-[1.55] sm:text-[13px]"
                              style={{ color: TEXT.primary }}
                            >
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-start justify-center">
                      <div className="relative aspect-[10/20.2] w-[34%] sm:w-[28%] lg:w-[24%] xl:w-[28%]">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-contain object-top"
                          sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 150px"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {visibleSections.length === 2 && pageSize === 2 ? (
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 lg:block"
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
                  onClick={() => {
                    setDirection(index > page ? 1 : -1);
                    setPage(index);
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "24px" : "8px",
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
            onClick={() => goTo(page - 1, -1)}
            aria-label="Previous screens"
            className="flex h-10 w-10 items-center justify-center rounded-[14px]"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ArrowLeft size={15} />
          </button>

          <button
            type="button"
            onClick={() => goTo(page + 1, 1)}
            aria-label="Next screens"
            className="flex h-10 w-10 items-center justify-center rounded-[14px]"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}