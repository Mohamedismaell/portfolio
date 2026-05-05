import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTextStyles {
  static const mutedColor = Color(0x38FFFFFF);
  static const dimColor = Color(0x73FFFFFF);
  static const softColor = Color(0x8CFFFFFF);
  static const cursorColor = Color(0x80FFFFFF);

  static TextStyle get base => GoogleFonts.inter(color: Colors.white);
  static TextStyle get heading => base.copyWith(fontWeight: FontWeight.w900, height: 1.0);
  static TextStyle get muted => base.copyWith(color: mutedColor);
}
