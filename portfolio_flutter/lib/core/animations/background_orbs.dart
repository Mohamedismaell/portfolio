import 'dart:ui';
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
}
