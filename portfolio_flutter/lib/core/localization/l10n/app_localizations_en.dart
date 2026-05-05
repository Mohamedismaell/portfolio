// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get heroTitle => 'Mohamed Ismael';

  @override
  String get heroSubtitle => 'Software Engineer & Mobile Developer';

  @override
  String get heroDescription =>
      'Building scalable mobile applications with Clean Architecture, complex state management, and production-grade Flutter systems that solve real-world problems.';

  @override
  String get ctaProjects => 'View Projects';

  @override
  String get ctaHire => 'Work With Me';

  @override
  String get navHome => 'Home';

  @override
  String get navProjects => 'Projects';

  @override
  String get navContact => 'Contact';

  @override
  String get downloadCV => 'Download CV';

  @override
  String get statsProjects => '3+';

  @override
  String get statsProjectsLabel => 'Projects';

  @override
  String get statsActiveDev => '2024+';

  @override
  String get statsActiveDevLabel => 'Active Dev';

  @override
  String get statsTech => 'Flutter';

  @override
  String get statsTechLabel => 'Core Stack';
}
