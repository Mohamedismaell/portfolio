import 'package:flutter/material.dart';

class AppShadows {
  static const primaryBtn = [BoxShadow(color: Color(0x2EFFFFFF), blurRadius: 40, offset: Offset(0, 10)), BoxShadow(color: Color(0xB3000000), blurRadius: 8, offset: Offset(0, 2))];
  static const ghostBtn = [BoxShadow(color: Color(0x80000000), blurRadius: 24, offset: Offset(0, 4))];
  static const card = [BoxShadow(color: Color(0x99000000), blurRadius: 60, offset: Offset(0, 20))];
  static const heading = [BoxShadow(color: Color(0x1EFFFFFF), blurRadius: 40, offset: Offset(0, 6))];
}
