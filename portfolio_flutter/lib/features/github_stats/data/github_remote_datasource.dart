import 'package:dio/dio.dart';
import 'models/github_stats_model.dart';

class GithubRemoteDataSource {
  final Dio dio;
  final String username = 'Mohamedismaell';

  GithubRemoteDataSource(this.dio);

  Future<GithubStatsModel> getStats() async {
    try {
      // 1. Fetch user repos count
      final userRes = await dio.get('https://api.github.com/users/$username');
      final publicRepos = userRes.data['public_repos'] as int;

      // 2. Fetch events to calculate commits (Mocking some for demo since GH Events API is complex to aggregate over 12 months)
      // Real implementation would either query GraphQL API or use a backend proxy since REST Events API only gives 90 days.
      // For this migration, we will mock the chart data to match the visual of the Next.js app, 
      // but fetch the real repo count.
      
      final totalCommits = 450; // Mock total
      
      final monthlyCommits = [
        const MonthlyCommit(month: 'Jan', count: 20),
        const MonthlyCommit(month: 'Feb', count: 35),
        const MonthlyCommit(month: 'Mar', count: 40),
        const MonthlyCommit(month: 'Apr', count: 15),
        const MonthlyCommit(month: 'May', count: 50),
        const MonthlyCommit(month: 'Jun', count: 80),
        const MonthlyCommit(month: 'Jul', count: 65),
        const MonthlyCommit(month: 'Aug', count: 90),
        const MonthlyCommit(month: 'Sep', count: 45),
        const MonthlyCommit(month: 'Oct', count: 30),
        const MonthlyCommit(month: 'Nov', count: 55),
        const MonthlyCommit(month: 'Dec', count: 70),
      ];

      return GithubStatsModel(
        publicRepos: publicRepos,
        totalCommits: totalCommits,
        monthlyCommits: monthlyCommits,
      );
    } catch (e) {
      throw Exception('Failed to load GitHub stats');
    }
  }
}
