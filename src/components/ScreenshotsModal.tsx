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

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };

        if (open) {
            window.addEventListener("keydown", handleKey);
            document.body.style.overflow = "hidden";
        }

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

            {open &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-2xl flex flex-col items-center justify-center"
                        onClick={() => setOpen(false)} // click outside closes
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-8 right-8 text-white/70 hover:text-white transition z-50"
                        >
                            <X size={32} />
                        </button>


                        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full" />


                        <div
                            className="relative flex flex-col items-center justify-center w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        initial={{ x: 400, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -400, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 25,
                                        }}
                                        className="
                      relative
                      w-[340px]
                      sm:w-[420px]
                      md:w-[520px]
                      lg:w-[580px]
                      h-[640px]
                      sm:h-[760px]
                      md:h-[860px]
                      drop-shadow-[0_50px_140px_rgba(0,0,0,0.9)]
                    "
                                    >
                                        <Image
                                            src={images[index]}
                                            alt="App Screenshot"
                                            fill
                                            priority
                                            className="object-contain rounded-3xl"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <button
                                    onClick={prev}
                                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition"
                                >
                                    <ChevronLeft size={28} />
                                </button>

                                <button
                                    onClick={next}
                                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </div>

                            <div className="mt-6 w-full flex justify-center px-4">
                                <div className="
                  flex gap-3 overflow-x-auto max-w-full
                  bg-black/40 backdrop-blur-md
                  px-4 py-3 rounded-2xl border border-white/10
                ">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            className={`
                        relative
                        w-14 h-24 sm:w-16 sm:h-28
                        rounded-lg overflow-hidden border transition shrink-0
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
