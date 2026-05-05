import 'package:flutter/material.dart';
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
}
