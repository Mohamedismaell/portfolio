"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  Github,
  Layers3,
  MapPin,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { useRouter } from "@/i18n/routing";
import AutoPlayScreens from "./AutoPlayScreens";
import FeaturesScreensSection from "./FeaturesScreensSection";
import ArchitectureSection from "./ArchitectureSection";
import TechStackSection from "./TechStackSection";
import ChallengesTimeline from "./ChallengesTimeline";
import { BORDERS, GRADIENTS, SHADOWS, TEXT } from "@/lib/theme";
import ProjectOverviewRow from "./ProjectOverviewRow";

type ProjectStat = {
  label: string;
  value: string;
};

type ProjectFact = {
  label: string;
  value: string;
};

type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: "github" | "external" | "app-store" | "google-play";
  disabled?: boolean;
};

type ProjectChallenge = {
  title?: string;
  challenge: string;
  solution: string;
};

type TimelineChallengeItem = {
  title: string;
  challenge: string;
  solution: string;
};

type ProjectType = {
  slug: string;
  title: string;
  shortDescription: string;
  role?: string;
  image?: string;
  heroScreens?: string[];
  gallery?: string[];
  github?: string | null;
  liveDemo?: string | null;
  appStore?: string | null;
  googlePlay?: string | null;
  year?: string;
  badges?: string[];
  eyebrow?: string;
  subtitle?: string;
  overview?: string;
  quickFacts?: ProjectFact[];
  links?: ProjectLink[];
  stats?: ProjectStat[];
  highlights?: string[];
  features?: string[];
  sections?: {
    label?: string;
    title: string;
    description: string;
    features?: string[];
    image: string;
  }[];
  challenges?: ProjectChallenge[];
  techStack?: {
    title: string;
    items: string[];
  }[];
  developmentProcess?: string[];
};
function getHighlightIcon(index: number) {
  const icons = [Sparkles, MapPin, WifiOff, Layers3, Cpu];
  return icons[index % icons.length];
}

function AppStoreIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-[6px]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#0A84FF" />
        <path
          d="M8.4 7.4h2.2l5.4 9.2h-2.2L8.4 7.4Z"
          fill="#FFFFFF"
          opacity="0.98"
        />
        <path
          d="M15.6 7.4h-2.2l-5.4 9.2h2.2l5.4-9.2Z"
          fill="#FFFFFF"
          opacity="0.98"
        />
        <rect x="6.8" y="14.9" width="10.4" height="1.8" rx="0.9" fill="#FFFFFF" />
      </svg>
    </span>
  );
}

function GooglePlayIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-[6px] bg-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4.8 3.8 13.9 12 4.8 20.2c-.4-.3-.7-.8-.7-1.5V5.3c0-.7.3-1.2.7-1.5Z" fill="#00C2FF" />
        <path d="M13.9 12 17.6 8.7c1.1.6 2.1 1.2 2.1 2.3s-1 1.7-2.1 2.3L13.9 12Z" fill="#FFB300" />
        <path d="M4.8 3.8 17.6 8.7 13.9 12 4.8 3.8Z" fill="#34A853" />
        <path d="M4.8 20.2 13.9 12 17.6 15.3 4.8 20.2Z" fill="#EA4335" />
      </svg>
    </span>
  );
}

function renderLinkIcon(icon?: ProjectLink["icon"]) {
  if (icon === "github") return <Github size={15} />;
  if (icon === "app-store") return <AppStoreIcon />;
  if (icon === "google-play") return <GooglePlayIcon />;
  return <ArrowUpRight size={15} />;
}

