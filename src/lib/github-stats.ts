export interface GithubStats {
    publicRepos: number;
    totalCommits: number;
    monthlyCommits: { month: string; commits: number }[];
}
//  Dec → Jan order 
const MONTHS = ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb", "Jan"];



const FALLBACK: GithubStats = {
    publicRepos: 27,
    totalCommits: 433,
    monthlyCommits: MONTHS.map((month) => ({ month, commits: 0 })),
};

export async function getGithubStats(): Promise<GithubStats> {
    try {
        const headers: HeadersInit = {
            "User-Agent": "Portfolio-App",
            ...(process.env.GITHUB_TOKEN && {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
        };

        //  Repos 
        const repoRes = await fetch(
            `https://api.github.com/users/Mohamedismaell/repos?per_page=100`,
            {
                headers,
                next: { revalidate: 3600, tags: ["github-stats"] },
            }
        );
        const repos = repoRes.ok ? await repoRes.json() : [];

        //  Contributions 
        const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/Mohamedismaell?y=last`,
            {
                next: { revalidate: 3600, tags: ["github-stats"] },
            }
        );

        //  Build Jan → Dec map 
        const monthlyMap: Record<string, number> = {};
        MONTHS.forEach((m) => (monthlyMap[m] = 0));

        let totalCommits = 0;

        if (contribRes.ok) {
            const json = await contribRes.json();
            const days: { date: string; count: number }[] = json.contributions || [];

            days.forEach((day) => {
                const month = new Date(day.date).toLocaleString("en-US", { month: "short" });
                if (monthlyMap[month] !== undefined) {
                    monthlyMap[month] += day.count;
                }
                totalCommits += day.count;
            });
        }

        return {
            publicRepos: Array.isArray(repos) ? repos.length : 0,
            totalCommits,
            monthlyCommits: MONTHS.map((month) => ({ month, commits: monthlyMap[month] })),
        };

    } catch (error) {
        console.error("GitHub stats error:", error);
        return FALLBACK;
    }
}
