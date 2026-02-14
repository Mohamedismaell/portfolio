import { getGithubStats } from "@/lib/github-stats";
import { FolderGit2, GitCommit } from "lucide-react";
import MonthlyCommitsChart from "./MonthlyCommitsChart";

export default async function GithubStatsSection() {
  const stats = await getGithubStats();

  return (
    <section className="py-28 px-6 lg:px-20 max-w-7xl mx-auto">
      {/* TITLE */}
      <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white text-center">
        GitHub Activity
      </h2>

      {/* MAIN GLASS CARD (MATCHES YOUR PORTFOLIO STYLE) */}
      <div
        className="
          relative rounded-[32px]
          border border-white/10
          backdrop-blur-2xl
          bg-white/[0.03]
          p-8 lg:p-12
          overflow-hidden
        "
      >
        {/* PORTFOLIO GLOW */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, #475AD733, transparent 60%),
              radial-gradient(circle at 80% 70%, #8B5CF622, transparent 60%)
            `,
          }}
        />

        {/* TOP STATS */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <StatCard
            title="Active Repositories"
            value={stats.publicRepos}
            icon={<FolderGit2 size={24} />}
          />

          <StatCard
            title="Total Commits (Last Year)"
            value={stats.totalCommits}
            icon={<GitCommit size={24} />}
          />
        </div>

        <MonthlyCommitsChart data={stats.monthlyCommits} />


      </div>
    </section>
  );
}

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
      className="
        relative rounded-2xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6 text-center
        transition-all duration-300
        hover:bg-white/[0.08]
        hover:border-white/20
        hover:shadow-[0_20px_60px_rgba(71,90,215,0.25)]
        group
      "
    >
      <div className="flex justify-center mb-4 text-[#475AD7] group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <h3 className="text-4xl font-bold text-white mb-2">
        {value}
      </h3>

      <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
        {title}
      </p>
    </div>
  );
}
// Building scalable, production-grade mobile applications with Clean Architecture and modern UI systems.
//         I focus on performance, maintainable codebases, and solving complex technical challenges to deliver apps that are reliable, scalable, and user-focused.
