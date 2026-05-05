import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/navbar/presentation/responsive_navbar.dart';
import '../../features/home/presentation/home_page.dart';
import '../../features/case_study/presentation/case_study_page.dart';

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
          builder: (context, state) => const HomePage(),
        ),
        GoRoute(
          path: '/projects/:slug',
          builder: (context, state) => CaseStudyPage(slug: state.pathParameters["slug"] ?? ''),
        ),
      ],
    ),
  ],
);
