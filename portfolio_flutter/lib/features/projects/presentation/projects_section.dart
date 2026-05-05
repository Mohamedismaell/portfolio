import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/widgets/section_wrapper.dart';
import '../../../../core/widgets/section_badge.dart';
import '../../../../core/widgets/gradient_text.dart';
import '../../../../core/widgets/section_divider.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/responsive/responsive_builder.dart';
import '../data/projects_data.dart';
import 'widgets/project_card.dart';

class ProjectsSection extends StatelessWidget {
  const ProjectsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SectionWrapper(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SectionBadge(label: 'Selected Work'),
          const SizedBox(height: 16),
          const GradientText(
            'Featured Projects',
            gradient: AppGradients.heading,
            style: TextStyle(fontSize: 48, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 16),
          const SectionDivider(),
          const SizedBox(height: 16),
          const Text(
            'A selection of my recent mobile applications, demonstrating architecture, performance, and UI/UX design.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white54, fontSize: 16),
          ),
          const SizedBox(height: 60),
          AppResponsive(
            mobile: _buildGrid(1),
            tablet: _buildGrid(2),
            desktop: _buildGrid(3),
          ),
        ],
      ).animate().fadeIn(duration: 800.ms).slideY(begin: 0.1),
    );
  }

  Widget _buildGrid(int columns) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: columns,
        childAspectRatio: 0.75,
        crossAxisSpacing: 24,
        mainAxisSpacing: 24,
      ),
      itemCount: projectsData.length,
      itemBuilder: (context, index) {
        return ProjectCard(
          project: projectsData[index],
          index: index,
        );
      },
    );
  }
}
