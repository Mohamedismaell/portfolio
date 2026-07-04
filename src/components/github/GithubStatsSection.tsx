import { getGithubStats } from "@/lib/github-stats";
import { FolderGit2, GitCommit, Github } from "lucide-react";
import type { ReactNode } from "react";
import MonthlyCommitsChart from "./MonthlyCommitsChart";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

export default async function GithubStatsSection() {
  const stats = await getGithubStats();

  return (
    <SectionWrapper id="github" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="rounded-[30px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
          style={{
            background: GRADIENTS.solidCard,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
            <div>
              <p
                className="text-[10px] font-[800] uppercase tracking-[0.1em] sm:text-[11px]"
                style={{ color: TEXT.badge }}
              >
                Open Source Activity
              </p>

              <h2
                className="mt-1 text-[1.75rem] font-[800] leading-[0.98] tracking-[-0.06em] sm:text-[2rem] lg:text-[2.35rem]"
                style={{ color: TEXT.primary }}
              >
                GitHub Activity
              </h2>

              <p
                className="mt-3 max-w-[54ch] text-[13px] leading-[1.8] sm:text-[14px]"
                style={{ color: TEXT.soft }}
              >
                A live snapshot of my repositories and commit activity over the
                last 12 months.
              </p>
            </div>

            <div
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[12px] sm:flex"
              style={{
                background: GRADIENTS.primaryBtn,
                color: TEXT.inverse,
                boxShadow: SHADOWS.primaryBtn,
              }}
            >
              <Github size={18} strokeWidth={2.2} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-5">
            <div className="flex flex-col gap-3">
              <StatCard
                title="Repositories"
                value={stats.publicRepos}
                icon={<FolderGit2 size={17} />}
              />

              <StatCard
                title="Commits This Year"
                value={stats.totalCommits}
                icon={<GitCommit size={17} />}
              />
            </div>

            <div
              className="rounded-[22px] p-4 sm:p-5 lg:p-6"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.card,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
                  style={{
                    background: GRADIENTS.badge,
                    color: TEXT.badge,
                    border: `1px solid ${BORDERS.medium}`,
                  }}
                >
                  <GitCommit size={16} strokeWidth={2.3} />
                </span>

                <div className="min-w-0">
                  <h3
                    className="text-[1rem] font-[800] leading-none tracking-[-0.03em] sm:text-[1.1rem]"
                    style={{ color: TEXT.primary }}
                  >
                    Monthly Commit Activity
                  </h3>

                  <p
                    className="mt-1 text-[12px] font-[600] sm:text-[13px]"
                    style={{ color: TEXT.soft }}
                  >
                    Contribution trend across the last 12 months
                  </p>
                </div>
              </div>

              <div
                className="rounded-[18px] p-3 sm:p-4"
                style={{
                  background: GRADIENTS.ghostBtn,
                  border: `1px solid ${BORDERS.subtle}`,
                  boxShadow: SHADOWS.ghostBtn,
                }}
              >
                <MonthlyCommitsChart data={stats.monthlyCommits} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div
      className="rounded-[20px] px-4 py-4 sm:px-5 sm:py-5"
      style={{
        background: GRADIENTS.cardBg,
        border: `1px solid ${BORDERS.subtle}`,
        boxShadow: SHADOWS.card,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
          style={{
            background: GRADIENTS.badge,
            color: TEXT.badge,
            border: `1px solid ${BORDERS.medium}`,
          }}
        >
          {icon}
        </span>

        <div className="min-w-0">
          <p
            className="text-[11px] font-[700] uppercase tracking-[0.08em] sm:text-[12px]"
            style={{ color: TEXT.dim }}
          >
            {title}
          </p>

          <span
            className="mt-2 block text-[1.55rem] font-[800] leading-none tracking-[-0.05em] sm:text-[1.9rem]"
            style={{ color: TEXT.primary }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}