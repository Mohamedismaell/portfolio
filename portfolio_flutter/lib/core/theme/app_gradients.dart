import 'package:flutter/material.dart';

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
}
