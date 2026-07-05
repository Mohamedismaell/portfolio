"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

interface ChallengeItem {
  title: string;
  challenge: string;
  solution: string;
}

interface Props {
  items: ChallengeItem[];
}

export default function ChallengesTimeline({ items }: Props) {
  if (!items?.length) return null;

  return (
    <section
      className="rounded-[30px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
      style={{
        background: GRADIENTS.solidCard,
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: SHADOWS.card,
      }}
    >
      <div className="max-w-[780px]">
        <p
          className="text-[11px] font-[800] uppercase tracking-[0.08em] sm:text-[12px]"
          style={{ color: TEXT.badge }}
        >
          Challenges & Solutions
        </p>

        <h2
          className="mt-1 text-[1.8rem] font-[800] leading-[0.96] tracking-[-0.06em] sm:text-[2rem] lg:text-[2.25rem]"
          style={{ color: TEXT.primary }}
        >
          Turning product obstacles into clear decisions
        </h2>

        <p
          className="mt-3 text-[13px] font-[500] leading-[1.78] sm:text-[14px]"
          style={{ color: TEXT.soft }}
        >
          Every strong product has trade-offs. These are some of the important
          implementation challenges in the project and the decisions used to
          solve them in a practical, scalable way.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item, index) => (
          <motion.article
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.38, delay: index * 0.06, ease: "easeOut" }}
            className="rounded-[26px] p-4 sm:p-5"
            style={{
              background: GRADIENTS.cardBg,
              border: `1px solid ${BORDERS.subtle}`,
              boxShadow: SHADOWS.card,
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
              <div className="lg:w-[220px] lg:shrink-0">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[14px]"
                    style={{
                      background: GRADIENTS.primaryBtn,
                      border: `1px solid ${BORDERS.medium}`,
                      color: TEXT.inverse,
                      boxShadow: SHADOWS.primaryBtn,
                    }}
                  >
                    <Sparkles size={18} />
                  </span>

                  <div>
                    <p
                      className="text-[10px] font-[800] uppercase tracking-[0.08em]"
                      style={{ color: TEXT.badge }}
                    >
                      Case {(index + 1).toString().padStart(2, "0")}
                    </p>

                    <h3
                      className="mt-1 text-[1rem] font-[800] leading-[1.05] tracking-[-0.04em] sm:text-[1.08rem]"
                      style={{ color: TEXT.primary }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <div
                  className="rounded-[20px] px-4 py-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,120,90,0.10) 0%, rgba(255,120,90,0.04) 100%)",
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.ghostBtn,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(255,120,90,0.14)",
                        border: "1px solid rgba(255,120,90,0.18)",
                        color: "#ff865e",
                      }}
                    >
                      <AlertCircle size={15} />
                    </span>

                    <p
                      className="text-[11px] font-[800] uppercase tracking-[0.08em]"
                      style={{ color: TEXT.primary }}
                    >
                      Challenge
                    </p>
                  </div>

                  <p
                    className="mt-3 text-[12.5px] font-[600] leading-[1.72] sm:text-[13.5px]"
                    style={{ color: TEXT.soft }}
                  >
                    {item.challenge}
                  </p>
                </div>

                <div
                  className="rounded-[20px] px-4 py-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(101,198,131,0.12) 0%, rgba(101,198,131,0.05) 100%)",
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.ghostBtn,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(101,198,131,0.14)",
                        border: "1px solid rgba(101,198,131,0.18)",
                        color: "#52b76f",
                      }}
                    >
                      <CheckCircle2 size={15} />
                    </span>

                    <p
                      className="text-[11px] font-[800] uppercase tracking-[0.08em]"
                      style={{ color: TEXT.primary }}
                    >
                      Solution
                    </p>
                  </div>

                  <p
                    className="mt-3 text-[12.5px] font-[600] leading-[1.72] sm:text-[13.5px]"
                    style={{ color: TEXT.soft }}
                  >
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}