import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme/app_gradients.dart';

class SectionDivider extends StatelessWidget {
  final Duration delay;
  const SectionDivider({super.key, this.delay = Duration.zero});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 1,
      width: 96,
      decoration: const BoxDecoration(gradient: AppGradients.divider),
    ).animate(delay: delay).fadeIn(duration: 600.ms).scaleX(alignment: Alignment.centerLeft, duration: 600.ms, curve: Curves.easeOut);
  }
}
