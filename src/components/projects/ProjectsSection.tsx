"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { projectsMap } from "@/data/projects-map";
import {
  ArrowRight,
  Github,
  Check,
  Plane,
  BookOpen,
  CheckCircle2,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" as const },
  },
};

function getCaseStudyHref(slug: string) {
  return `/en/projects/${slug}`;
}

function getProjectIcon(slug: string) {
  if (slug.toLowerCase().includes("trip")) return Plane;
  if (slug.toLowerCase().includes("read")) return BookOpen;
  return CheckCircle2;
}

export default function ProjectsSection() {
  const projects = Object.values(projectsMap);
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

  const galleryScrollRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveGalleryIndex = () => {
    if (isProgrammaticScrollRef.current) return;

    const el = galleryScrollRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(childCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentGalleryIndex(closestIndex);
  };

  const scrollGalleryToIndex = (index: number) => {
    const el = galleryScrollRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    const target = children[index];
    if (!target) return;

    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }

    isProgrammaticScrollRef.current = true;
    setCurrentGalleryIndex(index);

    const targetScroll =
      target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (!galleryImages?.length) return;

    const nextIndex =
      direction === "right"
        ? Math.min(currentGalleryIndex + 1, galleryImages.length - 1)
        : Math.max(currentGalleryIndex - 1, 0);

    scrollGalleryToIndex(nextIndex);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = galleryScrollRef.current;
    if (!el) return;

    isProgrammaticScrollRef.current = false;

    dragStateRef.current = {
      isDragging: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };

    setIsDraggingGallery(true);
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = galleryScrollRef.current;
    const state = dragStateRef.current;

    if (!el || !state.isDragging) return;

    const delta = e.clientX - state.startX;
    el.scrollLeft = state.scrollLeft - delta;
  };

  const handlePointerUp = () => {
    dragStateRef.current.isDragging = false;
    setIsDraggingGallery(false);
    updateActiveGalleryIndex();
  };

  const handleImageLoad = (
    src: string,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;

    const ratio = naturalWidth / naturalHeight;

    setImageRatios((prev) => {
      if (prev[src]) return prev;
      return { ...prev, [src]: ratio };
    });
  };

  useEffect(() => {
    if (!galleryImages?.length) return;

    setCurrentGalleryIndex(0);
    isProgrammaticScrollRef.current = true;

    requestAnimationFrame(() => {
      galleryScrollRef.current?.scrollTo({
        left: 0,
        behavior: "auto",
      });

      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 300);
    });
  }, [galleryImages]);

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SectionWrapper id="projects" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1260px]">
        <div className="mb-6 px-1 sm:mb-8 sm:px-2">
          <p
            className="text-[10px] font-[800] uppercase tracking-[0.12em] sm:text-[11px]"
            style={{ color: TEXT.badge }}
          >
            Featured Projects
          </p>

          <h2
            className="mt-2 max-w-[11ch] text-[1.95rem] font-[900] leading-[0.96] tracking-[-0.065em] sm:text-[2.35rem] lg:text-[3rem]"
            style={{ color: TEXT.primary }}
          >
            Selected work that blends product thinking and engineering.
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {projects.map((project: any) => {
            const highlights = (project.highlights || []).slice(0, 4);
            const tech = (project.tech || []).slice(0, 5);
            const caseStudyHref = getCaseStudyHref(project.slug);
            const githubHref = project.github || null;
            const hasGallery =
              Array.isArray(project.gallery) && project.gallery.length > 0;
            const Icon = getProjectIcon(project.slug);

            return (
              <motion.article
                key={project.slug}
                variants={cardVariants}
                className="rounded-[26px] p-3 sm:rounded-[30px] sm:p-4 lg:p-5"
                style={{
                  background: GRADIENTS.solidCard,
                  border: `1px solid ${BORDERS.subtle}`,
                  boxShadow: SHADOWS.card,
                }}
              >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:gap-5 xl:grid-cols-[268px_minmax(0,1fr)_320px]">
                  <div className="overflow-hidden rounded-[20px]">
                    <div
                      className="relative aspect-[1.06/1] overflow-hidden rounded-[20px]"
                      style={{
                        background: GRADIENTS.cardBg,
                        boxShadow: SHADOWS.ghostBtn,
                        border: `1px solid ${BORDERS.subtle}`,
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={false}
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 268px"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(20,14,9,0.08) 100%)",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="flex min-w-0 flex-col justify-between py-1 lg:border-r lg:pr-5"
                    style={{ borderColor: BORDERS.subtle }}
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                          style={{
                            background: GRADIENTS.badge,
                            border: `1px solid ${BORDERS.medium}`,
                            color: "var(--accent)",
                          }}
                        >
                          <Icon size={17} strokeWidth={2.2} />
                        </span>

                        <div className="min-w-0">
                          <h3
                            className="text-[1.22rem] font-[850] leading-[1.02] tracking-[-0.05em] sm:text-[1.45rem]"
                            style={{ color: TEXT.primary }}
                          >
                            {project.title}
                          </h3>

                          <p
                            className="mt-1 text-[11px] font-[700] sm:text-[12px]"
                            style={{ color: TEXT.soft }}
                          >
                            {project.role}
                          </p>
                        </div>
                      </div>

                      <p
                        className="mt-3.5 max-w-[64ch] text-[12.5px] font-[500] leading-[1.78] sm:text-[13.5px] lg:text-[14px]"
                        style={{ color: TEXT.soft }}
                      >
                        {project.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {tech.map((item: string) => (
                          <span
                            key={item}
                            className="rounded-full px-3 py-1.5 text-[10px] font-[700] sm:text-[10.5px]"
                            style={{
                              background: GRADIENTS.ghostBtn,
                              border: `1px solid ${BORDERS.subtle}`,
                              color: TEXT.primary,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between py-1 lg:pl-1">
                    <ul className="flex flex-col gap-2.5">
                      {highlights.map((item: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[11.5px] font-[600] leading-[1.58] sm:text-[12.5px]"
                          style={{ color: TEXT.primary }}
                        >
                          <span
                            className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                            style={{
                              background: GRADIENTS.badge,
                              color: TEXT.badge,
                              border: `1px solid ${BORDERS.medium}`,
                            }}
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link
                        href={caseStudyHref}
                        className="inline-flex h-[36px] items-center gap-1.5 rounded-[12px] px-3.5 text-[11px] font-[800] transition-transform duration-300 hover:-translate-y-0.5"
                        style={{
                          background: GRADIENTS.primaryBtn,
                          border: `1px solid ${BORDERS.medium}`,
                          color: TEXT.inverse,
                          boxShadow: SHADOWS.primaryBtn,
                        }}
                      >
                        <span>Full Project</span>
                        <ArrowRight size={13} />
                      </Link>

                      {hasGallery && (
                        <button
                          onClick={() => {
                            setGalleryImages(project.gallery);
                            setGalleryTitle(project.title);
                            setCurrentGalleryIndex(0);
                          }}
                          className="inline-flex h-[36px] items-center gap-1.5 rounded-[12px] px-3.5 text-[11px] font-[700] transition-transform duration-300 hover:-translate-y-0.5"
                          style={{
                            background: GRADIENTS.ghostBtn,
                            border: `1px solid ${BORDERS.subtle}`,
                            color: TEXT.primary,
                            boxShadow: SHADOWS.ghostBtn,
                          }}
                        >
                          <Images size={13} style={{ color: TEXT.badge }} />
                          <span>Preview</span>
                        </button>
                      )}

                      {githubHref ? (
                        <a
                          href={githubHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub`}
                          className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[12px] transition-transform duration-300 hover:-translate-y-0.5"
                          style={{
                            background: GRADIENTS.ghostBtn,
                            border: `1px solid ${BORDERS.subtle}`,
                            color: TEXT.primary,
                            boxShadow: SHADOWS.ghostBtn,
                          }}
                        >
                          <Github size={14} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {galleryImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:px-4 sm:py-6"
            style={{
              background: "rgba(10, 8, 7, 0.64)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={() => {
              setGalleryImages(null);
              setIsDraggingGallery(false);
              setCurrentGalleryIndex(0);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 18 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-[1540px] max-h-[92vh] overflow-y-auto px-0 sm:px-4 md:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="overflow-hidden rounded-[20px] sm:rounded-[26px]"
                style={{
                  background: GRADIENTS.solidCard,
                  border: `1px solid ${BORDERS.medium}`,
                  boxShadow: SHADOWS.card,
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4"
                  style={{ borderBottom: `1px solid ${BORDERS.subtle}` }}
                >
                  <h3
                    className="text-[13px] font-[800] tracking-tight sm:text-[15px]"
                    style={{ color: TEXT.primary }}
                  >
                    {galleryTitle}
                  </h3>

                  <button
                    onClick={() => {
                      setGalleryImages(null);
                      setIsDraggingGallery(false);
                      setCurrentGalleryIndex(0);
                    }}
                    aria-label="Close gallery"
                    className="flex h-9 w-9 items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-105"
                    style={{
                      background: GRADIENTS.ghostBtn,
                      border: `1px solid ${BORDERS.subtle}`,
                      color: TEXT.soft,
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="px-2 py-4 sm:px-4 sm:py-6 lg:px-6">
                  <div
                    ref={galleryScrollRef}
                    onScroll={updateActiveGalleryIndex}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className={`no-scrollbar flex items-center overflow-x-auto px-1 select-none ${
                      isDraggingGallery ? "cursor-grabbing" : "cursor-grab"
                    } snap-x snap-mandatory`}
                    style={{
                      gap: "16px",
                      overscrollBehaviorX: "contain",
                      touchAction: "pan-y",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {galleryImages.map((img, idx) => {
                      const isActive = idx === currentGalleryIndex;
                      const ratio = imageRatios[img];
                      const isLandscape = !!ratio && ratio > 1.15;

                      const widthStyle = isLandscape
                        ? "min(92vw, 880px)"
                        : "min(78vw, 340px)";
                      const minWidthStyle = isLandscape ? "280px" : "220px";

                      return (
                        <motion.div
                          key={`${img}-${idx}`}
                          onClick={() => {
                            if (isDraggingGallery) return;
                            scrollGalleryToIndex(idx);
                          }}
                          animate={{
                            scale: isActive ? 1 : 0.965,
                            opacity: isActive ? 1 : 0.72,
                            y: isActive ? 0 : 6,
                          }}
                          transition={{
                            duration: 0.28,
                            ease: "easeOut",
                          }}
                          className="relative shrink-0 snap-center overflow-hidden rounded-[18px] sm:rounded-[22px] cursor-pointer"
                          style={{
                            width: widthStyle,
                            height: "min(76vh, 720px)",
                            minWidth: minWidthStyle,
                            minHeight: "380px",
                            background: GRADIENTS.cardBg,
                            border: `1px solid ${
                              isActive ? BORDERS.medium : BORDERS.subtle
                            }`,
                            boxShadow: isActive ? SHADOWS.card : SHADOWS.ghostBtn,
                            transition:
                              "width 0.25s ease, min-width 0.25s ease",
                          }}
                        >
                          <Image
                            src={img}
                            alt={`${galleryTitle} preview ${idx + 1}`}
                            fill
                            draggable={false}
                            onLoad={(e) => handleImageLoad(img, e)}
                            className="pointer-events-none object-contain object-center"
                            sizes="(max-width: 640px) 92vw, 880px"
                          />

                          <motion.div
                            animate={{ opacity: isActive ? 0 : 0.14 }}
                            transition={{ duration: 0.25 }}
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 100%)",
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6">
                    <button
                      type="button"
                      onClick={() => scrollGallery("left")}
                      aria-label="Previous preview"
                      disabled={currentGalleryIndex === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 sm:h-10 sm:w-10"
                      style={{
                        background: GRADIENTS.ghostBtn,
                        border: `1px solid ${BORDERS.subtle}`,
                        color: TEXT.primary,
                        boxShadow: SHADOWS.ghostBtn,
                        opacity: currentGalleryIndex === 0 ? 0.35 : 1,
                        pointerEvents: currentGalleryIndex === 0 ? "none" : "auto",
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-2">
                      {galleryImages.map((_, idx) => {
                        const isActive = idx === currentGalleryIndex;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => scrollGalleryToIndex(idx)}
                            aria-label={`Go to preview ${idx + 1}`}
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: isActive ? "30px" : "10px",
                              height: "10px",
                              background: isActive
                                ? GRADIENTS.primaryBtn
                                : GRADIENTS.badge,
                              border: isActive
                                ? `1px solid ${BORDERS.medium}`
                                : `1px solid ${BORDERS.subtle}`,
                              opacity: isActive ? 1 : 0.68,
                              boxShadow: isActive ? SHADOWS.ghostBtn : "none",
                            }}
                          />
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollGallery("right")}
                      aria-label="Next preview"
                      disabled={currentGalleryIndex === galleryImages.length - 1}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 sm:h-10 sm:w-10"
                      style={{
                        background: GRADIENTS.ghostBtn,
                        border: `1px solid ${BORDERS.subtle}`,
                        color: TEXT.primary,
                        boxShadow: SHADOWS.ghostBtn,
                        opacity:
                          currentGalleryIndex === galleryImages.length - 1
                            ? 0.35
                            : 1,
                        pointerEvents:
                          currentGalleryIndex === galleryImages.length - 1
                            ? "none"
                            : "auto",
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}