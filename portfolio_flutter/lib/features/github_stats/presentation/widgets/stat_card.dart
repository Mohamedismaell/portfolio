import 'package:flutter/material.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/theme/app_shadows.dart';

class StatCard extends StatelessWidget {
  final String title;
  final int value;
  final IconData icon;

  const StatCard({super.key, required this.title, required this.value, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: AppGradients.solidCard,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppBorders.subtle),
        boxShadow: AppShadows.card,
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.06),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppBorders.subtle),
            ),
            child: Icon(icon, color: Colors.white70, size: 24),
          ),
          const SizedBox(height: 16),
          ShaderMask(
            shaderCallback: (b) => AppGradients.heading.createShader(b),
            child: Text(
              value.toString(),
              style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: Colors.white),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title.toUpperCase(),
            style: const TextStyle(color: Colors.white54, fontSize: 12, letterSpacing: 2.0, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