export default function ProjectDetailsPage({
  project,
}: {
  project: ProjectType;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
  }, []);

  const sidebarHighlights = useMemo(() => {
    if (project.highlights?.length) return project.highlights.slice(0, 6);
    if (project.features?.length) return project.features.slice(0, 6);
    return [];
  }, [project.highlights, project.features]);

  const stats = useMemo(() => {
    if (project.stats?.length) return project.stats.slice(0, 4);

    return [
      {
        value: `${project.gallery?.length || project.heroScreens?.length || 0}+`,
        label: "Screens",
      },
      {
        value: `${project.sections?.length || 0}+`,
        label: "Flows",
      },
      {
        value: `${
          project.techStack?.reduce((acc, item) => acc + item.items.length, 0) || 0
        }+`,
        label: "Technologies",
      },
      {
        value: `${project.challenges?.length || 0}+`,
        label: "Solved Cases",
      },
    ];
  }, [project]);

  const stackPreview = useMemo(() => {
    return project.techStack?.flatMap((group) => group.items).slice(0, 10) || [];
  }, [project.techStack]);

  const topPills = useMemo(() => {
    const pills: string[] = [];
    if (project.year) pills.push(project.year);
    if (project.badges?.length) pills.push(...project.badges);
    return pills;
  }, [project.year, project.badges]);

  const quickFacts = useMemo(() => {
    if (project.quickFacts?.length) return project.quickFacts.slice(0, 4);

    const fallbackFacts: ProjectFact[] = [];

    if (project.role) {
      fallbackFacts.push({ label: "Role", value: project.role });
    }

    if (project.year) {
      fallbackFacts.push({ label: "Year", value: project.year });
    }

    if (project.gallery?.length || project.heroScreens?.length) {
      fallbackFacts.push({
        label: "Preview Set",
        value: `${project.gallery?.length || project.heroScreens?.length} screens`,
      });
    }

    if (project.techStack?.length) {
      fallbackFacts.push({
        label: "Stack Groups",
        value: `${project.techStack.length}`,
      });
    }

    return fallbackFacts.slice(0, 4);
  }, [
    project.quickFacts,
    project.role,
    project.year,
    project.gallery,
    project.heroScreens,
    project.techStack,
  ]);

  const ctaLinks = useMemo(() => {
    const normalized = project.links?.length ? [...project.links] : [];

    const hasLabel = (label: string) =>
      normalized.some((item) => item.label.trim().toLowerCase() === label);

    if (!hasLabel("live demo") && project.liveDemo) {
      normalized.unshift({
        label: "Live Demo",
        href: project.liveDemo,
        variant: "primary",
        icon: "external",
      });
    }

    if (!hasLabel("github")) {
      normalized.push({
        label: "GitHub",
        href: project.github || "",
        variant: normalized.length ? "secondary" : "primary",
        icon: "github",
        disabled: !project.github,
      });
    }

    if (!hasLabel("app store")) {
      normalized.push({
        label: "App Store",
        href: project.appStore || "",
        variant: "secondary",
        icon: "app-store",
        disabled: !project.appStore,
      });
    }

    if (!hasLabel("google play")) {
      normalized.push({
        label: "Google Play",
        href: project.googlePlay || "",
        variant: "secondary",
        icon: "google-play",
        disabled: !project.googlePlay,
      });
    }

    return normalized.slice(0, 6);
  }, [project.links, project.liveDemo, project.github, project.appStore, project.googlePlay]);

  const normalizedChallenges = useMemo<TimelineChallengeItem[]>(() => {
    if (!project.challenges?.length) return [];

    return project.challenges.map((item, index) => ({
      title: item.title?.trim() || `Challenge ${String(index + 1).padStart(2, "0")}`,
      challenge: item.challenge,
      solution: item.solution,
    }));
  }, [project.challenges]);

  const headingBadge = project.eyebrow || "Featured Project";
  const introText = project.overview || project.shortDescription;
  const subheading = project.subtitle || project.role;
  const showInfoCards = sidebarHighlights.length > 0 || stackPreview.length > 0;

  return (
    <main className="px-4 pb-14 pt-[96px] sm:px-6 sm:pt-[108px] lg:px-8 lg:pb-20 lg:pt-[120px]">
      <div className="mx-auto max-w-[1320px]">
        <button
          onClick={() => router.back()}
          className="mb-5 inline-flex items-center gap-2 rounded-[14px] px-3.5 py-2.5 text-[12px] font-[700] transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: GRADIENTS.ghostBtn,
            border: `1px solid ${BORDERS.subtle}`,
            color: TEXT.soft,
            boxShadow: SHADOWS.ghostBtn,
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </button>

        <section
          className="overflow-hidden rounded-[30px] p-3 sm:rounded-[34px] sm:p-4 lg:p-5"
          style={{
            background: GRADIENTS.solidCard,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-5 xl:gap-6">
            <div className="flex min-w-0 flex-col justify-between rounded-[24px] p-4 sm:rounded-[28px] sm:p-5 lg:p-6">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-[800] uppercase tracking-[0.08em]"
                  style={{
                    background: GRADIENTS.badge,
                    border: `1px solid ${BORDERS.medium}`,
                    color: TEXT.badge,
                  }}
                >
                  <Sparkles size={12} />
                  <span>{headingBadge}</span>
                </div>

                <h1
                  className="mt-4 max-w-[10ch] text-[2.5rem] font-[900] leading-[0.92] tracking-[-0.08em] sm:text-[3.1rem] lg:text-[3.8rem]"
                  style={{ color: TEXT.primary }}
                >
                  {project.title}
                </h1>

                {subheading ? (
                  <p
                    className="mt-3 text-[0.98rem] font-[700] sm:text-[1.08rem]"
                    style={{ color: "var(--accent)" }}
                  >
                    {subheading}
                  </p>
                ) : null}

                <p
                  className="mt-4 max-w-[58ch] text-[13px] font-[500] leading-[1.86] sm:text-[14px] lg:text-[15px]"
                  style={{ color: TEXT.soft }}
                >
                  {introText}
                </p>

                {quickFacts.length ? (
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {quickFacts.map((fact) => (
                      <div
                        key={`${fact.label}-${fact.value}`}
                        className="rounded-[16px] px-3.5 py-3"
                        style={{
                          background: GRADIENTS.cardBg,
                          border: `1px solid ${BORDERS.subtle}`,
                        }}
                      >
                        <p
                          className="text-[10px] font-[800] uppercase tracking-[0.08em]"
                          style={{ color: TEXT.badge }}
                        >
                          {fact.label}
                        </p>
                        <p
                          className="mt-1 text-[13px] font-[700] leading-[1.45] sm:text-[13.5px]"
                          style={{ color: TEXT.primary }}
                        >
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {topPills.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topPills.map((item) => (
                      <span
                        key={item}
                        className="rounded-full px-3 py-1.5 text-[10px] font-[700]"
                        style={{
                          background: GRADIENTS.ghostBtn,
                          border: `1px solid ${BORDERS.subtle}`,
                          color: TEXT.primary,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}

                {ctaLinks.length ? (
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    {ctaLinks.map((link) => {
                      const isPrimary = link.variant === "primary";
                      const isDisabled = !!link.disabled || !link.href;

                      const commonClassName =
                        "inline-flex h-[48px] items-center justify-center gap-2 rounded-[15px] px-4 text-[13px] font-[800] transition-all duration-300 sm:min-w-[148px]";

                      const commonStyle = {
                        background: isPrimary
                          ? GRADIENTS.primaryBtn
                          : GRADIENTS.ghostBtn,
                        border: `1px solid ${
                          isPrimary ? BORDERS.medium : BORDERS.subtle
                        }`,
                        color: isPrimary ? TEXT.inverse : TEXT.primary,
                        boxShadow: isPrimary
                          ? SHADOWS.primaryBtn
                          : SHADOWS.ghostBtn,
                        opacity: isDisabled ? 0.5 : 1,
                        cursor: isDisabled ? "not-allowed" : "pointer",
                      } as const;

                      if (isDisabled) {
                        return (
                          <button
                            key={`${link.label}-disabled`}
                            type="button"
                            disabled
                            title={`${link.label} not available`}
                            className={commonClassName}
                            style={commonStyle}
                          >
                            {renderLinkIcon(link.icon)}
                            <span>{link.label}</span>
                          </button>
                        );
                      }

                      return (
                        <a
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${commonClassName} hover:-translate-y-0.5`}
                          style={commonStyle}
                        >
                          {renderLinkIcon(link.icon)}
                          <span>{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div
                className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
                style={{ alignSelf: "stretch" }}
              >
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[18px] px-3.5 py-3.5"
                    style={{
                      background: GRADIENTS.cardBg,
                      border: `1px solid ${BORDERS.subtle}`,
                      boxShadow: SHADOWS.ghostBtn,
                    }}
                  >
                    <p
                      className="text-[1.2rem] font-[900] leading-none tracking-[-0.05em] sm:text-[1.32rem]"
                      style={{ color: TEXT.primary }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="mt-1.5 text-[10px] font-[700] uppercase tracking-[0.06em]"
                      style={{ color: TEXT.soft }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="overflow-hidden rounded-[24px] sm:rounded-[28px]"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.card,
              }}
            >
              <div
                className="relative overflow-hidden rounded-[24px] sm:rounded-[28px]"
                style={{
                  minHeight: "420px",
                }}
              >
                {project.heroScreens?.length ? (
                  <AutoPlayScreens screens={project.heroScreens} />
                ) : project.image ? (
                  <div className="flex min-h-[420px] items-center justify-center p-5 sm:min-h-[520px] sm:p-6 lg:min-h-[640px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-auto max-h-[720px] w-full object-contain"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {ready && project.sections?.length ? (
          <section className="mt-6">
            <FeaturesScreensSection   projectName={project.title}
  sections={project.sections} />
          </section>
        ) : null}

        {showInfoCards ? (
          <section className="mt-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-5">
              {sidebarHighlights.length ? (
                <div
                  className="rounded-[24px] p-4 sm:rounded-[28px] sm:p-5"
                  style={{
                    background: GRADIENTS.cardBg,
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.ghostBtn,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                      style={{
                        background: GRADIENTS.badge,
                        border: `1px solid ${BORDERS.medium}`,
                        color: "var(--accent)",
                      }}
                    >
                      <Layers3 size={16} />
                    </span>

                    <div>
                      <h2
                        className="text-[15px] font-[900] tracking-[-0.03em] sm:text-[16px]"
                        style={{ color: TEXT.primary }}
                      >
                        Key Highlights
                      </h2>
                      <p
                        className="mt-1 text-[12px] font-[500] leading-[1.7]"
                        style={{ color: TEXT.soft }}
                      >
                        The main product strengths, UX wins, and implementation details
                        that shaped the final result.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {sidebarHighlights.map((item, index) => {
                      const Icon = getHighlightIcon(index);

                      return (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[18px] px-3.5 py-3.5"
                          style={{
                            background: GRADIENTS.solidCard,
                            border: `1px solid ${BORDERS.subtle}`,
                          }}
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px]"
                            style={{
                              background: GRADIENTS.badge,
                              border: `1px solid ${BORDERS.medium}`,
                              color: "var(--accent)",
                            }}
                          >
                            <Icon size={16} />
                          </span>

                          <p
                            className="text-[12px] font-[600] leading-[1.62] sm:text-[12.5px]"
                            style={{ color: TEXT.soft }}
                          >
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div />
              )}

              {stackPreview.length ? (
                <div
                  className="rounded-[24px] p-4 sm:rounded-[28px] sm:p-5"
                  style={{
                    background: GRADIENTS.cardBg,
                    border: `1px solid ${BORDERS.subtle}`,
                    boxShadow: SHADOWS.ghostBtn,
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
                      <Cpu size={16} />
                    </span>

                    <div>
                      <h2
                        className="text-[15px] font-[900] tracking-[-0.03em] sm:text-[16px]"
                        style={{ color: TEXT.primary }}
                      >
                        Stack Snapshot
                      </h2>
                      <p
                        className="mt-1 text-[12px] font-[500] leading-[1.7]"
                        style={{ color: TEXT.soft }}
                      >
                        The core tools and technical pieces used to build, organize,
                        and scale the project.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {stackPreview.map((item) => (
                      <span
                        key={item}
                        className="rounded-full px-3 py-1.5 text-[10px] font-[700] sm:text-[10.5px]"
                        style={{
                          background: GRADIENTS.ghostBtn,
                          border: `1px solid ${BORDERS.subtle}`,
                          color: TEXT.primary,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          </section>
        ) : null}

      {ready &&
(project.features?.length ||
  project.techStack?.length ||
  project.developmentProcess?.length) ? (
  <section className="mt-6">
    <ProjectOverviewRow
      architecture={project.features}
      techStack={project.techStack}
      developmentProcess={project.developmentProcess}
    />
  </section>
) : null}
      </div>
    </main>
  );
}