"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BORDERS, TEXT } from "@/lib/theme";

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
        if (info.offset.x < -80) next();
        if (info.offset.x > 80) prev();
    };

    return (
        <>
            {/* ── Trigger button ── */}
            <button
                onClick={() => hasImages && setOpen(true)}
                disabled={!hasImages}
                className={`${className} w-full flex items-center justify-center gap-2 transition-colors duration-200`}
                style={{ color: hasImages ? TEXT.soft : TEXT.muted }}
            >
                {icon || <Images size={15} />}
                <span className="text-xs sm:text-sm font-medium group-hover/btn:text-white">Screenshots</span>
            </button>

            {/* ── Modal portal ── */}
            {open &&
                createPortal(
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[9999] flex flex-col"
                            style={{ background: "rgba(0,0,0,0.88)" }}
                            onClick={() => setOpen(false)}
                        >
                            {/* Backdrop blur */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backdropFilter: "blur(24px)",
                                    WebkitBackdropFilter: "blur(24px)",
                                }}
                            />

                            {/* ── TOP BAR: counter + close ── */}
                            <div
                                className="relative z-50 flex items-center justify-between px-4 sm:px-6 py-4 shrink-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Left spacer — same width as close button to keep counter centered */}
                                <div className="w-9 h-9" />

                                {/* Counter — absolutely centered */}
                                <div
                                    className="px-3 py-1 rounded-full text-xs font-mono"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: `1px solid ${BORDERS.subtle}`,
                                        color: TEXT.muted,
                                    }}
                                >
                                    {index + 1} / {images.length}
                                </div>

                                {/* Close — right side */}
                                <button
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:bg-white/10"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: `1px solid ${BORDERS.subtle}`,
                                        color: TEXT.soft,
                                    }}
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            {/* ── MIDDLE: image + nav arrows ── */}
                            <div
                                className="relative z-10 flex-1 flex items-center justify-center px-12 sm:px-16 min-h-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        initial={{ x: 60, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -60, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="relative rounded-2xl overflow-hidden"
                                        style={{
                                            border: `1px solid ${BORDERS.medium}`,
                                            boxShadow:
                                                "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
                                        }}
                                    >
                                        <Image
                                            src={images[index]}
                                            alt="App Screenshot"
                                            width={1400}
                                            height={2200}
                                            priority
                                            className="w-auto h-auto max-w-[75vw] max-h-[55vh] sm:max-h-[60vh] object-contain rounded-2xl"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Prev */}
                                <button
                                    onClick={prev}
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:bg-white/10"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: `1px solid ${BORDERS.subtle}`,
                                        color: TEXT.soft,
                                    }}
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {/* Next */}
                                <button
                                    onClick={next}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:bg-white/10"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: `1px solid ${BORDERS.subtle}`,
                                        color: TEXT.soft,
                                    }}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            {/* ── BOTTOM: thumbnail strip — always pinned to bottom ── */}
                            <div
                                className="relative z-50 shrink-0 flex justify-center px-4 py-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    className="flex gap-2 overflow-x-auto px-3 py-2.5 rounded-2xl max-w-[90vw]"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: `1px solid ${BORDERS.subtle}`,
                                        backdropFilter: "blur(12px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        // Hide scrollbar
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                    }}
                                >
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-300"
                                            style={{
                                                // ✅ Responsive thumbnail size
                                                width: "clamp(36px, 8vw, 52px)",
                                                height: "clamp(56px, 13vw, 80px)",
                                                border: `1px solid ${i === index ? BORDERS.strong : BORDERS.subtle
                                                    }`,
                                                opacity: i === index ? 1 : 0.4,
                                                transform: i === index ? "scale(1.08)" : "scale(1)",
                                                boxShadow:
                                                    i === index
                                                        ? "0 0 0 1px rgba(255,255,255,0.18)"
                                                        : "none",
                                            }}
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

                        </motion.div>
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
