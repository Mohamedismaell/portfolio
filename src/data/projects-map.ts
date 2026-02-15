export const projectsMap: Record<string, any> = {
  "news-app": {
    slug: "news-app",
    title: "Quick Read",
    color: "#475AD7",
    role: "Flutter Developer",
    duration: "2025",

    shortDescription:
      "A high-performance cross-platform news application engineered with scalable Clean Architecture, optimized state management, and intelligent caching strategies. Built to deliver real-time content updates, seamless offline reading, and a refined, production-ready user experience.",

    description:
      "Quick Read was architected using a modular Clean Architecture structure to ensure long-term scalability, maintainability, and testability. The application integrates robust REST API handling, structured caching mechanisms, and optimized UI rendering to deliver consistent performance across devices. Every layer was designed for separation of concerns, enabling rapid feature expansion without compromising stability.",

    highlights: [
      "Processes 20+ articles per API request with efficient parsing",
      "Multi-category dynamic filtering with optimized state updates",
      "Robust error, loading, and empty-state handling",
      "Highly responsive and adaptive UI across device sizes",
    ],

    features: [
      "Category-driven news browsing system",
      "Real-time search with dynamic filtering",
      "Persistent bookmark management with offline support",
      "Strict Clean Architecture layer separation",
      "Structured API caching with expiration logic",
    ],

    challenge:
      "Coordinating multiple API endpoints, synchronizing state across independent screens, and maintaining smooth UI performance while enforcing strict architectural boundaries.",

    solution:
      "Implemented Clean Architecture with Cubit-driven state isolation, modular repositories, and reusable presentation components to ensure scalability, predictable state flow, and optimized rebuild performance.",

    tech: ["Flutter", "REST API", "Cubit", "Clean Architecture"],

    github: "https://github.com/Mohamedismaell/News",

    image: "/projects/news/cover.png",

    heroScreens: [
      "/projects/news/splash.png",
      "/projects/news/onboarding(1).png",
      "/projects/news/onboarding(2).png",
      "/projects/news/homedisplay.png",
      "/projects/news/post_details.png",
      "/projects/news/categories.png",
      "/projects/news/explore_category(2).png",
      "/projects/news/bookmarks.png",
      "/projects/news/profile.png",
    ],

    gallery: [
      "/projects/news/2D_preview/welcome.png",
      "/projects/news/2D_preview/homeedit.png",
      "/projects/news/2D_preview/image1.png",
      "/projects/news/2D_preview/image2.png",
      "/projects/news/2D_preview/image3.png",
      "/projects/news/2D_preview/image4.png",
      "/projects/news/2D_preview/image5.png",
    ],

    sections: [
      {
        label: "SCREEN 01",
        title: "Home Feed Experience",
        description:
          "A dynamic news feed powered by REST APIs, engineered with smooth scrolling, optimized rebuild cycles, and intelligent loading state handling to ensure a fluid reading experience.",
        features: [
          "Real-time API-driven content rendering",
          "Efficient image loading and caching",
          "Granular loading & error state management",
        ],
        image: "/projects/news/homedisplay.png",
      },
      {
        label: "SCREEN 02",
        title: "Category Filtering System",
        description:
          "A scalable filtering mechanism allowing users to explore news categories through dynamic API requests, structured Cubit state handling, and clean domain separation.",
        features: [
          "Dynamic category-based API calls",
          "Cubit-driven selective rebuilds",
          "Strict presentation/domain/data isolation",
        ],
        image: "/projects/news/categories.png",
      },
      {
        label: "SCREEN 03",
        title: "Bookmarks & Saved Articles",
        description:
          "A persistent bookmark system enabling offline-first access to saved articles using local storage with optimized retrieval performance.",
        features: [
          "Hive-based local persistence",
          "Instant bookmark toggle mechanism",
          "Offline article access with structured caching",
        ],
        image: "/projects/news/bookmarks.png",
      },
    ],

    architecture: {
      title: "Clean Architecture Implementation",
      layers: [
        {
          name: "Presentation Layer (Flutter)",
          description:
            "Composed of UI screens, reusable widgets, and Cubit-based state management responsible for rendering, user interaction handling, and optimized widget rebuild control.",
        },
        {
          name: "Domain Layer (Business Logic)",
          description:
            "Framework-independent core layer containing entities and use cases that encapsulate business rules and maintain architectural integrity.",
        },
        {
          name: "Data Layer (API & Repositories)",
          description:
            "Handles REST API integrations, DTO transformations, repository implementations, and structured local/remote data source coordination.",
        },
      ],
    },

    techStack: [
      {
        title: "Architecture",
        items: ["Clean Architecture", "Layered Modular Structure", "Repository Pattern"],
      },
      {
        title: "State Management",
        items: ["Bloc", "Cubit", "Selective Rebuild Optimization"],
      },
      {
        title: "Networking",
        items: ["REST APIs", "Dio", "Structured Error Handling"],
      },
      {
        title: "Storage",
        items: ["Hive", "Hive Object Box", "Offline Caching Strategy"],
      },
    ],

    challenges: [
      {
        challenge:
          "Managing complex state synchronization across multiple independent screens without causing unnecessary UI rebuilds.",
        solution:
          "Implemented Cubit with granular state emissions and selective rebuild strategies to maintain predictable and performant UI updates.",
      },
      {
        challenge:
          "Designing a reliable offline caching mechanism without compromising data freshness.",
        solution:
          "Integrated Hive-based structured caching with controlled expiration logic to balance performance and content accuracy.",
      },
    ]



    ,


    // "book-reading": {
    //   slug: "book-reading",
    //   title: "Book Reading App",
    //   role: "Flutter Developer",
    //   shortDescription:
    //     "Reading app with clean UI, smooth navigation, and modular widgets.",
    //   description:
    //     "A Flutter reading application focused on UI/UX, navigation flow, and reusable widget architecture.",
    //   challenge:
    //     "Creating intuitive reading flow with responsive layouts.",
    //   solution:
    //     "Designed modular UI system and optimized navigation experience.",
    //   tech: ["Flutter", "UI/UX", "Navigation", "Material Design"],
    //   github: "https://github.com/Mohamedismaell/Book_reading_flutter_app",
    //   demo: "",
    //   image: "/projects/book/cover.png",
    //   gallery: [
    //     "/projects/book/1.png",
    //     "/projects/book/2.png",
    //   ],
    // },

  }
  , tasky: {
    slug: "tasky",
    title: "Tasky",
    role: "Flutter Developer",
    color: "#15B86C",
    duration: "2025",

    shortDescription:
      "A production-ready task management application engineered with Feature-First Clean Architecture, Hydrated Bloc state persistence, and a highly responsive UI system. Tasky delivers seamless task organization, dynamic filtering, and reliable offline storage with optimized performance across devices.",

    description:
      "Tasky was architected with scalability, modular separation, and long-term maintainability as core principles. The application leverages Hydrated Bloc for automatic state restoration, GetIt for dependency injection, and structured routing via GoRouter. Designed for performance and extensibility, Tasky demonstrates clean separation of concerns, optimized rebuild boundaries, and a modern interactive UI experience.",

    highlights: [
      "Feature-First Clean Architecture structure",
      "Hydrated Bloc persistent state management",
      "Dynamic Light & Dark theme switching",
      "Selective widget rebuild optimization",
      "Scalable dependency injection setup"
    ],

    features: [
      "Create, edit, and delete tasks efficiently",
      "Status-based filtering (Todo / Completed)",
      "Persistent local state with Hydrated Bloc",
      "User profile customization",
      "Theme switching with global state control",
      "Structured routing using GoRouter",
      "Responsive UI with Flutter ScreenUtil"
    ],

    challenge:
      "Designing a scalable state management structure that preserves tasks across app restarts while maintaining smooth UI performance and modular architecture separation.",

    solution:
      "Implemented Hydrated Bloc for automatic state serialization and restoration, structured the project using Feature-First Clean Architecture, and optimized Bloc emissions to prevent unnecessary rebuilds.",

    tech: ["Flutter", "Flutter Bloc", "Hydrated Bloc", "Clean Architecture"],

    github: "https://github.com/Mohamedismaell/tasky",

    image: "/projects/tasky/normal/Screenshot 2026-02-15 184935.png",

    heroScreens: [
      "/projects/tasky/normal/Splash-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159434-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159896-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159689-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159908-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159921-portrait.png",
      "/projects/tasky/normal/Screenshot_1771161022-portrait.png"
    ],

    gallery: [
      "/projects/tasky/2D_preview/welcome.png",
      "/projects/tasky/2D_preview/home.png",
      "/projects/tasky/2D_preview/add_task.png",
      "/projects/tasky/2D_preview/todo.png",
      "/projects/tasky/2D_preview/completed.png",
      "/projects/tasky/2D_preview/profile.png"
    ],

    sections: [
      {
        label: "SCREEN 01",
        title: "Dashboard Overview",
        description:
          "Centralized task dashboard displaying structured Todo and Completed sections with real-time state updates and optimized UI rendering.",
        features: [
          "Selective Bloc rebuild strategy",
          "Status-based task segmentation",
          "Smooth animated list transitions"
        ],
        image: "/projects/tasky/normal/Screenshot_1771159896-portrait.png"
      },
      {
        label: "SCREEN 02",
        title: "Todo Management",
        description:
          "Dedicated Todo view enabling efficient task tracking, quick editing, and seamless status transitions.",
        features: [
          "Instant task state updates",
          "Optimized event handling with Bloc",
          "Structured feature-based architecture"
        ],
        image: "/projects/tasky/normal/Screenshot_1771159908-portrait.png"
      },
      {
        label: "SCREEN 03",
        title: "Completed Tasks",
        description:
          "Clear visualization of completed tasks with structured filtering logic and persistent state synchronization.",
        features: [
          "Hydrated persistent storage",
          "Efficient filtering logic",
          "Consistent UI rebuild boundaries"
        ],
        image: "/projects/tasky/normal/Screenshot_1771159921-portrait.png"
      },
      {
        label: "SCREEN 04",
        title: "Profile & Preferences",
        description:
          "User configuration screen supporting dynamic theme switching and persistent personalization settings.",
        features: [
          "Light & Dark mode toggle",
          "SharedPreferences integration",
          "Global theme state management"
        ],
        image: "/projects/tasky/normal/Screenshot_1771161022-portrait.png"
      }
    ],

    architecture: {
      title: "Feature-First Clean Architecture",
      layers: [
        {
          name: "Presentation Layer (Flutter)",
          description:
            "UI widgets, Bloc state controllers, and navigation logic responsible for rendering and user interaction."
        },
        {
          name: "Domain Layer (Business Logic)",
          description:
            "Core entities, use cases, and repository abstractions defining business rules independent from frameworks."
        },
        {
          name: "Data Layer (Local Persistence)",
          description:
            "Hydrated Bloc storage and SharedPreferences implementation structured to support future API integration."
        }
      ]
    },

    techStack: [
      {
        title: "Architecture",
        items: ["Feature-First Structure", "Clean Architecture"]
      },
      {
        title: "State Management",
        items: ["Flutter Bloc", "Hydrated Bloc"]
      },
      {
        title: "Routing & DI",
        items: ["GoRouter", "GetIt"]
      },
      {
        title: "Storage",
        items: ["Hydrated Storage", "Shared Preferences"]
      },
      {
        title: "UI & Performance",
        items: [
          "Flutter ScreenUtil",
          "Flutter SVG",
          "Cached Network Image",
          "Animations Package"
        ]
      }
    ],

    challenges: [
      {
        challenge:
          "Maintaining consistent state persistence across application restarts without degrading performance.",
        solution:
          "Integrated Hydrated Bloc with optimized state emission patterns to ensure efficient serialization and restoration."
      },
      {
        challenge:
          "Ensuring modular scalability for future feature expansion.",
        solution:
          "Adopted Feature-First Clean Architecture with strict separation of concerns and dependency injection."
      },
      {
        challenge:
          "Preventing unnecessary UI rebuilds in complex state scenarios.",
        solution:
          "Applied selective rebuild logic and granular Bloc listeners to isolate widget updates."
      }
    ]
  }

}
