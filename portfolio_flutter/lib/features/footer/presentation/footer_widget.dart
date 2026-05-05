import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/theme/app_text_styles.dart';

class FooterWidget extends StatelessWidget {
  const FooterWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 24),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
      ),
      child: Column(
        children: [
          ShaderMask(
            shaderCallback: (b) => AppGradients.heading.createShader(b),
            child: const Text(
              'Mohamed Ismael',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Flutter Developer & Software Engineer',
            style: TextStyle(color: AppTextStyles.dimColor, fontSize: 14),
          ),
          const SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildSocialIcon(LucideIcons.code, 'https://github.com/Mohamedismaell'),
              const SizedBox(width: 16),
              _buildSocialIcon(LucideIcons.link, 'https://www.linkedin.com/in/mohamed-ismail-dev'),
              const SizedBox(width: 16),
              _buildSocialIcon(LucideIcons.share2, 'https://twitter.com/mohamedismaell'),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            '© ${DateTime.now().year} Mohamed Ismael. All rights reserved.',
            style: TextStyle(color: AppTextStyles.mutedColor, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildSocialIcon(IconData icon, String url) {
    return InkWell(
      onTap: () => launchUrl(Uri.parse(url)),
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.white.withOpacity(0.1)),
        ),
        child: Icon(icon, color: Colors.white70, size: 20),
      ),
    );
  }
}
