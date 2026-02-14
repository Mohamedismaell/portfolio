export const projectsMap: Record<string, any> = {
  "news-app": {
    slug: "news-app",
    title: "Quick Read",
    color: "#475AD7",
    role: "Flutter Developer",
    duration: "2025",
    // platform: "Android & iOS",
    shortDescription:
      "Stay informed with a high-performance news platform built using scalable Clean Architecture and optimized state management. The application supports real-time news fetching, smart caching for offline reading, category-based filtering, and bookmark management for a personalized experience.",
    description:
      "Designed with a modular architecture and efficient API handling to ensure fast load times, maintainability, and production-ready performance across different devices.",

    highlights: [
      "20+ articles per API request",
      "Multi-category filtering",
      "Error & loading states handling",
      "Responsive UI design",
    ],
    features: [
      "Category-based news browsing",
      "Search functionality",
      "Bookmark system",
      "Clean Architecture structure",
      "API caching and error handling",
    ],

    challenge:
      "Handling multiple API endpoints, state synchronization, and scalable architecture while keeping smooth UI performance.",

    solution:
      "Implemented Clean Architecture with Cubit, modular layers, and reusable UI components for scalability and maintainability.",

    tech: ["Flutter", "REST API", "Cubit", "Clean Architecture"],
    github: "https://github.com/Mohamedismaell/News",
    image: "/projects/news/cover.png",


    heroScreens: [
      '/projects/news/splash.png',
      '/projects/news/onboarding(1).png',
      '/projects/news/onboarding(2).png',
      '/projects/news/homedisplay.png',
      '/projects/news/post_details.png',
      '/projects/news/categories.png',
      '/projects/news/explore_category(2).png',
      '/projects/news/bookmarks.png',
      '/projects/news/profile.png',
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
          "Displays latest news using REST APIs with smooth scrolling, loading states, and optimized UI performance.",
        features: [
          "Real-time API news fetching",
          "Smooth scrolling UI",
          "Optimized image loading",
        ],
        image: "/projects/news/homedisplay.png",
      },
      {
        label: "SCREEN 02",
        title: "Category Filtering System",
        description:
          "Users can browse news by category with dynamic API calls and structured state management using Cubit.",
        features: [
          "Dynamic category filtering",
          "Cubit state management",
          "Clean architecture separation",
        ],
        image: "/projects/news/categories.png",
      },
      {
        label: "SCREEN 03",
        title: "Bookmarks & Saved Articles",
        description:
          "Save favorite articles locally with persistent storage for quick offline access.",
        features: [
          "Local persistence storage",
          "Bookmark toggle system",
          "Fast retrieval performance",
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
            "UI screens, widgets, and Cubit/BLoC state management responsible for rendering and user interaction.",
        },
        {
          name: "Domain Layer (Business Logic)",
          description:
            "Use cases and entities that define core business rules independent from frameworks.",
        },
        {
          name: "Data Layer (API & Repositories)",
          description:
            "REST API services, DTO models, and repository implementations handling remote and local data sources.",
        },
      ],
    },



    // tasky: {
    //   slug: "tasky",
    //   title: "Tasky App",
    //   role: "Flutter Developer",
    //   shortDescription:
    //     "Task management app with local storage and responsive UI.",
    //   description:
    //     "A productivity task management application focused on performance, local persistence, and clean UI architecture.",
    //   challenge:
    //     "Designing smooth UX with persistent storage and scalable state updates.",
    //   solution:
    //     "Used structured state management with local storage and reusable components.",
    //   tech: ["Flutter", "Hive", "State Management", "Responsive UI"],
    //   github: "https://github.com/Mohamedismaell/tasky",
    //   demo: "",
    //   image: "/projects/tasky/cover.png",
    //   gallery: [
    //     "/projects/tasky/1.png",
    //     "/projects/tasky/2.png",
    //   ],
    // },

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
}
