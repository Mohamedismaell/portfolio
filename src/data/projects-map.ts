export const projectsMap: Record<string, any> = {
  "news-app": {
    title: "News App",
    role: "Flutter Developer",
    description:
      "A scalable Flutter news application that integrates multiple REST APIs with category filtering, state management, and responsive UI.",
    challenge:
      "Handling multiple API endpoints, managing loading/error states, and maintaining a clean scalable architecture.",
    solution:
      "Implemented Clean Architecture with Cubit for state management, modular data layers, and reusable UI components.",
    tech: ["Flutter", "REST API", "Cubit", "Clean Architecture"],
    github: "https://github.com/Mohamedismaell/News",
    demo: "", // add Flutter web demo later
  },
  tasky: {
    title: "Tasky App",
    role: "Flutter Developer",
    description:
      "A task management application focused on productivity, local persistence, and responsive UI.",
    challenge:
      "Designing a smooth UX with persistent local storage and scalable state updates.",
    solution:
      "Used structured state management and local storage (Hive/SQLite) with reusable widgets.",
    tech: ["Flutter", "Hive", "State Management", "Responsive UI"],
    github: "https://github.com/Mohamedismaell/tasky",
    demo: "",
  },
  "book-reading": {
    title: "Book Reading App",
    role: "Flutter Developer",
    description:
      "A reading-focused Flutter app with smooth navigation, clean UI, and modular widget architecture.",
    challenge:
      "Creating an intuitive reading flow with responsive layouts.",
    solution:
      "Designed modular UI components and optimized navigation flow.",
    tech: ["Flutter", "UI/UX", "Navigation", "Material Design"],
    github: "https://github.com/Mohamedismaell/Book_reading_flutter_app",
    demo: "",
  },
};
