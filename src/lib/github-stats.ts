export async function getGithubStats() {
  const username = "Mohamedismaell";

  const res = await fetch(
    `https://api.github.com/users/${username}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  return res.json();
}
