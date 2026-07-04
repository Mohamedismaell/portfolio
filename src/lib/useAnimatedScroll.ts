import { useCallback, useEffect, useRef } from "react";

export function useAnimatedScroll() {
  const frameRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);

  const animateScroll = useCallback((targetY: number) => {
    if (typeof window === "undefined") return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 700;
    let startTime: number | null = null;

    isAutoScrollingRef.current = true;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextY = startY + distance * ease(progress);

      window.scrollTo(0, nextY);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = null;
        isAutoScrollingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, []);

  const stopAnimation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { animateScroll, isAutoScrollingRef, stopAnimation };
}