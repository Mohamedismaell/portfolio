import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../projects/data/projects_data.dart';

class CaseStudyPage extends StatelessWidget {
  final String slug;

  const CaseStudyPage({super.key, required this.slug});

  @override
  Widget build(BuildContext context) {
    final project = projectsData.firstWhere(
      (p) => p.slug == slug,
      orElse: () => projectsData.first,
    );

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => context.go('/'),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 400,
              width: double.infinity,
              decoration: BoxDecoration(
                color: Color(int.parse(project.color.substring(1, 7), radix: 16) + 0xFF000000).withOpacity(0.2),
              ),
              child: Center(
                child: Text(
                  project.title,
                  style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(40.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Overview', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 16),
                  Text(project.description, style: const TextStyle(fontSize: 16, color: Colors.white70, height: 1.6)),
                  const SizedBox(height: 40),
                  const Text('Tech Stack', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 12,
                    children: project.tech.map((t) => Chip(
                      label: Text(t, style: const TextStyle(color: Colors.white)),
                      backgroundColor: Colors.white.withOpacity(0.1),
                      side: BorderSide.none,
                    )).toList(),
                  ),
                  const SizedBox(height: 100),
                  const Center(
                    child: Text('More case study details coming soon...', style: TextStyle(color: Colors.white54)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
