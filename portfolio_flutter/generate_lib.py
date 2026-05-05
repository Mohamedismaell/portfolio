import os

files = {
    'lib/core/theme/app_gradients.dart': '''import 'package:flutter/material.dart';

class AppGradients {
  static const pageBg = LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xFF0A0A0A), Color(0xFF111111), Color(0xFF0D0D12), Color(0xFF080810)], stops: [0.0, 0.3, 0.6, 1.0]);
  static const cardBg = LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0x0CFFFFFF), Color(0x05FFFFFF), Color(0x0AFFFFFF)], stops: [0.0, 0.5, 1.0]);
  static const solidCard = LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xFF161616), Color(0xFF111111), Color(0xFF141414)], stops: [0.0, 0.5, 1.0]);
  static const navBg = LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xE60A0A0A), Color(0xD90E0E0E)]);
  static const progressBar = LinearGradient(colors: [Color(0xCCFFFFFF), Color(0x4DFFFFFF)]);
  static const heading = LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFFFFFFFF), Color(0xFFE8E8E8), Color(0xFFAAAAAA), Color(0xFF555555)], stops: [0.0, 0.25, 0.65, 1.0]);
  static const subtext = LinearGradient(colors: [Color(0x99FFFFFF), Color(0x40FFFFFF)]);
  static const statValue = LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFFFFFFFF), Color(0xFFCCCCCC), Color(0xFF777777)]);
  static const primaryBtn = LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xFFFFFFFF), Color(0xFFE0E0E0), Color(0xFFB0B0B0)]);
  static const ghostBtn = LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0x0FFFFFFF), Color(0x05FFFFFF)]);
  static const badge = LinearGradient(colors: [Color(0x14FFFFFF), Color(0x08FFFFFF)]);
  static const divider = LinearGradient(colors: [Color(0xB3FFFFFF), Color(0x26FFFFFF), Colors.transparent], stops: [0.0, 0.6, 1.0]);
}''',

    'lib/core/theme/app_shadows.dart': '''import 'package:flutter/material.dart';

class AppShadows {
  static const primaryBtn = [BoxShadow(color: Color(0x2EFFFFFF), blurRadius: 40, offset: Offset(0, 10)), BoxShadow(color: Color(0xB3000000), blurRadius: 8, offset: Offset(0, 2))];
  static const ghostBtn = [BoxShadow(color: Color(0x80000000), blurRadius: 24, offset: Offset(0, 4))];
  static const card = [BoxShadow(color: Color(0x99000000), blurRadius: 60, offset: Offset(0, 20))];
  static const heading = [BoxShadow(color: Color(0x1EFFFFFF), blurRadius: 40, offset: Offset(0, 6))];
}''',

    'lib/core/theme/app_borders.dart': '''import 'package:flutter/material.dart';

class AppBorders {
  static const subtle = Color(0x12FFFFFF);
  static const medium = Color(0x1EFFFFFF);
  static const strong = Color(0x33FFFFFF);
}''',

    'lib/core/theme/app_text_styles.dart': '''import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTextStyles {
  static const mutedColor = Color(0x38FFFFFF);
  static const dimColor = Color(0x73FFFFFF);
  static const softColor = Color(0x8CFFFFFF);
  static const cursorColor = Color(0x80FFFFFF);

  static TextStyle get base => GoogleFonts.inter(color: Colors.white);
  static TextStyle get heading => base.copyWith(fontWeight: FontWeight.w900, height: 1.0);
  static TextStyle get muted => base.copyWith(color: mutedColor);
}''',

    'lib/core/theme/app_theme.dart': '''import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_text_styles.dart';

class AppTheme {
  static ThemeData get dark {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: const Color(0xFF0d0d0d),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
      useMaterial3: true,
    );
  }
}''',

    'lib/core/widgets/section_wrapper.dart': '''import 'package:flutter/material.dart';

class SectionWrapper extends StatelessWidget {
  final Widget child;
  final GlobalKey? sectionKey;

  const SectionWrapper({super.key, required this.child, this.sectionKey});

  @override
  Widget build(BuildContext context) {
    return Padding(
      key: sectionKey,
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 80.0),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1152),
          child: child,
        ),
      ),
    );
  }
}''',

    'lib/core/widgets/section_badge.dart': '''import 'package:flutter/material.dart';
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
}''',

    'lib/core/widgets/section_divider.dart': '''import 'package:flutter/material.dart';
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
}''',

    'lib/core/widgets/gradient_text.dart': '''import 'package:flutter/material.dart';

class GradientText extends StatelessWidget {
  final String text;
  final Gradient gradient;
  final TextStyle? style;
  final TextAlign? textAlign;

  const GradientText(this.text, {super.key, required this.gradient, this.style, this.textAlign});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      shaderCallback: (bounds) => gradient.createShader(Offset.zero & bounds.size),
      blendMode: BlendMode.srcIn,
      child: Text(text, style: style, textAlign: textAlign),
    );
  }
}''',

    'lib/core/widgets/primary_button.dart': '''import 'package:flutter/material.dart';
import '../theme/app_gradients.dart';
import '../theme/app_shadows.dart';

class PrimaryButton extends StatefulWidget {
  final String text;
  final VoidCallback onClick;
  final bool isGhost;

  const PrimaryButton({super.key, required this.text, required this.onClick, this.isGhost = false});

  @override
  State<PrimaryButton> createState() => _PrimaryButtonState();
}

class _PrimaryButtonState extends State<PrimaryButton> {
  bool isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => isHovered = true),
      onExit: (_) => setState(() => isHovered = false),
      child: GestureDetector(
        onTap: widget.onClick,
        child: AnimatedScale(
          scale: isHovered ? 1.05 : 1.0,
          duration: const Duration(milliseconds: 200),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              gradient: widget.isGhost ? AppGradients.ghostBtn : AppGradients.primaryBtn,
              boxShadow: widget.isGhost ? AppShadows.ghostBtn : AppShadows.primaryBtn,
            ),
            child: Text(
              widget.text,
              style: TextStyle(fontWeight: FontWeight.bold, color: widget.isGhost ? Colors.white : Colors.black),
            ),
          ),
        ),
      ),
    );
  }
}''',

    'lib/core/widgets/glass_card.dart': '''import 'dart:ui';
import 'package:flutter/material.dart';

class GlassCard extends StatelessWidget {
  final Widget child;
  final double borderRadius;
  final EdgeInsetsGeometry padding;

  const GlassCard({super.key, required this.child, this.borderRadius = 24.0, this.padding = const EdgeInsets.all(24.0)});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.03),
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(color: Colors.white.withOpacity(0.08)),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.5), blurRadius: 60, offset: const Offset(0, 20))],
          ),
          child: child,
        ),
      ),
    );
  }
}''',

    'lib/core/responsive/responsive_builder.dart': '''import 'package:flutter/material.dart';

class AppResponsive extends StatelessWidget {
  final Widget mobile;
  final Widget? tablet;
  final Widget desktop;

  const AppResponsive({super.key, required this.mobile, this.tablet, required this.desktop});

  static bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;
  static bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1024;
  static bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1024;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1024) return desktop;
        if (constraints.maxWidth >= 768 && tablet != null) return tablet!;
        return mobile;
      },
    );
  }
}''',

    'lib/core/animations/cursor_glow.dart': '''import 'package:flutter/material.dart';

class CursorGlow extends StatefulWidget {
  final Widget child;
  const CursorGlow({super.key, required this.child});
  @override
  State<CursorGlow> createState() => _CursorGlowState();
}

class _CursorGlowState extends State<CursorGlow> {
  Offset position = const Offset(-1000, -1000);

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (e) => setState(() => position = e.position),
      child: Stack(
        children: [
          widget.child,
          if (MediaQuery.of(context).size.width >= 1024)
            Positioned(
              left: position.dx - 80,
              top: position.dy - 80,
              child: IgnorePointer(
                child: Container(
                  width: 160,
                  height: 160,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [BoxShadow(color: Colors.blue.withOpacity(0.1), blurRadius: 60, spreadRadius: 20)],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}''',

    'lib/core/animations/loading_screen.dart': '''import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class LoadingScreen extends StatelessWidget {
  const LoadingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF0B0F19),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Mohamed Ismael', style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white))
                .animate(onPlay: (controller) => controller.repeat(reverse: true)).fadeIn(duration: 1200.ms).moveY(begin: 10, end: 0),
            const SizedBox(height: 12),
            const Text('Flutter Developer & Software Engineer', style: TextStyle(color: Colors.white54)),
            const SizedBox(height: 24),
            Container(height: 4, width: 160, decoration: BoxDecoration(color: Colors.blue, borderRadius: BorderRadius.circular(2)))
                .animate(onPlay: (controller) => controller.repeat()).scaleX(begin: 0, end: 1, duration: 1500.ms, alignment: Alignment.centerLeft),
          ],
        ),
      ),
    );
  }
}''',

    'lib/core/animations/background_orbs.dart': '''import 'dart:ui';
import 'package:flutter/material.dart';

class BackgroundOrbs extends StatelessWidget {
  const BackgroundOrbs({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: -160,
          left: -160,
          child: IgnorePointer(
            child: Container(
              width: 900,
              height: 900,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [Colors.white.withOpacity(0.10), const Color(0xFFC8C8DC).withOpacity(0.04), Colors.transparent],
                  stops: const [0.0, 0.4, 0.7],
                ),
              ),
              child: BackdropFilter(filter: ImageFilter.blur(sigmaX: 120, sigmaY: 120), child: Container(color: Colors.transparent)),
            ),
          ),
        ),
        Positioned(
          bottom: -200,
          right: -200,
          child: IgnorePointer(
            child: Container(
              width: 900,
              height: 900,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [Colors.white.withOpacity(0.07), const Color(0xFFB4B4C8).withOpacity(0.03), Colors.transparent],
                  stops: const [0.0, 0.5, 0.7],
                ),
              ),
              child: BackdropFilter(filter: ImageFilter.blur(sigmaX: 120, sigmaY: 120), child: Container(color: Colors.transparent)),
            ),
          ),
        ),
      ],
    );
  }
}''',

    'lib/core/localization/l10n/app_en.arb': '''{
    "@@locale": "en",
    "heroTitle": "Mohamed Ismael",
    "heroSubtitle": "Software Engineer & Mobile Developer",
    "heroDescription": "Building scalable mobile applications with Clean Architecture, complex state management, and production-grade Flutter systems that solve real-world problems.",
    "ctaProjects": "View Projects",
    "ctaHire": "Work With Me",
    "navHome": "Home",
    "navProjects": "Projects",
    "navContact": "Contact",
    "downloadCV": "Download CV",
    "statsProjects": "3+",
    "statsProjectsLabel": "Projects",
    "statsActiveDev": "2024+",
    "statsActiveDevLabel": "Active Dev",
    "statsTech": "Flutter",
    "statsTechLabel": "Core Stack"
}''',

    'lib/core/localization/l10n/app_ar.arb': '''{
    "@@locale": "ar",
    "heroTitle": "محمد إسماعيل",
    "heroSubtitle": "مطور فلاتر ومهندس برمجيات",
    "heroDescription": "أبني تطبيقات فلاتر قابلة للتوسع بهندسة نظيفة وتجربة مستخدم متميزة تحل مشاكل واقعية.",
    "ctaProjects": "المشاريع",
    "ctaHire": "تواصل معي",
    "navHome": "الرئيسية",
    "navProjects": "المشاريع",
    "navContact": "تواصل",
    "downloadCV": "تحميل السيرة الذاتية",
    "statsProjects": "3+",
    "statsProjectsLabel": "مشاريع",
    "statsActiveDev": "+2024",
    "statsActiveDevLabel": "تطوير مستمر",
    "statsTech": "Flutter",
    "statsTechLabel": "التقنية الأساسية"
}''',

    'lib/core/widgets/language_switcher.dart': '''import 'package:flutter/material.dart';

class LanguageSwitcher extends StatelessWidget {
  const LanguageSwitcher({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.language),
      onPressed: () {},
    );
  }
}''',

    'lib/features/navbar/presentation/responsive_navbar.dart': '''import 'package:flutter/material.dart';

class ResponsiveNavbar extends StatelessWidget {
  const ResponsiveNavbar({super.key});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 0,
      left: 0,
      right: 0,
      child: Container(
        height: 60,
        color: Colors.black54,
        child: const Center(child: Text('Responsive Navbar Placeholder')),
      ),
    );
  }
}''',

    'lib/features/hero/presentation/widgets/typewriter_widget.dart': '''import 'dart:async';
import 'package:flutter/material.dart';

class TypewriterWidget extends StatefulWidget {
  final String text;
  final TextStyle? style;
  final Duration initialDelay;

  const TypewriterWidget(this.text, {super.key, this.style, this.initialDelay = const Duration(milliseconds: 800)});

  @override
  State<TypewriterWidget> createState() => _TypewriterWidgetState();
}

class _TypewriterWidgetState extends State<TypewriterWidget> {
  String _displayedText = '';
  int _currentIndex = 0;
  Timer? _timer;
  bool _showCursor = true;
  Timer? _cursorTimer;

  @override
  void initState() {
    super.initState();
    _cursorTimer = Timer.periodic(const Duration(milliseconds: 500), (timer) {
      if (mounted) setState(() => _showCursor = !_showCursor);
    });

    Future.delayed(widget.initialDelay, () {
      if (!mounted) return;
      _timer = Timer.periodic(const Duration(milliseconds: 45), (timer) {
        if (_currentIndex < widget.text.length) {
          setState(() {
            _displayedText += widget.text[_currentIndex];
            _currentIndex++;
          });
        } else {
          timer.cancel();
        }
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _cursorTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        style: widget.style,
        children: [
          TextSpan(text: _displayedText),
          TextSpan(text: '|', style: TextStyle(color: _showCursor ? (widget.style?.color ?? Colors.white) : Colors.transparent)),
        ],
      ),
    );
  }
}''',

    'lib/features/hero/presentation/widgets/code_panel.dart': '''import 'package:flutter/material.dart';
import '../../../../core/widgets/glass_card.dart';
import '../../../../core/theme/app_borders.dart';

class CodePanel extends StatefulWidget {
  const CodePanel({super.key});
  @override
  State<CodePanel> createState() => _CodePanelState();
}

class _CodePanelState extends State<CodePanel> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 4))..repeat(reverse: true);
    _animation = Tween<double>(begin: 0, end: -8).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) => Transform.translate(offset: Offset(0, _animation.value), child: child),
      child: GlassCard(
        padding: EdgeInsets.zero,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: AppBorders.subtle)), color: Color(0x0AFFFFFF)),
              child: Row(
                children: [
                  Row(
                    children: [
                      _buildDot(const Color(0xFFFF5F56)),
                      const SizedBox(width: 8),
                      _buildDot(const Color(0xFFFFBD2E)),
                      const SizedBox(width: 8),
                      _buildDot(const Color(0xFF27C93F)),
                    ],
                  ),
                  const SizedBox(width: 16),
                  const Text('home_bloc.dart', style: TextStyle(color: Colors.white54, fontSize: 12)),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: _buildCodeContent(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDot(Color color) => Container(width: 12, height: 12, decoration: BoxDecoration(color: color, shape: BoxShape.circle));

  Widget _buildCodeContent() {
    return RichText(
      text: const TextSpan(
        style: TextStyle(fontFamily: 'monospace', fontSize: 13, height: 1.5, color: Color(0xFFE6E6E6)),
        children: [
          TextSpan(text: 'class ', style: TextStyle(color: Color(0xFFC678DD))),
          TextSpan(text: 'HomeBloc ', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: 'extends ', style: TextStyle(color: Color(0xFFC678DD))),
          TextSpan(text: 'Bloc', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: '<', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: 'HomeEvent', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: ', ', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: 'HomeState', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: '> {\\n', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: '  HomeBloc() : ', style: TextStyle(color: Color(0xFF61AFEF))),
          TextSpan(text: 'super', style: TextStyle(color: Color(0xFF56B6C2))),
          TextSpan(text: '(', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: 'HomeInitial', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: '()) {\\n', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: '    on<', style: TextStyle(color: Color(0xFF61AFEF))),
          TextSpan(text: 'LoadPortfolio', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: '>((event, emit) ', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: 'async ', style: TextStyle(color: Color(0xFFC678DD))),
          TextSpan(text: '{\\n', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: '      emit(', style: TextStyle(color: Color(0xFF61AFEF))),
          TextSpan(text: 'HomeLoading', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: '());\\n', style: TextStyle(color: Color(0xFFABB2BF))),
          TextSpan(text: '      // Ready to build something amazing\\n', style: TextStyle(color: Color(0xFF5C6370), fontStyle: FontStyle.italic)),
          TextSpan(text: '      emit(', style: TextStyle(color: Color(0xFF61AFEF))),
          TextSpan(text: 'HomeLoaded', style: TextStyle(color: Color(0xFFE5C07B))),
          TextSpan(text: '(portfolio));\\n    });\\n  }\\n}', style: TextStyle(color: Color(0xFFABB2BF))),
        ],
      ),
    );
  }
}''',

    'lib/features/hero/presentation/hero_section.dart': '''import 'package:flutter/material.dart';
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
        GradientText(value, gradient: AppGradients.heading, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.black)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.white54, fontSize: 12, letterSpacing: 1.5)),
      ],
    );
  }

  Widget _buildDivider() => Container(width: 1, height: 40, color: Colors.white.withOpacity(0.1));
}''',

    'lib/core/routing/app_router.dart': '''import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/navbar/presentation/responsive_navbar.dart';
import '../../features/hero/presentation/hero_section.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/',
  routes: [
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) {
        return Scaffold(
          body: Stack(
            children: [
              child,
              const ResponsiveNavbar(),
            ],
          ),
        );
      },
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const SingleChildScrollView(
            child: Column(
              children: [
               HeroSection(),
              ],
            ),
          ),
        ),
        GoRoute(
          path: '/projects/:slug',
          builder: (context, state) => Center(child: Text('Case Study: ${state.pathParameters["slug"]}')),
        ),
      ],
    ),
  ],
);''',

    'lib/main.dart': '''import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'core/theme/app_theme.dart';
import 'core/animations/background_orbs.dart';
import 'core/animations/cursor_glow.dart';
import 'core/animations/loading_screen.dart';
import 'core/routing/app_router.dart';

void main() {
  runApp(const PortfolioApp());
}

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Mohamed Ismael | Flutter Developer',
      theme: AppTheme.dark,
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
    );
  }
}

class _AppShell extends StatefulWidget {
  const _AppShell();

  @override
  State<_AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<_AppShell> {
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) setState(() => _isLoading = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CursorGlow(
        child: Stack(
          children: [
            const BackgroundOrbs(),
            if (!_isLoading)
              const Center(
                child: Text('Portfolio App Shell loaded'),
              ),
            if (_isLoading)
              const Positioned.fill(
                child: LoadingScreen(),
              ),
          ],
        ),
      ),
    );
  }
}'''
}

for path, content in files.items():
    full_path = os.path.join('d:/GitHub/portfolio/portfolio/portfolio_flutter', path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Done writing files.')
