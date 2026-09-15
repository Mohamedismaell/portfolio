"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const NUMBERS = [
  { value: "4+", labelKey: "projectsBuilt" as const },
  { value: "50+", labelKey: "publishedConcepts" as const },
  { value: "15+", labelKey: "techUsed" as const },
  { value: "100%", labelKey: "handsOn" as const },
];

const FOCUS_CARDS = [
  {
    color: "emerald",
    tagKey: "coreFocus" as const,
    titleKey: "coreFocusTitle" as const,
    descKey: "coreFocusDesc" as const,
    skills: ["Flutter", "Dart", "Clean Architecture", "State Management", "Responsive UI"],
  },
  {
    color: "purple",
    tagKey: "continuousPractice" as const,
    titleKey: "continuousTitle" as const,
    descKey: "continuousDesc" as const,
    skills: ["Backend Integration", "Local Storage", "AI APIs", "Product Design"],
  },
];

export default function CredentialsSection() {
  const t = useTranslations("credentials");

  return (
    <section className="bg-[var(--dark-section)] text-white py-24 px-4 sm:px-6 mt-16 border-t border-stone-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-10 border-b border-stone-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">{t("eyebrow")}</span>
            <h2 className="font-editorial text-5xl sm:text-7xl text-white mt-2">
              {t("title")} <br />
              <span className="font-editorial-italic text-stone-400">{t("titleItalic")}</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md text-stone-400 text-sm leading-relaxed">
            {t("description")}
          </div>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {NUMBERS.map((num) => (
            <motion.div
              key={num.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-l border-stone-800 pl-6"
            >
              <div className="text-4xl sm:text-5xl font-editorial text-white">{num.value}</div>
              <div className="text-xs text-stone-400 uppercase tracking-wider font-mono mt-1">{t(num.labelKey)}</div>
            </motion.div>
          ))}
        </div>

        {/* Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOCUS_CARDS.map((card) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#151722] border border-[#212433] rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <span className={`text-xs font-mono uppercase tracking-wider text-${card.color}-400`}>
                  {t(card.tagKey)}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3">{t(card.titleKey)}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">{t(card.descKey)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded bg-stone-800/90 border border-stone-700/60 text-[11px] text-stone-300 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-800 text-xs text-stone-500 font-mono">
                {card.skills.slice(0, 3).join(" · ")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
