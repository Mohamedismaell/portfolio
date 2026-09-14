"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingWrapper() {
  const [show, setShow] = useState(true);

  const handleComplete = useCallback(() => setShow(false), []);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && <LoadingScreen onComplete={handleComplete} />}
    </AnimatePresence>
  );
}
