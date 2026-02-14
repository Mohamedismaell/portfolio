// src/lib/github-stats.ts

export interface GithubStats {
  publicRepos: number;
  totalCommits: number;
  contributionData: number[][];
  topRepos: { name: string; commits: number }[];
}

export async function getGithubStats(): Promise<GithubStats> {
  const username = "Mohamedismaell";
  const headers: HeadersInit = {
    "User-Agent": "Nextjs-Portfolio",
    "Accept": "application/vnd.github.v3+json",
    // Uncomment and add your token in .env if you hit rate limits
    // "Authorization": `token ${process.env.GITHUB_TOKEN}`,
  };

  try {
    // 1️⃣ Get Repositories (Top 10 recently updated)
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      { headers, next: { revalidate: 3600 } }
    );
    const repos = repoRes.ok ? await repoRes.json() : [];

    // 2️⃣ Get Contributions Heatmap
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );

    let contributionData: number[][] = [];
    let totalCommits = 0;

    if (contribRes.ok) {
      const json = await contribRes.json();
      totalCommits = json.total?.lastYear || 0;

      const days = json.contributions;
      const grid: number[][] = [];
      let currentWeek: number[] = [];

      days.forEach((day: any) => {
        currentWeek.push(day.count);
        if (currentWeek.length === 7) {
          grid.push(currentWeek);
          currentWeek = [];
        }
      });

      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) currentWeek.push(0);
        grid.push(currentWeek);
      }
      contributionData = grid.slice(-52);
    } else {
      // Fallback empty grid if API fails
      contributionData = Array.from({ length: 52 }, () => Array(7).fill(0));
    }

    // 3️⃣ Get Commit Activity for Top Repos (For the Chart)
    const topReposData = await Promise.all(
      repos.slice(0, 6).map(async (repo: any) => {
        try {
          const statsRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/stats/participation`,
            { headers, next: { revalidate: 3600 } }
          );

          if (!statsRes.ok) return { name: repo.name, commits: 0 };

          const stats = await statsRes.json();
          // Sum up weekly owner commits
          const ownerCommits = stats.owner ? stats.owner.reduce((a: number, b: number) => a + b, 0) : 0;

          return { name: repo.name, commits: ownerCommits };
        } catch (e) {
          return { name: repo.name, commits: 0 };
        }
      })
    );

    return {
      publicRepos: repos.length,
      totalCommits,
      contributionData,
      topRepos: topReposData.filter(r => r.commits > 0),
    };

  } catch (error) {
    console.error("GitHub stats error:", error);
    return {
      publicRepos: 0,
      totalCommits: 0,
      contributionData: Array.from({ length: 52 }, () => Array(7).fill(0)),
      topRepos: [],
    };
  }
}
