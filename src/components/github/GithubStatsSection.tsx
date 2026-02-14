"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, GitBranch, Users, Star } from "lucide-react";

type GithubStats = {
  public_repos: number;
  followers: number;
  following: number;
};

export default function GithubStatsSection() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://api.github.com/users/Mohamedismaell");
        const data = await res.json();

        setStats({
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) return null;

  return (
    <section className="py-28 px-6 lg:px-20 max-w-7xl mx-auto">
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-5xl font-bold mb-16 text-white text-center"
      >
        GitHub Activity
      </motion.h2>

      {/* GLASS CARD CONTAINER (MATCH YOUR PORTFOLIO STYLE) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          relative rounded-[32px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          p-8 lg:p-12
          overflow-hidden
        "
      >
        {/* GRADIENT GLOW (same design language as skills/projects) */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #475AD733, transparent 60%),
              radial-gradient(circle at 80% 80%, #8B5CF633, transparent 60%)
            `,
          }}
        />

        {/* STATS GRID */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={<GitBranch size={22} />}
            title="Repositories"
            value={stats.public_repos}
          />

          <StatCard
            icon={<Users size={22} />}
            title="Followers"
            value={stats.followers}
          />

          <StatCard
            icon={<Github size={22} />}
            title="Following"
            value={stats.following}
          />

          <StatCard
            icon={<Star size={22} />}
            title="Status"
            value="Active"
          />
        </div>
      </motion.div>
    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
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
        hover:bg-white/10
        hover:-translate-y-1
        hover:shadow-[0_20px_60px_rgba(71,90,215,0.25)]
      "
    >
      {/* ICON */}
      <div className="flex justify-center mb-3 text-[#475AD7]">
        {icon}
      </div>

      {/* VALUE */}
      <h3 className="text-3xl font-bold text-white mb-1">
        {value}
      </h3>

      {/* TITLE */}
      <p className="text-gray-400 text-sm">
        {title}
      </p>
    </div>
  );
}
