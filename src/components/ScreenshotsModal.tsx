"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ScreenshotsModal({ images = [] }: { images: string[] }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const hasImages = images && images.length > 0;

    const next = useCallback(() => {
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // ESC + arrows + scroll lock
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };

        window.addEventListener("keydown", handleKey);

        if (open) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "auto";
        };
    }, [open, next, prev]);

    const handleDragEnd = (_: any, info: any) => {
        const swipe = info.offset.x;
        if (swipe < -100) next();
        if (swipe > 100) prev();
    };

    return (
        <>
            {/* BUTTON */}
            <button
                onClick={() => hasImages && setOpen(true)}
                disabled={!hasImages}
                className={`
          flex items-center justify-center gap-2
          px-4 py-3 rounded-xl border transition text-sm
          ${hasImages
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        : "bg-white/5 border-white/5 text-gray-500 cursor-not-allowed"
                    }
        `}
            >
                Screenshots
            </button>

            {/* MODAL */}
            {open &&
                createPortal(
                    <div
                        className="
              fixed inset-0 z-[9999]
              bg-black/80 backdrop-blur-2xl
              flex items-center justify-center
            "
                        onClick={() => setOpen(false)}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-8 right-8 text-white/70 hover:text-white transition z-50"
                        >
                            <X size={32} />
                        </button>

                        {/* Glow background */}
                        <div className="absolute w-[700px] h-[700px] bg-blue-500/20 blur-[180px] rounded-full" />

                        {/* Content wrapper */}
                        <div
                            className="relative w-full h-full flex flex-col items-center justify-center px-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* MAIN IMAGE AREA */}
                            <div className="relative w-full flex items-center justify-center max-h-[85vh]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        initial={{ x: 500, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -500, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 240,
                                            damping: 26,
                                        }}
                                        className="
                      relative
                      w-auto
                      max-w-[95vw]
                      h-auto
                      max-h-[80vh]
                      rounded-3xl
                      overflow-hidden
                      border border-white/10
                      bg-black/30
                      backdrop-blur-xl
                      shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                    "
                                    >
                                        <Image
                                            src={images[index]}
                                            alt="App Screenshot"
                                            width={1200}
                                            height={2000}
                                            priority
                                            className="
                        w-auto h-auto
                        max-w-[95vw]
                        max-h-[80vh]
                        object-contain
                      "
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Left Arrow */}
                                <button
                                    onClick={prev}
                                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition"
                                >
                                    <ChevronLeft size={28} />
                                </button>

                                {/* Right Arrow */}
                                <button
                                    onClick={next}
                                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </div>

                            {/* THUMBNAILS */}
                            <div className="mt-8 w-full flex justify-center">
                                <div
                                    className="
                    flex gap-3 overflow-x-auto max-w-full
                    bg-black/40 backdrop-blur-md
                    px-5 py-4 rounded-2xl border border-white/10
                  "
                                >
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            className={`
                        relative
                        w-16 h-28
                        rounded-xl overflow-hidden
                        border transition shrink-0
                        ${i === index
                                                    ? "border-blue-500 scale-105"
                                                    : "border-white/10 opacity-60 hover:opacity-100"
                                                }
                      `}
                                        >
                                            <Image
                                                src={img}
                                                alt={`thumb-${i}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
