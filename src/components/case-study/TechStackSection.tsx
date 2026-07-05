"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Code2,
  Database,
  Globe,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

interface TechCategory {
  title: string;
  items: string[];
}

interface Props {
  stack: TechCategory[];
}

function getCategoryIcon(title: string) {
  const value = title.toLowerCase();

  if (value.includes("frontend") || value.includes("ui") || value.includes("client")) {
    return Code2;
  }
  if (value.includes("backend") || value.includes("api") || value.includes("server")) {
    return Globe;
  }
  if (value.includes("data") || value.includes("database") || value.includes("storage")) {
    return Database;
  }
  if (value.includes("auth") || value.includes("security")) {
    return ShieldCheck;
  }
  if (value.includes("architecture") || value.includes("workflow")) {
    return Workflow;
  }

  return Boxes;
}

export default function TechStackSection({ stack }: Props) {
  if (!stack?.length) return null;

  const totalItems = stack.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <section
      className="rounded-[30px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
      style={{
        background: GRADIENTS.solidCard,
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: SHADOWS.card,
      }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p
            className="text-[11px] font-[800] uppercase tracking-[0.08em] sm:text-[12px]"
            style={{ color: TEXT.badge }}
          >
            Tech Stack
          </p>

          <h2
            className="mt-1 text-[1.8rem] font-[800] leading-[0.96] tracking-[-0.06em] sm:text-[2rem] lg:text-[2.25rem]"
            style={{ color: TEXT.primary }}
          >
            Tools behind the product
          </h2>

          <p
            className="mt-3 max-w-[56ch] text-[13px] font-[500] leading-[1.78] sm:text-[14px]"
            style={{ color: TEXT.soft }}
          >
            The project combines product-facing technologies, scalable app
            architecture, and integration-ready tools chosen for speed,
            maintainability, and long-term growth.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-fit sm:grid-cols-3">
          <div
            className="rounded-[18px] px-4 py-3"
            style={{
              background: GRADIENTS.cardBg,
              border: `1px solid ${BORDERS.subtle}`,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <p
              className="text-[1.2rem] font-[900] leading-none tracking-[-0.05em]"
              style={{ color: TEXT.primary }}
            >
              {stack.length}
            </p>
            <p
              className="mt-1 text-[10px] font-[800] uppercase tracking-[0.06em]"
              style={{ color: TEXT.soft }}
            >
              Categories
            </p>
          </div>

          <div
            className="rounded-[18px] px-4 py-3"
            style={{
              background: GRADIENTS.cardBg,
              border: `1px solid ${BORDERS.subtle}`,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <p
              className="text-[1.2rem] font-[900] leading-none tracking-[-0.05em]"
              style={{ color: TEXT.primary }}
            >
              {totalItems}
            </p>
            <p
              className="mt-1 text-[10px] font-[800] uppercase tracking-[0.06em]"
              style={{ color: TEXT.soft }}
            >
              Technologies
            </p>
          </div>

          <div
            className="rounded-[18px] px-4 py-3 col-span-2 sm:col-span-1"
            style={{
              background: GRADIENTS.badge,
              border: `1px solid ${BORDERS.medium}`,
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            <p
              className="text-[1.2rem] font-[900] leading-none tracking-[-0.05em]"
              style={{ color: TEXT.badge }}
            >
              Ready
            </p>
            <p
              className="mt-1 text-[10px] font-[800] uppercase tracking-[0.06em]"
              style={{ color: TEXT.badge }}
            >
              Production Focus
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stack.map((category, index) => {
          const Icon = getCategoryIcon(category.title);

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.38, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-[24px] p-4 sm:p-5"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.card,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                  style={{
                    background: GRADIENTS.primaryBtn,
                    border: `1px solid ${BORDERS.medium}`,
                    color: TEXT.inverse,
                    boxShadow: SHADOWS.primaryBtn,
                  }}
                >
                  <Icon size={17} />
                </span>

                <div className="min-w-0">
                  <p
                    className="text-[14px] font-[800] tracking-[-0.03em] sm:text-[15px]"
                    style={{ color: TEXT.primary }}
                  >
                    {category.title}
                  </p>
                  <p
                    className="mt-1 text-[11px] font-[600]"
                    style={{ color: TEXT.soft }}
                  >
                    {category.items.length} tools
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((tech, techIndex) => (
                  <motion.span
                    key={`${category.title}-${tech}-${techIndex}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.22,
                      delay: index * 0.05 + techIndex * 0.025,
                    }}
                    className="rounded-full px-3 py-1.5 text-[10px] font-[700] sm:text-[11px]"
                    style={{
                      background: GRADIENTS.ghostBtn,
                      border: `1px solid ${BORDERS.subtle}`,
                      color: TEXT.primary,
                      boxShadow: SHADOWS.ghostBtn,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}