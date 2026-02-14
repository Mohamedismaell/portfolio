"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ScreenshotsModal({
    images = [],
    className = "",
    icon,
}: {
    images: string[];
    className?: string;
    icon?: ReactNode;
}) {
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
        if (open) document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "auto";
        };
    }, [open, next, prev]);

    const handleDragEnd = (_: any, info: any) => {
        const swipe = info.offset.x;
        if (swipe < -80) next();
        if (swipe > 80) prev();
    };

    return (
        <>
            {/* BUTTON */}
            <button
                onClick={() => hasImages && setOpen(true)}
                disabled={!hasImages}
                className={`${className} w-full flex items-center justify-center gap-2`}
            >
                {icon || <Images size={16} />}
                Screenshots
            </button>

            {open &&
                createPortal(
                    <div
                        className="
              fixed inset-0 z-[9999]
              bg-black/40
              backdrop-blur-xl
              flex items-center justify-center
            "
                        onClick={() => setOpen(false)}
                    >
                        {/* CLOSE */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-8 right-8 text-white/70 hover:text-white transition z-50"
                        >
                            <X size={32} />
                        </button>

                        {/* CONTENT */}
                        <div
                            className="relative w-full h-full flex flex-col items-center justify-center px-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* MAIN IMAGE (CRISP — NO BLUR BACKGROUND) */}
                            <div className="relative flex items-center justify-center w-full max-h-[80vh]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        initial={{ x: 250, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -250, opacity: 0 }}
                                        transition={{
                                            duration: 0.28,
                                            ease: "easeOut",
                                        }}
                                        className="
                      relative
                      max-w-[90vw]
                      max-h-[75vh]
                      rounded-2xl
                      overflow-hidden
                      border border-white/20
                      shadow-[0_30px_100px_rgba(0,0,0,0.8)]
                      bg-transparent
                    "
                                    >
                                        <Image
                                            src={images[index]}
                                            alt="App Screenshot"
                                            width={1400}
                                            height={2200}
                                            priority
                                            className="
                        w-auto h-auto
                        max-w-[90vw]
                        max-h-[75vh]
                        object-contain
                        rounded-2xl
                      "
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* LEFT ARROW */}
                                <button
                                    onClick={prev}
                                    className="
                    absolute left-4 md:left-12 top-1/2 -translate-y-1/2
                    bg-white/10 backdrop-blur-md
                    p-4 rounded-full
                    hover:bg-white/20
                    transition
                  "
                                >
                                    <ChevronLeft size={28} />
                                </button>

                                {/* RIGHT ARROW */}
                                <button
                                    onClick={next}
                                    className="
                    absolute right-4 md:right-12 top-1/2 -translate-y-1/2
                    bg-white/10 backdrop-blur-md
                    p-4 rounded-full
                    hover:bg-white/20
                    transition
                  "
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </div>

                            {/* FLOATING GLASS THUMB SWITCHER (OUTSIDE IMAGE) */}
                            <div className="mt-10 w-full flex justify-center">
                                <div
                                    className="
                    flex gap-3 overflow-x-auto
                    px-6 py-4
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    backdrop-blur-2xl
                    shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                  "
                                >
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            className={`
                        relative
                        w-20 h-32
                        rounded-xl
                        overflow-hidden
                        border
                        transition-all duration-300
                        shrink-0
                        ${i === index
                                                    ? "border-white scale-105"
                                                    : "border-white/20 opacity-60 hover:opacity-100"
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
