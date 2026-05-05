import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../../../core/widgets/section_wrapper.dart';
import '../../../../core/widgets/section_badge.dart';
import '../../../../core/widgets/section_divider.dart';
import '../../../../core/widgets/gradient_text.dart';
import '../../../../core/widgets/glass_card.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/responsive/responsive_builder.dart';

class SkillCategory {
  final String title;
  final IconData icon;
  final List<SkillItem> skills;

  const SkillCategory({
    required this.title,
    required this.icon,
    required this.skills,
  });
}

class SkillItem {
  final String name;
  final IconData icon;

  const SkillItem({required this.name, required this.icon});
}

const List<SkillCategory> skillCategories = [
  SkillCategory(
    title: 'Mobile Development',
    icon: LucideIcons.smartphone,
    skills: [
      SkillItem(name: 'Flutter', icon: LucideIcons.layers),
      SkillItem(name: 'Dart', icon: LucideIcons.code),
      SkillItem(name: 'Responsive UI', icon: LucideIcons.monitorSmartphone),
      SkillItem(name: 'Animations', icon: LucideIcons.film),
    ],
  ),
  SkillCategory(
    title: 'Architecture & State',
    icon: LucideIcons.layoutTemplate,
    skills: [
      SkillItem(name: 'Clean Architecture', icon: LucideIcons.boxes),
      SkillItem(name: 'BLoC / Cubit', icon: LucideIcons.workflow),
      SkillItem(name: 'Dependency Injection', icon: LucideIcons.network),
      SkillItem(name: 'MVVM', icon: LucideIcons.component),
    ],
  ),
  SkillCategory(
    title: 'Backend & APIs',
    icon: LucideIcons.database,
    skills: [
      SkillItem(name: 'RESTful APIs', icon: LucideIcons.server),
      SkillItem(name: 'Dio', icon: LucideIcons.arrowRightLeft),
      SkillItem(name: 'Supabase', icon: LucideIcons.databaseZap),
      SkillItem(name: 'Node.js', icon: LucideIcons.fileCode),
    ],
  ),
  SkillCategory(
    title: 'Mapping & Location',
    icon: LucideIcons.map,
    skills: [
      SkillItem(name: 'Mapbox API', icon: LucideIcons.mapPin),
      SkillItem(name: 'Google Maps', icon: LucideIcons.navigation),
      SkillItem(name: 'Geolocator', icon: LucideIcons.compass),
      SkillItem(name: 'Places SDK', icon: LucideIcons.search),
    ],
  ),
  SkillCategory(
    title: 'Tools & DevOps',
    icon: LucideIcons.wrench,
    skills: [
      SkillItem(name: 'Git', icon: LucideIcons.gitBranch),
      SkillItem(name: 'CI/CD', icon: LucideIcons.infinity),
      SkillItem(name: 'Figma', icon: LucideIcons.penTool),
      SkillItem(name: 'Firebase', icon: LucideIcons.flame),
    ],
  ),
  SkillCategory(
    title: 'AI Integration',
    icon: LucideIcons.bot,
    skills: [
      SkillItem(name: 'Gemini API', icon: LucideIcons.sparkles),
      SkillItem(name: 'OpenAI API', icon: LucideIcons.brainCircuit),
      SkillItem(name: 'Prompt Engineering', icon: LucideIcons.terminal),
    ],
  ),
];

class SkillsSection extends StatelessWidget {
  const SkillsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SectionWrapper(
      child: Column(
        children: [
          // Header
          const Column(
            children: [
              SectionBadge(label: 'Technical Expertise'),
              SizedBox(height: 16),
              GradientText(
                'Skills & Technologies',
                gradient: AppGradients.heading,
                style: TextStyle(fontSize: 48, fontWeight: FontWeight.w900),
              ),
              SizedBox(height: 16),
              SectionDivider(),
              SizedBox(height: 16),
              Text(
                'A comprehensive overview of my technical stack and specialized domains in software engineering.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white54, fontSize: 16),
              ),
            ],
          ).animate().fadeIn(duration: 800.ms).slideY(begin: 0.2),

          const SizedBox(height: 60),

          // Grid
          AppResponsive(
            mobile: _buildGrid(1),
            tablet: _buildGrid(2),
            desktop: _buildGrid(3),
          ),
        ],
      ),
    );
  }

  Widget _buildGrid(int columns) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: columns,
        childAspectRatio: 0.85,
        crossAxisSpacing: 24,
        mainAxisSpacing: 24,
      ),
      itemCount: skillCategories.length,
      itemBuilder: (context, index) {
        final category = skillCategories[index];
        return _SkillCard(category: category, index: index);
      },
    );
  }
}

class _SkillCard extends StatelessWidget {
  final SkillCategory category;
  final int index;

  const _SkillCard({required this.category, required this.index});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Category Header
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppBorders.subtle),
                ),
                child: Icon(category.icon, color: Colors.white70, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: GradientText(
                  category.title,
                  gradient: AppGradients.heading,
                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          
          const SizedBox(height: 16),
          Divider(color: Colors.white.withOpacity(0.1)),
          const SizedBox(height: 16),
          
          // Skills List
          Expanded(
            child: ListView.separated(
              physics: const NeverScrollableScrollPhysics(),
              itemCount: category.skills.length,
              separatorBuilder: (_, __) => const SizedBox(height: 16),
              itemBuilder: (context, skillIndex) {
                final skill = category.skills[skillIndex];
                return Row(
                  children: [
                    Icon(skill.icon, color: Colors.blue.withOpacity(0.7), size: 18),
                    const SizedBox(width: 12),
                    Text(
                      skill.name,
                      style: const TextStyle(color: Colors.white70, fontSize: 15),
                    ),
                  ],
                ).animate(delay: (index * 100 + skillIndex * 50).ms).fadeIn().slideX(begin: -0.1);
              },
            ),
          ),
        ],
      ),
    ).animate().fadeIn(delay: (index * 100).ms, duration: 600.ms).slideY(begin: 0.1);
  }
}
