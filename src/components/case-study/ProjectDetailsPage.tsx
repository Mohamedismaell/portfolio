"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@/i18n/routing";
import CursorRepulsionText from "@/components/ui/CursorRepulsionText";
import FadeIn from "@/components/ui/FadeIn";
import ContactModal from "@/components/contact/ContactModal";
import FeaturesScreensSection from "./FeaturesScreensSection";
import ChallengesGrid from "./ChallengesGrid";
import ProjectOverviewRow from "./ProjectOverviewRow";
import AutoPlayScreens from "./AutoPlayScreens";

type ProjectStat = { label: string; value: string };
type ProjectFact = { label: string; value: string };
type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: "github" | "external" | "app-store" | "google-play";
  disabled?: boolean;
};
type ProjectChallenge = {
  icon?: string;
  title?: string;
  challenge: string;
  solution: string;
};
type ProjectResults = {
  screens?: string;
  features?: string;
  linesOfCode?: string;
  rating?: string;
  githubUrl?: string;
};

type ProjectType = {
  slug: string;
  title: string;
  shortDescription: string;
  role?: string;
  image?: string;
  heroCover?: string;
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
  tech?: string[];
  sections?: {
    label?: string;
    title: string;
    description: string;
    features?: string[];
    image: string;
  }[];
  challenges?: ProjectChallenge[];
  results?: ProjectResults;
  techStack?: { title: string; items: string[] }[];
  developmentProcess?: string[];
};

function GithubIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function AppStoreIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.69-.9 2.73 1 .08 2.03-.51 2.59-1.22z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 01-.61-.395V2.21c.193-.162.403-.298.609-.396zM15.207 13.414l2.586 2.586-12.793 7.379 10.207-9.965zM17.793 8l-2.586 2.586L5 0.621 17.793 8zM16.621 12l2.965-2.965c.586-.586 1.414-.586 2 0l.414.414a1.414 1.414 0 010 2l-2.414 2.414-2.965-2.965a1.414 1.414 0 010-1.098v.2z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function isYouTubeUrl(src: string) {
  try {
    const hostname = new URL(src).hostname.replace("www.", "");
    return hostname === "youtu.be" || hostname === "youtube.com" || hostname === "m.youtube.com";
  } catch {
    return false;
  }
}

