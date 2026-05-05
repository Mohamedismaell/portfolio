class ProjectModel {
  final String slug;
  final String title;
  final String role;
  final String color;
  final String duration;
  final String shortDescription;
  final String description;
  final List<String> highlights;
  final List<String> features;
  final String challenge;
  final String solution;
  final List<String> tech;
  final String github;
  final String image;
  final List<String> heroScreens;
  final List<String> gallery;
  final bool comingSoon;

  const ProjectModel({
    required this.slug,
    required this.title,
    required this.role,
    required this.color,
    required this.duration,
    required this.shortDescription,
    required this.description,
    required this.highlights,
    required this.features,
    required this.challenge,
    required this.solution,
    required this.tech,
    required this.github,
    required this.image,
    required this.heroScreens,
    required this.gallery,
    this.comingSoon = false,
  });
}
