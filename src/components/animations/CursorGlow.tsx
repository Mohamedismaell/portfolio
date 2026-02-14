"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-40 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-75"
      style={{
        transform: `translate(${position.x - 80}px, ${position.y - 80}px)`,
      }}
    />
  );
}
