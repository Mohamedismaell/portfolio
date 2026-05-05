import 'package:flutter/material.dart';
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
}
