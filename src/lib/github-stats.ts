export async function getGithubStats() {
  try {
    const username = "Mohamedismaell";

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        next: { revalidate: 3600 }, // cache 1 hour
      }
    );

    if (!res.ok) return null;

    const repos = await res.json();

    const publicRepos = repos.length;

    // Calculate commits/activity proxy (push events frequency)
    const activityData = repos
      .sort(
        (a: any, b: any) =>
          new Date(b.pushed_at).getTime() -
          new Date(a.pushed_at).getTime()
      )
      .slice(0, 12) // last 12 active repos (chart bars)
      .map((repo: any) => ({
        name: repo.name,
        activity: Math.max(
          5,
          Math.floor(
            (new Date(repo.pushed_at).getTime() -
              new Date(repo.created_at).getTime()) /
            (1000 * 60 * 60 * 24 * 30)
          )
        ), // activity score based on updates duration
      }));

    return {
      publicRepos,
      activityData,
    };
  } catch (error) {
    console.error("GitHub stats error:", error);
    return null;
  }
}
