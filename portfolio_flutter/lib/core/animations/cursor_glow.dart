import 'package:flutter/material.dart';

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
}
