import { getGithubStats } from "@/lib/github-stats";
import { FolderGit2, GitCommit } from "lucide-react";
import MonthlyCommitsChart from "./MonthlyCommitsChart";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";
import GradientText from "@/components/ui/GradientText";
import { GRADIENTS, BORDERS, TEXT, SHADOWS } from "@/lib/theme";

export default async function GithubStatsSection() {
  const stats = await getGithubStats();

  return (
    <SectionWrapper id="github">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <SectionBadge label="Open Source Activity" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-4">
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              GitHub Activity
            </GradientText>
          </h2>

          <SectionDivider delay={0.3} className="w-24 mb-5 mx-auto" />

          <p
            className="text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ color: TEXT.dim }}
          >
            A live snapshot of my open source contributions and
            commit activity over the last 12 months.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10 sm:mb-14">
          <StatCard
            title="Repositories"
            value={stats.publicRepos}
            icon={<FolderGit2 size={18} />}
          />
          <StatCard
            title="Commits This Year"
            value={stats.totalCommits}
            icon={<GitCommit size={18} />}
          />
        </div>


        {/* ── Chart ── */}
        <div
          className="rounded-2xl p-5 sm:p-7"
          style={{
            background: GRADIENTS.solidCard,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          <MonthlyCommitsChart data={stats.monthlyCommits} />
        </div>

      </div>
    </SectionWrapper>
  );
}

// ── Stat card ────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 sm:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: GRADIENTS.solidCard,
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: SHADOWS.card,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.02)",
          boxShadow: `inset 0 0 0 1px ${BORDERS.medium}`,
        }}
      />

      {/* Icon */}
      <div
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${BORDERS.subtle}`,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {icon}
      </div>

      {/* Value */}
      <span
        className="text-2xl sm:text-4xl font-black tracking-tighter"
        style={{
          background: GRADIENTS.heading,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>

      {/* Label */}
      <p
        className="text-[9px] sm:text-xs tracking-widest uppercase font-medium text-center leading-tight"
        style={{ color: TEXT.muted }}
      >
        {title}
      </p>
    </div>
  );

}
