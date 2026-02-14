import { getGithubStats } from "@/lib/github-stats";
import GithubActivityChart from "./GithubActivityChart";
import { FolderGit2, Activity } from "lucide-react";

export default async function GithubStatsSection() {
  const stats = await getGithubStats();

  if (!stats) return null;

  return (
    <section className="py-28 px-6 lg:px-20 max-w-7xl mx-auto">
      {/* TITLE */}
      <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white text-center">
        GitHub Activity
      </h2>

      {/* MAIN GLASS CARD (MATCH PORTFOLIO STYLE) */}
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
        {/* GRADIENT GLOW (same style as skills/projects) */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, #475AD733, transparent 60%),
              radial-gradient(circle at 80% 70%, #8B5CF622, transparent 60%)
            `,
          }}
        />

        {/* STATS CARDS */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Repositories"
            value={stats.publicRepos}
            icon={<FolderGit2 size={20} />}
          />

          <StatCard
            title="Activity Level"
            value="Active"
            icon={<Activity size={20} />}
          />
        </div>

        {/* REAL ACTIVITY CHART */}
        <GithubActivityChart data={stats.activityData} />
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
  value: any;
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
        hover:shadow-[0_20px_60px_rgba(71,90,215,0.25)]
      "
    >
      <div className="flex justify-center mb-3 text-[#475AD7]">
        {icon}
      </div>

      <h3 className="text-3xl font-bold text-white mb-1">
        {value}
      </h3>

      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
}