function getYouTubeId(url: string) {
  try {
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }
    const u = new URL(url);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
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
      { value: `${project.gallery?.length || project.heroScreens?.length || 0}+`, label: "Screens" },
      { value: `${project.sections?.length || 0}+`, label: "Flows" },
      { value: `${project.techStack?.reduce((acc, item) => acc + item.items.length, 0) || 0}+`, label: "Technologies" },
      { value: `${project.challenges?.length || 0}+`, label: "Challenges" },
    ];
  }, [project]);

  const quickFacts = useMemo(() => {
    if (project.quickFacts?.length) {
      return project.quickFacts.filter((fact) => fact.label.trim().toLowerCase() !== "year").slice(0, 4);
    }
    const fallback: ProjectFact[] = [];
    if (project.role) fallback.push({ label: "Role", value: project.role });
    if (project.gallery?.length || project.heroScreens?.length) {
      fallback.push({ label: "Preview Set", value: `${project.gallery?.length || project.heroScreens?.length} screens` });
    }
    return fallback.slice(0, 4);
  }, [project.quickFacts, project.role, project.gallery, project.heroScreens]);

  // Always show GitHub, App Store, Google Play — lock if no link
  const ctaLinks = useMemo(() => {
    return [
      {
        label: "GitHub",
        href: project.github || "",
        variant: "primary" as const,
        icon: "github" as const,
        disabled: !project.github,
      },
      {
        label: "App Store",
        href: project.appStore || "",
        variant: "secondary" as const,
        icon: "app-store" as const,
        disabled: !project.appStore,
      },
      {
        label: "Google Play",
        href: project.googlePlay || "",
        variant: "secondary" as const,
        icon: "google-play" as const,
        disabled: !project.googlePlay,
      },
    ];
  }, [project.github, project.appStore, project.googlePlay]);

  // Separate YouTube videos from regular screen images
  const { regularScreens, liveDemoUrl } = useMemo(() => {
    const screens = project.heroScreens?.filter(Boolean) ?? [];
    const yt = screens.find((s) => isYouTubeUrl(s));
    return {
      regularScreens: screens.filter((s) => !isYouTubeUrl(s)),
      liveDemoUrl: yt || null,
    };
  }, [project.heroScreens]);

  const liveDemoVideoId = liveDemoUrl ? getYouTubeId(liveDemoUrl) : null;

  const normalizedChallenges = useMemo<ProjectChallenge[]>(() => {
    if (!project.challenges?.length) return [];
    return project.challenges.map((item, index) => ({
      icon: item.icon,
      title: item.title?.trim() || `Challenge ${String(index + 1).padStart(2, "0")}`,
      challenge: item.challenge,
      solution: item.solution,
    }));
  }, [project.challenges]);

  const headingBadge = project.eyebrow || "Featured Project";
  const introText = project.overview || project.shortDescription;
  const subheading = project.subtitle || project.role;

  return (
    <>
    <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
      {/* ─── Top Navigation ─── */}
      <header className="flex items-center justify-between mb-12 sm:mb-16">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-800 bg-white border border-[var(--subtle-border)] rounded-full hover:bg-[var(--background-secondary)] hover:border-stone-300 hover:shadow-sm transition-all shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          <span>Back to Projects</span>
        </button>

        <div className="relative hidden sm:flex items-center">
          <div className="text-right pr-6 font-script text-neutral-500 text-xl leading-tight">
            {subheading || "Case Study"}
          </div>
          <svg className="w-12 h-10 text-neutral-400 -rotate-12 translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 60 40">
            <path d="M5,10 C25,5 45,15 50,30" strokeDasharray="2 3" strokeLinecap="round" strokeWidth={1.8} />
            <path d="M43,32 L51,32 L51,24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
          </svg>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <FadeIn delay={0.1}>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-12 lg:mb-16">
        {/* Left Column */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-600">{headingBadge}</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl font-serif text-[var(--charcoal)] tracking-tight"><CursorRepulsionText text={project.title} /></h1>
            <p className="font-serif-italic text-2xl sm:text-3xl text-neutral-600 font-normal"><CursorRepulsionText text={subheading || ""} /></p>
          </div>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">{introText}</p>

          {quickFacts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {quickFacts.map((fact) => (
                <div key={`${fact.label}-${fact.value}`} className="bg-white border border-[var(--subtle-border)] rounded-xl p-3 text-center">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium">{fact.label}</span>
                  <span className="text-xs font-semibold text-neutral-900 mt-0.5 block">{fact.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons — always show all 3, lock if no link */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {ctaLinks.map((link) => {
              const isDisabled = !!link.disabled || !link.href;
              const isPrimary = link.variant === "primary";

              const iconEl = link.icon === "github" ? <GithubIcon /> : link.icon === "app-store" ? <AppStoreIcon /> : <GooglePlayIcon />;

              if (isDisabled) {
                return (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-2 bg-white border border-[var(--subtle-border)] text-neutral-400 px-4 py-2.5 rounded-full text-xs font-medium opacity-50 cursor-not-allowed"
                  >
                    <span className="relative inline-flex items-center justify-center">
                      {iconEl}
                      <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white border border-neutral-300">
                        <LockIcon />
                      </span>
                    </span>
                    <span>{link.label}</span>
                  </span>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                    isPrimary
                      ? "bg-neutral-900 text-white hover:opacity-90 hover:shadow-md"
                      : "bg-white border border-[var(--subtle-border)] text-neutral-800 hover:bg-[var(--background-secondary)] hover:border-stone-300 hover:shadow-sm"
                  }`}
                >
                  {iconEl}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-[var(--subtle-border)]/60">
            {stats.map((item) => (
              <div key={item.label}>
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900">{item.value}</span>
                <span className="block text-xs text-neutral-500 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Screens or Hero Cover */}
        <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center relative py-6">
          <div className="relative w-[340px] sm:w-[380px] h-[520px]">
            {regularScreens.length ? (
              <AutoPlayScreens screens={regularScreens} />
            ) : project.heroCover ? (
              <div className="flex items-center justify-center h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroCover}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : project.image ? (
              <div className="flex items-center justify-center h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ─── Live Demo Video (Full Width) ─── */}
      {ready && liveDemoVideoId && (
        <FadeIn>
          <section className="mb-16">
            <div className="bg-white border border-[var(--subtle-border)] rounded-2xl p-4 sm:p-6 soft-card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-500">Live Demo</span>
              </div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900">
                <iframe
                  src={`https://www.youtube.com/embed/${liveDemoVideoId}`}
                  title={`${project.title} live demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ─── Features & Screens ─── */}
      {ready && project.sections?.length ? (
        <FadeIn>
          <section className="mb-24 lg:mb-32">
            <FeaturesScreensSection projectName={project.title} sections={project.sections} />
          </section>
        </FadeIn>
      ) : null}

      {/* ─── What I Built ─── */}
      {ready && (project.features?.length || project.tech?.length || project.developmentProcess?.length) ? (
        <FadeIn>
          <section className="mb-24 lg:mb-32">
            <ProjectOverviewRow
              architecture={project.features}
              tech={project.tech}
              developmentProcess={project.developmentProcess}
            />
          </section>
        </FadeIn>
      ) : null}

      {/* ─── Challenges & Solutions ─── */}
      {ready && normalizedChallenges.length > 0 ? (
        <FadeIn>
          <section className="mb-24 lg:mb-32">
            <ChallengesGrid challenges={normalizedChallenges} highlights={sidebarHighlights} />
          </section>
        </FadeIn>
      ) : null}

      {/* ─── Footer CTA ─── */}
      {ready && (
        <footer className="pt-12 pb-6 border-t border-[var(--subtle-border)]/80">
          <div className="text-center py-12 relative max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-400 block mb-2">Next Project</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[var(--charcoal)] tracking-tight">
              <CursorRepulsionText text="Let's build something unforgettable." />
            </h2>
            <div className="flex items-center justify-center gap-3 mt-8">
              <a
                href="/#projects"
                className="bg-neutral-900 text-white px-6 py-2.5 rounded-full text-xs font-medium hover:opacity-90 hover:shadow-md transition-all"
              >
                View All Projects
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                className="bg-white border border-[var(--subtle-border)] text-neutral-800 px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[var(--background-secondary)] hover:border-stone-300 hover:shadow-sm transition-all"
              >
                Let&apos;s Talk
              </button>
            </div>
            <div className="absolute right-0 sm:-right-8 top-4 hidden md:block text-right">
              <p className="font-script text-neutral-400 text-xl leading-none rotate-6">Ideas into real products.</p>
              <svg className="w-10 h-8 text-neutral-300 ml-auto mt-1 rotate-12" fill="none" stroke="currentColor" viewBox="0 0 50 30">
                <path d="M5,5 C20,2 35,15 40,25" strokeDasharray="2 3" strokeLinecap="round" strokeWidth={1.5} />
                <path d="M32,25 L40,25 L40,17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-12 mt-8 border-t border-[var(--subtle-border)]/40 text-xs text-neutral-500 gap-4">
            <div>&copy; {new Date().getFullYear()} Mohamed Ismael. All rights reserved.</div>
            <div className="flex items-center gap-6 font-medium text-neutral-600">
              <a href="https://github.com/Mohamedismaell" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/mohamed-ismail-dev" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Discord</a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">WhatsApp</a>
            </div>
          </div>
        </footer>
      )}
    </main>
    <ContactModal />
    </>
  );
}
