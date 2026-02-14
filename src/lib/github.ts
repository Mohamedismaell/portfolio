export async function getGithubRepos() {
  const res = await fetch(
    "https://api.github.com/users/Mohamedismaell/repos",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data
    .filter((repo: any) =>
      ["News", "tasky", "Book_reading_flutter_app"].includes(repo.name)
    )
    .map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
    }));
}
