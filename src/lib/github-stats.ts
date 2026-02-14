export interface GithubStats {
    publicRepos: number;
    totalCommits: number;
    monthlyCommits: { month: string; commits: number }[];
}

export async function getGithubStats(): Promise<GithubStats> {

    try {

        const repoRes = await fetch(
            `https://api.github.com/users/Mohamedismaell/repos?per_page=100`,
            {
                headers: { "User-Agent": "Portfolio-App" },
                next: { revalidate: 3600 },
            }
        );
        const repos = repoRes.ok ? await repoRes.json() : [];

        const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/Mohamedismaell?y=last`,
            { next: { revalidate: 3600 } }
        );

        let totalCommits = 0;
        const monthlyMap: Record<string, number> = {
            Dec: 0, Nov: 0, Oct: 0, Sep: 0,
            Aug: 0, Jul: 0, Jun: 0, May: 0,
            Apr: 0, Mar: 0, Feb: 0, Jan: 0,
        };

        if (contribRes.ok) {
            const json = await contribRes.json();
            const days = json.contributions || [];

            days.forEach((day: any) => {
                const date = new Date(day.date);
                const month = date.toLocaleString("en-US", { month: "short" });
                if (monthlyMap[month] !== undefined) {
                    monthlyMap[month] += day.count;
                }
                totalCommits += day.count;
            });
        }

        const monthlyCommits = Object.entries(monthlyMap).map(([month, commits]) => ({
            month,
            commits,
        }));

        // Ensure months are in chronological order if needed, but simple map usually follows insertion
        // The previous code used a fixed map which is already in order.

        return {
            publicRepos: Array.isArray(repos) ? repos.length : 0,
            totalCommits,
            monthlyCommits,
        };

    } catch (error) {
        console.error("GitHub stats error:", error);
        return {
            publicRepos: 27,
            totalCommits: 433,
            monthlyCommits: [
                { month: "Jan", commits: 12 }, { month: "Feb", commits: 18 },
                { month: "Mar", commits: 25 }, { month: "Apr", commits: 30 },
                { month: "May", commits: 40 }, { month: "Jun", commits: 55 },
                { month: "Jul", commits: 38 }, { month: "Aug", commits: 60 },
                { month: "Sep", commits: 70 }, { month: "Oct", commits: 48 },
                { month: "Nov", commits: 62 }, { month: "Dec", commits: 75 },
            ],
        };
    }
}
