"use client";

import { Cpu, GitBranch, Layers3 } from "lucide-react";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";

type TechCategory = {
  title: string;
  items: string[];
};

type CardItem = {
  key: string;
  title: string;
  eyebrow: string;
  icon: React.ReactNode;
  items: string[];
};

function OverviewCard({
  title,
  eyebrow,
  icon,
  items,
}: {
  title: string;
  eyebrow: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-[26px] p-4 sm:p-5 lg:p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: "0 24px 70px rgba(0,0,0,0.34)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 42%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="text-[10px] font-[800] uppercase tracking-[0.22em]"
              style={{ color: TEXT.badge }}
            >
              {eyebrow}
            </p>

            <h3
              className="mt-2 text-[1.05rem] font-[900] tracking-[-0.04em] sm:text-[1.18rem]"
              style={{ color: TEXT.primary }}
            >
              {title}
            </h3>
          </div>

          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]"
            style={{
              background: GRADIENTS.badge,
              border: `1px solid ${BORDERS.medium}`,
              color: "var(--accent)",
              boxShadow: SHADOWS.ghostBtn,
            }}
          >
            {icon}
          </span>
        </div>

        <div
          className="mt-4 h-px w-full"
          style={{
            background: `linear-gradient(to right, ${BORDERS.medium}, transparent)`,
          }}
        />

        <div className="mt-4 space-y-3">
          {items.map((item, index) => (
            <div
              key={`${title}-${item}`}
              className="rounded-[18px] px-3.5 py-3"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${BORDERS.subtle}`,
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-[900]"
                  style={{
                    background: GRADIENTS.solidCard,
                    border: `1px solid ${BORDERS.medium}`,
                    color: TEXT.primary,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  className="pt-[2px] text-[12.5px] font-[600] leading-[1.65] sm:text-[13px]"
                  style={{ color: TEXT.soft }}
                >
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1.5 text-[10px] font-[800]"
            style={{
              background: GRADIENTS.ghostBtn,
              border: `1px solid ${BORDERS.subtle}`,
              color: TEXT.primary,
            }}
          >
            {items.length} points
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectOverviewRow({
  architecture,
  techStack,
  developmentProcess,
}: {
  architecture?: string[];
  techStack?: TechCategory[];
  developmentProcess?: string[];
}) {
  const architectureItems = architecture?.slice(0, 5) ?? [];
  const stackItems = techStack?.flatMap((group) => group.items).slice(0, 6) ?? [];
  const processItems = developmentProcess?.slice(0, 5) ?? [];

  const cards: CardItem[] = [
    {
      key: "architecture",
      title: "Architecture",
      eyebrow: "System Structure",
      icon: <Layers3 size={17} />,
      items: architectureItems,
    },
    {
      key: "stack",
      title: "Tech Stack",
      eyebrow: "Core Tools",
      icon: <Cpu size={17} />,
      items: stackItems,
    },
    {
      key: "process",
      title: "Development Process",
      eyebrow: "Workflow",
      icon: <GitBranch size={17} />,
      items: processItems,
    },
  ].filter((card) => card.items.length > 0);

  if (!cards.length) return null;

  return (
    <section
      className="relative overflow-hidden rounded-[30px] px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7"
      style={{
        background: GRADIENTS.solidCard,
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: SHADOWS.card,
      }}
    >
      <div
        className="pointer-events-none absolute left-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-5 sm:mb-6 lg:mb-7">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-[800] uppercase tracking-[0.08em]"
            style={{
              background: GRADIENTS.badge,
              border: `1px solid ${BORDERS.medium}`,
              color: TEXT.badge,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Project Blueprint
          </div>

          <h2
            className="mt-3 text-[1.5rem] font-[900] tracking-[-0.05em] sm:text-[1.8rem] lg:text-[2rem]"
            style={{ color: TEXT.primary }}
          >
            Structure, Stack, and Delivery
          </h2>

          <p
            className="mt-2 max-w-[62ch] text-[13px] font-[500] leading-[1.8] sm:text-[14px]"
            style={{ color: TEXT.soft }}
          >
            A compact view of how the project was organized, which technologies
            powered it, and the process used to bring it from concept to final
            implementation.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <OverviewCard
              key={card.key}
              title={card.title}
              eyebrow={card.eyebrow}
              icon={card.icon}
              items={card.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}