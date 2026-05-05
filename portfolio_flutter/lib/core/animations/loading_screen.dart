import 'package:flutter/material.dart';
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
}
