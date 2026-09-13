"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import { useAnimatedScroll } from "@/lib/useAnimatedScroll";

export default function EditorialBio() {
  const t = useTranslations("bio");
  const { animateScroll, stopAnimation } = useAnimatedScroll();

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (!el) return;
    stopAnimation();
    animateScroll(el.getBoundingClientRect().top + window.pageYOffset - 96);
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Side Big Statement */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal leading-[1.1] text-[var(--text-primary)]">
            <CursorRepulsionText text="I build mobile experiences" className="inline-block" />{" "}
            <CursorRepulsionText text="that refuse to be ignored." className="inline-block" />{" "}
            <CursorRepulsionText text="Bridging the gap between" className="inline-block" />{" "}
            <span className="font-editorial-italic inline-block"><CursorRepulsionText text="obsessive design" className="inline-block" /></span>{" "}
            <CursorRepulsionText text="and" className="inline-block" />{" "}
            <span className="font-editorial-italic inline-block"><CursorRepulsionText text="rock-solid production" className="inline-block" /></span>{" "}
            <span className="font-editorial-italic inline-block"><CursorRepulsionText text="Flutter code." className="inline-block" /></span>
          </h2>
        </motion.div>

        {/* Right Side Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-5 space-y-4 text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--text-soft)" }}
        >
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <div className="pt-2">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] hover:underline uppercase tracking-wider"
            >
              {t("exploreApps")} <span>↓</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
