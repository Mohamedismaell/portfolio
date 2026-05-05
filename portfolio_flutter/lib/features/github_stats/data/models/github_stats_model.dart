class GithubStatsModel {
  final int publicRepos;
  final int totalCommits;
  final List<MonthlyCommit> monthlyCommits;

  const GithubStatsModel({
    required this.publicRepos,
    required this.totalCommits,
    required this.monthlyCommits,
  });
}

class MonthlyCommit {
  final String month;
  final int count;

  const MonthlyCommit({required this.month, required this.count});
}
