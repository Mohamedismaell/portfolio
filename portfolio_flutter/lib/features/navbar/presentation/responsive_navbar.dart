import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'dart:ui';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/theme/app_gradients.dart';

class ResponsiveNavbar extends StatefulWidget {
  const ResponsiveNavbar({super.key});

  @override
  State<ResponsiveNavbar> createState() => _ResponsiveNavbarState();
}

class _ResponsiveNavbarState extends State<ResponsiveNavbar> {
  bool _isScrolled = false;

  @override
  Widget build(BuildContext context) {
    // In a real app, we would listen to the scroll controller of HomePage, 
    // but since they are disconnected in GoRouter shell, 
    // we use a simplified approach or just rely on the Glass effect.
    
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    return Positioned(
      top: 0,
      left: 0,
      right: 0,
      child: ClipRRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Container(
            height: 70,
            padding: const EdgeInsets.symmetric(horizontal: 24),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.5),
              border: const Border(bottom: BorderSide(color: AppBorders.subtle)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                GestureDetector(
                  onTap: () => context.go('/'),
                  child: ShaderMask(
                    shaderCallback: (b) => AppGradients.heading.createShader(b),
                    child: const Text(
                      'MI.',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                ),
                if (isDesktop)
                  Row(
                    children: [
                      _buildNavItem('Home', () => context.go('/')),
                      _buildNavItem('Skills', () {}),
                      _buildNavItem('Projects', () {}),
                      _buildNavItem('Contact', () {}),
                    ],
                  ),
                if (!isDesktop)
                  IconButton(
                    icon: const Icon(Icons.menu, color: Colors.white),
                    onPressed: () {
                      // Drawer logic
                    },
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(String title, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Text(
          title,
          style: const TextStyle(color: Colors.white70, fontWeight: FontWeight.w600, fontSize: 14),
        ),
      ),
    );
  }
}
