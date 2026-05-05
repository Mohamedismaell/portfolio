import 'package:flutter/material.dart';
import '../../hero/presentation/hero_section.dart';
import '../../skills/presentation/skills_section.dart';
import '../../projects/presentation/projects_section.dart';
import '../../github_stats/presentation/github_stats_section.dart';
import '../../contact/presentation/hire_section.dart';
import '../../footer/presentation/footer_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ScrollController _scrollController = ScrollController();

  final heroKey = GlobalKey();
  final skillsKey = GlobalKey();
  final projectsKey = GlobalKey();
  final githubKey = GlobalKey();
  final contactKey = GlobalKey();

  void scrollToContext(GlobalKey key) {
    if (key.currentContext != null) {
      Scrollable.ensureVisible(
        key.currentContext!,
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      controller: _scrollController,
      child: Column(
        children: [
          Container(key: heroKey, child: const HeroSection()),
          Container(key: skillsKey, child: const SkillsSection()),
          Container(key: projectsKey, child: const ProjectsSection()),
          Container(key: githubKey, child: const GithubStatsSection()),
          Container(key: contactKey, child: const HireSection()),
          const FooterWidget(),
        ],
      ),
    );
  }
}
