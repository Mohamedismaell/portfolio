"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface LetterState {
  x: number;
  y: number;
  blur: number;
}

interface CursorRepulsionTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
}

const REPEL_RADIUS = 80;
const REPEL_STRENGTH = 35;
const SPRING = 0.12;
const FRICTION = 0.78;
const BLUR_TRIGGER = 30;

function stepFrame(
  velocities: { x: number; y: number }[],
  targets: { x: number; y: number }[],
  setLetters: React.Dispatch<React.SetStateAction<LetterState[]>>
): boolean {
  let stillMoving = false;

  setLetters((prev) => {
    const next = prev.map((letter, i) => {
      const vx = (velocities[i].x + (targets[i].x - letter.x) * SPRING) * FRICTION;
      const vy = (velocities[i].y + (targets[i].y - letter.y) * SPRING) * FRICTION;
      velocities[i].x = vx;
      velocities[i].y = vy;

      if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) stillMoving = true;

      const dist = Math.sqrt(
        (targets[i].x - letter.x) ** 2 + (targets[i].y - letter.y) ** 2
      );
      const blur = dist > BLUR_TRIGGER ? Math.min((dist - BLUR_TRIGGER) * 0.08, 4) : 0;

      return { x: letter.x + vx, y: letter.y + vy, blur };
    });
    return next;
  });

  return stillMoving;
}

export default function CursorRepulsionText({
  text,
  className = "",
  letterClassName = "",
}: CursorRepulsionTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [letters, setLetters] = useState<LetterState[]>(
    Array.from({ length: text.length }, () => ({ x: 0, y: 0, blur: 0 }))
  );
  const rafRef = useRef<number>(0);
  const velocitiesRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: text.length }, () => ({ x: 0, y: 0 }))
  );
  const targetRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: text.length }, () => ({ x: 0, y: 0 }))
  );
  const loopRef = useRef<() => void>(() => {});

  useEffect(() => {
    loopRef.current = () => {
      const moving = stepFrame(velocitiesRef.current, targetRef.current, setLetters);
      if (moving) {
        rafRef.current = requestAnimationFrame(loopRef.current);
      } else {
        // Snap letters to exact target positions
        const targets = targetRef.current;
        setLetters((prev) =>
          prev.map((letter, i) => ({
            x: targets[i].x,
            y: targets[i].y,
            blur: 0,
          }))
        );
        // Reset velocities
        velocitiesRef.current = Array.from({ length: text.length }, () => ({ x: 0, y: 0 }));
      }
    };
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text.length]);

  const startAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loopRef.current);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-letter]");

      spans.forEach((span, i) => {
        const spanRect = span.getBoundingClientRect();
        const letterCenterX = spanRect.left - rect.left + spanRect.width / 2;
        const letterCenterY = spanRect.top - rect.top + spanRect.height / 2;

        const dx = letterCenterX - mouseX;
        const dy = letterCenterY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const angle = Math.atan2(dy, dx);
          targetRef.current[i] = {
            x: Math.cos(angle) * force,
            y: Math.sin(angle) * force,
          };
        } else {
          targetRef.current[i] = { x: 0, y: 0 };
        }
      });

      startAnimation();
    },
    [startAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = Array.from({ length: text.length }, () => ({ x: 0, y: 0 }));
    startAnimation();
  }, [startAnimation, text.length]);

  return (
    <span
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-default ${className}`}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-letter
          className={`inline-block transition-[filter] duration-100 will-change-transform ${letterClassName}`}
          style={{
            transform: `translate(${letters[i].x}px, ${letters[i].y}px)`,
            filter: letters[i].blur > 0 ? `blur(${letters[i].blur}px)` : "none",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
