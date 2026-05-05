import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'widgets/typewriter_widget.dart';
import 'widgets/code_panel.dart';
import '../../../../core/widgets/section_wrapper.dart';
import '../../../../core/widgets/section_badge.dart';
import '../../../../core/widgets/primary_button.dart';
import '../../../../core/widgets/gradient_text.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/theme/app_text_styles.dart';

class HeroSection extends StatelessWidget {
  const HeroSection({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width >= 1024;

    return SectionWrapper(
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                flex: 5,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionBadge(label: '👋 Welcome to my portfolio').animate().fadeIn(duration: 800.ms, delay: 100.ms).slideY(begin: 0.2),
                    const SizedBox(height: 24),
                    GradientText(
                      'Mohamed Ismael',
                      gradient: AppGradients.heading,
                      style: AppTextStyles.heading.copyWith(fontSize: isDesktop ? 64 : 48),
                    ).animate().fadeIn(duration: 800.ms, delay: 350.ms).slideY(begin: 0.2),
                    const SizedBox(height: 16),
                    TypewriterWidget(
                      'Software Engineer & Mobile Developer',
                      style: AppTextStyles.base.copyWith(fontSize: isDesktop ? 24 : 20, color: AppTextStyles.dimColor),
                    ).animate().fadeIn(duration: 800.ms, delay: 500.ms),
                    const SizedBox(height: 24),
                    Text(
                      'Building scalable mobile applications with Clean Architecture, complex state management, and production-grade Flutter systems that solve real-world problems.',
                      style: AppTextStyles.base.copyWith(fontSize: 16, height: 1.6, color: AppTextStyles.softColor),
                    ).animate().fadeIn(duration: 800.ms, delay: 550.ms).slideY(begin: 0.2),
                    const SizedBox(height: 40),
                    Row(
                      children: [
                        PrimaryButton(text: 'View Projects', onClick: () {}),
                        const SizedBox(width: 16),
                        PrimaryButton(text: 'Work With Me', isGhost: true, onClick: () {}),
                      ],
                    ).animate().fadeIn(duration: 800.ms, delay: 700.ms).slideY(begin: 0.2),
                  ],
                ),
              ),
              if (isDesktop) const SizedBox(width: 60),
              if (isDesktop)
                const Expanded(flex: 4, child: CodePanel()).animate().fadeIn(duration: 800.ms, delay: 900.ms).slideX(begin: 0.2),
            ],
          ),
          const SizedBox(height: 60),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 32),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.03),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStat('3+', 'Projects'),
                _buildDivider(),
                _buildStat('2024+', 'Active Dev'),
                _buildDivider(),
                _buildStat('Flutter', 'Core Stack'),
              ],
            ),
          ).animate().fadeIn(duration: 800.ms, delay: 1000.ms).slideY(begin: 0.2),
        ],
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(
      children: [
        GradientText(value, gradient: AppGradients.heading, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.white54, fontSize: 12, letterSpacing: 1.5)),
      ],
    );
  }

  Widget _buildDivider() => Container(width: 1, height: 40, color: Colors.white.withOpacity(0.1));
}
