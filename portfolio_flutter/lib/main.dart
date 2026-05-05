import 'package:flutter/material.dart';

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

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
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
}
