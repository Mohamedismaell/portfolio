import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../../../core/widgets/section_wrapper.dart';
import '../../../../core/widgets/section_badge.dart';
import '../../../../core/widgets/gradient_text.dart';
import '../../../../core/widgets/section_divider.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/theme/app_shadows.dart';
import '../data/github_remote_datasource.dart';
import 'cubit/github_stats_cubit.dart';
import 'widgets/stat_card.dart';
import 'widgets/monthly_commits_chart.dart';

class GithubStatsSection extends StatelessWidget {
  const GithubStatsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => GithubStatsCubit(GithubRemoteDataSource(Dio()))..fetchStats(),
      child: SectionWrapper(
        child: Column(
          children: [
            const SectionBadge(label: 'Open Source Activity'),
            const SizedBox(height: 16),
            const GradientText(
              'GitHub Activity',
              gradient: AppGradients.heading,
              style: TextStyle(fontSize: 48, fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 16),
            const SectionDivider(),
            const SizedBox(height: 16),
            const Text(
              'A live snapshot of my open source contributions and commit activity over the last 12 months.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white54, fontSize: 16),
            ),
            const SizedBox(height: 60),
            BlocBuilder<GithubStatsCubit, GithubStatsState>(
              builder: (context, state) {
                if (state is GithubStatsLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (state is GithubStatsLoaded) {
                  final stats = state.stats;
                  return Column(
                    children: [
                      Row(
                        children: [
                          Expanded(child: StatCard(title: 'Repositories', value: stats.publicRepos, icon: LucideIcons.folderGit2)),
                          const SizedBox(width: 24),
                          Expanded(child: StatCard(title: 'Commits This Year', value: stats.totalCommits, icon: LucideIcons.gitBranch)),
                        ],
                      ),
                      const SizedBox(height: 40),
                      Container(
                        padding: const EdgeInsets.all(32),
                        decoration: BoxDecoration(
                          gradient: AppGradients.solidCard,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: AppBorders.subtle),
                          boxShadow: AppShadows.card,
                        ),
                        child: MonthlyCommitsChart(data: stats.monthlyCommits),
                      ),
                    ],
                  ).animate().fadeIn().slideY(begin: 0.1);
                } else if (state is GithubStatsError) {
                  return Text('Error: ${state.message}', style: const TextStyle(color: Colors.red));
                }
                return const SizedBox();
              },
            ),
          ],
        ),
      ),
    );
  }
}
