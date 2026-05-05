import 'dart:async';
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
}
