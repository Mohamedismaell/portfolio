import 'package:flutter/material.dart';
import '../theme/app_gradients.dart';
import '../theme/app_borders.dart';
import '../theme/app_text_styles.dart';
import 'package:google_fonts/google_fonts.dart';

class SectionBadge extends StatelessWidget {
  final String label;

  const SectionBadge({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: AppGradients.badge,
        borderRadius: BorderRadius.circular(100),
        border: Border.all(color: AppBorders.strong),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      child: Text(
        label.toUpperCase(),
        style: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          letterSpacing: 2.0,
          color: AppTextStyles.softColor,
        ),
      ),
    );
  }
}
