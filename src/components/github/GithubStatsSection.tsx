import { getGithubStats } from "@/lib/github-stats";

export default async function GithubStatsSection() {
  const stats = await getGithubStats();

  if (!stats) return null;

  return (
    <section className="py-24 px-6 lg:px-20 max-w-6xl mx-auto">
      <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-white">
        GitHub Activity
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Repositories" value={stats.public_repos} />
        <StatCard title="Followers" value={stats.followers} />
        <StatCard title="Following" value={stats.following} />
        <StatCard title="Profile" value="Active" />
      </div>
    </section>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur hover:bg-white/10 transition duration-300">
      <h3 className="text-3xl font-bold text-blue-400 mb-2">
        {value}
      </h3>
      <p className="text-gray-400">{title}</p>
    </div>
  );
}
