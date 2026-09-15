export const projectsMap: Record<string, any> = {
   mind_trip: {
  slug: "mindtrip",
  title: "MindTrip",
  role: "Flutter Developer",
  color: "#5596FE",
  year: "2026",
  duration: "2025 - Present",

  googlePlay: null,
  appStore: null,
  liveDemo: null,
  comingSoon: true,

  eyebrow: "AI Travel Platform",
  subtitle: "AI-powered Trip Planning & Smart Travel Companion",

  overview:
      "MindTrip is an AI-powered travel planning platform that transforms how people discover destinations, build itineraries, and organize trips. Combining conversational AI, personalized recommendations, interactive maps, and collaborative planning, it helps travelers create complete journeys tailored to their interests, budget, and travel style.",

  quickFacts: [
  { label: "Platform", value: "iOS + Android" },
  { label: "Architecture", value: "Clean Architecture" },
  { label: "Backend", value: "REST API" },
  { label: "Focus", value: "AI Trip Planning" },
],

  links: [
    {
      label: "GitHub",
      href: "https://github.com/Mohamedismaell/MindTrip",
      variant: "primary",
      icon: "github",
    },
  ],

  stats: [
    { label: "Screens", value: "40+" },
    { label: "Features", value: "15+" },
    { label: "Tech", value: "15" },
    { label: "Challenges", value: "4" },
  ],

 developmentProcess: [
  "Research & travel workflow analysis",
  "User flow & AI conversation design",
  "Design system & reusable UI components",
  "Feature-First Clean Architecture",
  "Backend & AI integration",
  "Maps & location services",
  "Testing & optimization",
],
  shortDescription:
      "An AI-powered travel planning application built with Flutter, combining conversational trip planning, personalized recommendations, interactive maps, and collaborative itinerary management in a scalable architecture.",

  description:
      "MindTrip is a modern travel planning platform built with Flutter that simplifies every stage of travel. Users can chat with an AI assistant to generate personalized itineraries, discover destinations, hotels, restaurants, and attractions, organize multi-day trips, explore interactive maps, save favorite places, and collaborate with friends when planning journeys. The project follows Feature-First Clean Architecture with scalable state management and backend integration, creating a maintainable and production-ready codebase.",

  highlights: [
    "AI-powered conversational trip planning",
    "Personalized itinerary generation",
    "Interactive maps & nearby places",
    "Collaborative trip planning",
    "Feature-First Clean Architecture",
  ],

  features: [
    "AI travel assistant",
    "Personalized itinerary generation",
    "Destination recommendations",
    "Interactive maps",
    "Nearby places discovery",
    "Hotels & restaurants search",
    "Saved places",
    "Trip management",
    "Trip calendar",
    "Collaborative planning",
    "Advanced search & filters",
    "Authentication",
    "Profile personalization",
    "Responsive UI",
    "Offline caching",
  ],

  challenge:
      "Building a scalable AI-powered travel platform capable of combining conversational planning, interactive maps, destination discovery, itinerary generation, and collaborative trip management while maintaining clean architecture and smooth user experience.",

  solution:
    "Implemented the application using Feature-First Clean Architecture with BLoC state management, a custom REST API backend, Hive for local persistence, Google Authentication, and repository abstraction. Integrated AI-powered trip generation, interactive maps, and personalized recommendations into a scalable and maintainable architecture.",
 tech: [
  "Flutter",
  "Dart",
  "Clean Architecture",
  "Feature-First Structure",
  "Bloc",
  "Cubit",
  "REST API",
  "Dio",
  "Hive",
  "Mapbox",
  "Google Maps",
  "Google Places API",
  "Google Sign-In",
  "JWT Authentication",
  "Freezed",
  "GoRouter",
  "GetIt",
  "Responsive UI",
],

  github: "https://github.com/Mohamedismaell/MindTrip",

  image: "/projects/MindTrip/mindtrip_logo.png",

  heroCover: "/projects/MindTrip/mind_trip_cover.png",

  heroScreens: [
  "https://youtu.be/8QZpCPYGpNE?si=5420RqDnble_UyQJ", 
 ],

  gallery: [
    "/projects/MindTrip/2D_preview/Slice 1.png",
    "/projects/MindTrip/2D_preview/Slice 2.png",
    "/projects/MindTrip/2D_preview/Slice 3.png",
    "/projects/MindTrip/2D_preview/Slice 4.png",
    "/projects/MindTrip/2D_preview/Slice 5.png",
    "/projects/MindTrip/2D_preview/Slice 6.png",
    "/projects/MindTrip/2D_preview/Slice 7.png",
    "/projects/MindTrip/2D_preview/Slice 8.png",
    "/projects/MindTrip/2D_preview/Slice 9.png",
    "/projects/MindTrip/2D_preview/Slice 10.png",
    "/projects/MindTrip/2D_preview/Slice 11.png",
    "/projects/MindTrip/2D_preview/Slice 12.png",
    "/projects/MindTrip/2D_preview/Slice 13.png",
    "/projects/MindTrip/2D_preview/Slice 14.png",
    "/projects/MindTrip/2D_preview/Slice 15.png",
  ],

  results: {
    screens: "40+",
    features: "15+",
    tech: "15",
    linesOfCode: "12k+",
    challenges: "4",
    architecture: "Feature-First",
    githubUrl: "https://github.com/Mohamedismaell/MindTrip",
  },

sections: [
  {
    label: "SCREEN 01",
    title: "Personalized Home",
    description:
        "A personalized dashboard that greets users with curated destinations, AI-powered recommendations, and quick access to discover new places.",
    features: [
      "Personalized recommendations",
      "Featured destinations",
      "Quick search access",
    ],
    image: "/projects/MindTrip/normal/Device(15).png",
  },
  {
    label: "SCREEN 02",
    title: "Explore Destinations",
    description:
        "Browse destinations through smart categories, voice search, filters, and personalized recommendations tailored to your interests.",
    features: [
      "Category browsing",
      "Voice search",
      "Smart recommendations",
    ],
    image: "/projects/MindTrip/normal/Device(10).png",
  },
  {
    label: "SCREEN 03",
    title: "Advanced Filters",
    description:
        "Refine search results using location, travel style, hidden gems, and budget filters to discover the perfect destination.",
    features: [
      "Location filtering",
      "Budget selection",
      "Travel preferences",
    ],
    image: "/projects/MindTrip/normal/Device(11).png",
  },
  {
    label: "SCREEN 04",
    title: "Travel Discovery",
    description:
        "Explore hotels, restaurants, hidden gems, and local experiences organized into intuitive travel categories.",
    features: [
      "Hotels & restaurants",
      "Hidden gems",
      "Travel collections",
    ],
    image: "/projects/MindTrip/normal/Device(1).png",
  },
  {
    label: "SCREEN 05",
    title: "Saved Places",
    description:
        "Keep favorite destinations, restaurants, hotels, and attractions organized for quick access during trip planning.",
    features: [
      "Favorites management",
      "Category organization",
      "Quick access",
    ],
    image: "/projects/MindTrip/normal/Device(2).png",
  },
  {
    label: "SCREEN 06",
    title: "AI Trip Planning",
    description:
        "Start planning with Mindy, the AI travel assistant, through a guided conversational experience.",
    features: [
      "AI assistant",
      "Guided planning",
      "Trip generation",
    ],
    image: "/projects/MindTrip/normal/Device(3).png",
  },
  {
    label: "SCREEN 07",
    title: "Trip Preferences",
    description:
        "Collect travel dates and preferences through an intuitive step-by-step planning flow before generating itineraries.",
    features: [
      "Date selection",
      "Planning wizard",
      "Progress tracking",
    ],
    image: "/projects/MindTrip/normal/Device(4).png",
  },
  {
    label: "SCREEN 08",
    title: "AI Conversation",
    description:
        "Interact naturally with Mindy to describe your destination, travel style, and preferences before generating your trip.",
    features: [
      "Conversational AI",
      "Natural language",
      "Personalized responses",
    ],
    image: "/projects/MindTrip/normal/Device(5).png",
  },
  {
    label: "SCREEN 09",
    title: "Trip Details",
    description:
        "View complete travel itineraries with accommodations, daily activities, budgets, and organized schedules.",
    features: [
      "Daily itinerary",
      "Accommodation details",
      "Budget overview",
    ],
    image: "/projects/MindTrip/normal/Device(6).png",
  },
  {
    label: "SCREEN 10",
    title: "Add to Trip",
    description:
        "Save destinations directly into existing travel plans through a streamlined trip selection interface.",
    features: [
      "Trip selection",
      "Destination saving",
      "Trip organization",
    ],
    image: "/projects/MindTrip/normal/Device(12).png",
  },
  {
    label: "SCREEN 11",
    title: "Smart Search",
    description:
        "Find attractions, restaurants, and experiences instantly with intelligent search suggestions and categorized results.",
    features: [
      "Instant search",
      "Smart suggestions",
      "Categorized results",
    ],
    image: "/projects/MindTrip/normal/Device(13).png",
  },
  {
    label: "SCREEN 12",
    title: "Trip Management",
    description:
        "Manage upcoming, draft, and completed trips from a centralized dashboard with organized travel history.",
    features: [
      "Trip organization",
      "Draft management",
      "Travel history",
    ],
    image: "/projects/MindTrip/normal/Device(8).png",
  },
  {
    label: "SCREEN 13",
    title: "Travel Calendar",
    description:
        "Visualize upcoming journeys with an integrated calendar that keeps every travel schedule in one place.",
    features: [
      "Calendar view",
      "Schedule overview",
      "Trip timeline",
    ],
    image: "/projects/MindTrip/normal/Device(7).png",
  },
  {
    label: "SCREEN 14",
    title: "User Profile",
    description:
        "Personalize your travel experience by managing your profile, interests, saved places, and travel statistics.",
    features: [
      "Profile customization",
      "Travel interests",
      "Activity overview",
    ],
    image: "/projects/MindTrip/normal/Device(9).png",
  },
],

  challenges: [
    {
      icon: "ai",
      title: "Conversational AI Planning",
      challenge:
          "Creating a natural AI-driven planning experience that collects travel preferences through conversation while progressively generating personalized itineraries.",
      solution:
          "Designed a conversational planning flow with structured AI prompts, incremental preference collection, and dynamic itinerary generation to deliver a seamless user experience.",
    },
    {
      icon: "map",
      title: "Interactive Travel Experience",
      challenge:
          "Synchronizing maps, destination details, nearby places, and generated itineraries into one connected travel experience without breaking navigation flow.",
      solution:
          "Integrated interactive maps with deep linking between destinations, trip plans, and place details, allowing users to seamlessly navigate across every stage of trip planning.",
    },
    {
      icon: "layers",
      title: "Scalable Architecture",
      challenge:
          "Building a large-scale travel platform with AI, authentication, maps, recommendations, chat, and trip management while keeping the codebase maintainable.",
      solution:
          "Implemented a Feature-First Clean Architecture using BLoC, dependency injection, repositories, and modular features to ensure scalability, maintainability, and testability.",
    },
  {
  icon: "database",
  title: "Data Synchronization",
  challenge:
      "Synchronizing user trips, AI-generated itineraries, favorites, and travel data between the backend and local storage while keeping the application responsive.",
  solution:
      "Implemented a repository-based data layer using REST APIs with Dio and Hive caching, ensuring smooth synchronization, offline persistence, and fast application performance.",
},
  ],
},
  news_app: {
    slug: "news-app",
    title: "Quick Read",
    color: "#475AD7",
    role: "Flutter Developer",
    year: "2025",
    duration: "2025",
    googlePlay: null,
    appStore: null,
    liveDemo: null,
    comingSoon: false,

    eyebrow: "Mobile Application",
    subtitle: "A smarter way to read the world.",
    overview:
      "Quick Read is a modular, high-performance news app designed to deliver lightning-fast article feeds, offline-first reading, and smooth category exploration. Built with modern Flutter clean architecture and local Hive caching for an instant, stutter-free experience.",

    quickFacts: [
      { label: "Platform", value: "iOS • Android" },
      { label: "Architecture", value: "Clean (BLoC)" },
      { label: "Storage", value: "Hive (Offline)" },
      { label: "Focus", value: "Content Speed" },
    ],

    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mohamedismaell/News",
        variant: "primary",
        icon: "github",
      },
    ],

    stats: [
      { label: "Screens", value: "9+" },
      { label: "Main Flows", value: "3" },
      { label: "Features", value: "10+" },
      { label: "Challenges", value: "2" },
    ],
developmentProcess: [
  "Requirements & Planning",
  "UI/UX Design & Typography",
  "Core Architecture Setup",
  "Hive Offline Engine",
  "Profiling & Release",
],
results: {
  screens: "9+",
  features: "10+",
  technologies: "10",
  packages: "12+",
    linesOfCode: "3K+",
  githubUrl: "https://github.com/Mohamedismaell/News",
},
    shortDescription:
      "Quick Read is a modular, high-performance news app designed to deliver lightning-fast article feeds, offline-first reading, and smooth category exploration. Built with modern Flutter clean architecture and local Hive caching for an instant, stutter-free experience.",

    description:
      "Quick Read was built with a strict focus on clean architecture, offline-first local storage, and high-framerate rendering across low and high-end hardware. Every layer was designed for separation of concerns, enabling rapid feature expansion without compromising stability.",

   highlights: [
  "Clean Architecture implementation",
  "Offline-first with Hive cache",
  "Simple and intuitive reader UI",
  "Instant category filtering & search",
  "Reading progress & cached stats",
  "Dark and light theme support",
],

    features: [
      "Onboarding with curated interests",
      "Instant streaming article feed",
      "Distraction-free reader view",
      "Category-based exploration",
      "Offline library with cached articles",
      "Real-time search with dynamic filtering",
      "Persistent bookmark management",
      "Responsive Material 3 interface",
    ],

    challenge:
      "Ensuring instantaneous article access with zero loading spinners even on unstable cellular connections, while preventing frame drops during high-speed scrolling through image-heavy article feeds.",

    solution:
      "Implemented a dual-tier Hive key-value cache for instant UI rendering from disk while syncing diffs in the background. Wrapped news cards in RepaintBoundary widgets, leveraged cached network image pools with downscaled memory limits, and isolated BLoC rebuild trees from scroll view listeners.",

tech: [
  "Flutter",
  "Dart",
  "BLoC/Cubit",
  "Hive DB",
  "Dio",
  "GoRouter",
  "Clean Architecture",
  "REST API",
  "Responsive UI",
],
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
        title: "Onboarding",
        description:
          "Curated interests & setup. Personalize your feed with the topics you care about.",
        features: [
          "Curated interest selection",
          "Personalized feed setup",
          "Smooth onboarding flow",
        ],
        image: "/projects/news/onboarding(1).png",
      },
      {
        label: "SCREEN 02",
        title: "Article Feed",
        description:
          "Instant streaming feed. A dynamic news feed powered by REST APIs with smooth scrolling, optimized rebuild cycles, and intelligent loading state handling.",
        features: [
          "Real-time API-driven content rendering",
          "Efficient image loading and caching",
          "Granular loading & error state management",
        ],
        image: "/projects/news/homedisplay.png",
      },
      {
        label: "SCREEN 03",
        title: "Reader View",
        description:
          "Distraction-free typography. A focused reading experience with optimized text rendering and offline support.",
        features: [
          "Clean reading typography",
          "Offline article access",
          "Reading progress tracking",
        ],
        image: "/projects/news/post_details.png",
      },
      {
        label: "SCREEN 04",
        title: "Categories",
        description:
          "Instant topic exploration. A scalable filtering mechanism allowing users to explore news categories through dynamic API requests.",
        features: [
          "Dynamic category-based API calls",
          "Cubit-driven selective rebuilds",
          "Strict presentation/domain/data isolation",
        ],
        image: "/projects/news/categories.png",
      },
      {
        label: "SCREEN 05",
        title: "Offline Library",
        description:
          "Cached stories anywhere. A persistent bookmark system enabling offline-first access to saved articles using local storage.",
        features: [
          "Hive-based local persistence",
          "Instant bookmark toggle mechanism",
          "Offline article access with structured caching",
        ],
        image: "/projects/news/bookmarks.png",
      },
    ],

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
    icon: "performance",
    title: "Offline-First Synchronization",
    challenge:
      "Ensuring instantaneous article access with zero loading spinners even on unstable cellular connections.",
    solution:
      "Implemented a dual-tier Hive key-value cache. Remote feeds serialize into local storage instantly, allowing the UI to render from disk immediately while syncing diffs in the background.",
  },
  {
    icon: "layers",
    title: "Stutter-Free Feed Scrolling",
    challenge:
      "Preventing frame drops during high-speed scrolling through image-heavy article feeds.",
    solution:
      "Wrapped news cards in RepaintBoundary widgets, leveraged cached network image pools with downscaled memory limits, and isolated BLoC rebuild trees from scroll view listeners.",
  },
],
  },
  book_reading_app: {
    slug: "book-reading-app",
    title: "TinyShelf",
    role: "Flutter Developer",
    color: "#E06C75",
    year: "2026",
    duration: "2026",
    googlePlay: null,
    appStore: null,
    liveDemo: null,
    comingSoon: false,

    eyebrow: "Reading Product",
    subtitle: "Reading App",
    overview:
      "TinyShelf is a cloud-connected reading app built to explore scalable Flutter architecture, synced reading progress, and a polished light/dark reading experience using Supabase and Cubit-based state isolation.",

    quickFacts: [
      { label: "Platform", value: "iOS + Android" },
      { label: "Backend", value: "Supabase" },
      { label: "Architecture", value: "Feature-First Clean Architecture" },
      { label: "Focus", value: "Reading sync & modular state" },
    ],

    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mohamedismaell/Book_reading_flutter_app",
        variant: "primary",
        icon: "github",
      },
    ],

    stats: [
      { label: "Screens", value: "8" },
      { label: "Flows", value: "7" },
      { label: "Tech", value: "15+" },
      { label: "Challenges", value: "3" },
    ],

    shortDescription:
      "A cloud-connected book reading application built with Supabase backend services and Feature-First Clean Architecture. Designed to explore scalable authentication, reading progress synchronization, and dynamic theming in a modular Flutter architecture.",

    description:
      "TinyShelf is a feature-focused Flutter book reading application developed to experiment with scalable architecture patterns and cloud integration using Supabase. The app integrates Supabase Authentication, Postgres database operations, and Storage services to handle user sessions, reading progress tracking, and profile management. The architecture follows a Feature-First Clean Architecture structure with Cubit-based state management to ensure separation of concerns and controlled widget rebuilds. A centralized Material 3 theming system enables smooth light and dark mode switching across all screens.",

    highlights: [
      "Supabase Authentication & Database integration",
      "Feature-First Clean Architecture implementation",
      "Cubit-based state isolation and rebuild control",
      "Cloud-synced reading progress tracking",
      "Dynamic Material 3 Light & Dark theme system",
    ],

    features: [
      "Email/password authentication with Supabase",
      "Session persistence using Supabase auth state",
      "Reading progress synchronization with Supabase Postgres",
      "User profile image upload via Supabase Storage",
      "Book discovery and exploration screens",
      "Search functionality with filtering logic",
      "Favorites and personal library management",
      "Responsive UI using Flutter ScreenUtil",
      "Route protection using GoRouter",
    ],

    challenge:
      "Structuring a cloud-integrated reading app while maintaining modular architecture boundaries and preventing unnecessary UI rebuilds across multiple independent feature modules.",

    solution:
      "Applied Clean Architecture with repository abstraction to decouple Supabase operations from presentation logic. Used Cubit for granular state emission to control rebuild scope and maintain consistent UI performance. Centralized theming configuration to ensure global consistency.",

   tech: [
  "Flutter",
  "Dart",
  "Clean Architecture",
  "Feature-First Structure",
  "Bloc / Cubit",
  "Hydrated Bloc",
  "Supabase",
  "GoRouter",
  "Dependency Injection",
  "Repository Pattern",
  "Responsive UI",
  "Offline Caching",
  "Image Processing",
],

    github: "https://github.com/Mohamedismaell/Book_reading_flutter_app",

    image: "/projects/book_reading/normal/Dark Home.png",

    performanceMetrics: [
      "Reduced unnecessary widget rebuilds using selective BlocBuilder patterns",
      "Maintained smooth scrolling performance across list-heavy screens",
      "Optimized Supabase data access through repository abstraction",
      "Implemented isolated state emission to control UI rendering scope",
      "Structured authentication flow with predictable navigation state",
    ],

    heroScreens: [
      "/projects/book_reading/normal/dark/Screenshot_1771917082-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920920-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771917100-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920580-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771917108-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920583-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771917119-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920596-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771917127-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920602-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771919718-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920606-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771920693-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920688-portrait.png",
      "/projects/book_reading/normal/dark/Screenshot_1771920853-portrait.png",
      "/projects/book_reading/normal/light/Screenshot_1771920839-portrait.png",
    ],

    sections: [
      {
        label: "SCREEN 01",
        title: "Supabase Authentication System",
        description:
          "Secure authentication flow powered by Supabase with structured session handling, persistent login state, and protected route navigation.",
        features: [
          "Email/password authentication via Supabase",
          "Session persistence across app restarts",
          "GoRouter-based route protection",
          "Auth state isolation using Cubit",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771917082-portrait.png",
      },
      {
        label: "SCREEN 02",
        title: "Home & Book Discovery",
        description:
          "Dynamic home interface displaying structured book listings retrieved from Supabase with optimized rebuild control and responsive layout scaling.",
        features: [
          "Supabase Postgres data retrieval",
          "Repository-based data abstraction",
          "Selective Cubit rebuild optimization",
          "Efficient list rendering and scrolling performance",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771917100-portrait.png",
      },
      {
        label: "SCREEN 03",
        title: "Explore & Search System",
        description:
          "Dedicated exploration screen allowing users to browse books by category and perform structured searches with controlled state emissions.",
        features: [
          "Category-based exploration logic",
          "Search functionality with real-time filtering",
          "Query-based Supabase data fetching",
          "Optimized state updates during search interactions",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771917108-portrait.png",
      },
      {
        label: "SCREEN 04",
        title: "Personal Library Management",
        description:
          "User-focused library screen organizing saved and favorite books with synchronized state updates and efficient rendering.",
        features: [
          "Favorites management logic",
          "Bookmark persistence handling",
          "Cubit-driven UI state updates",
          "Optimized list rebuild boundaries",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771917127-portrait.png",
      },
      {
        label: "SCREEN 05",
        title: "Book Details & Metadata View",
        description:
          "Structured book details interface presenting summaries, metadata, and interaction controls with isolated state handling.",
        features: [
          "Entity-driven UI rendering",
          "Favorite toggle logic",
          "Reusable presentation components",
          "Optimized state isolation per book item",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771920693-portrait.png",
      },
      {
        label: "SCREEN 06",
        title: "Reading Experience & Progress Tracking",
        description:
          "Minimal distraction reading interface with persistent progress tracking stored in Supabase for cross-session continuity.",
        features: [
          "Cloud-synced reading progress updates",
          "Controlled UI rebuild during page updates",
          "Dynamic Light & Dark theme adaptation",
          "Focused, reader-centered layout design",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771920853-portrait.png",
      },
      {
        label: "SCREEN 07",
        title: "Profile & Account Management",
        description:
          "User profile screen connected to Supabase services for account data handling and personalized configuration.",
        features: [
          "User metadata retrieval from Supabase",
          "Session-aware profile state handling",
          "Cloud-backed user information",
          "Theme preference management",
        ],
        image: "/projects/book_reading/normal/dark/Screenshot_1771919718-portrait.png",
      },
    ],

    gallery: [
      "/projects/book_reading/2d_preview/login.png",
      "/projects/book_reading/2d_preview/home.png",
      "/projects/book_reading/2d_preview/explore.png",
      "/projects/book_reading/2d_preview/search.jpeg",
      "/projects/book_reading/2d_preview/bookdetails.png",
      "/projects/book_reading/2d_preview/reading.png",
      "/projects/book_reading/2d_preview/library.png",
      "/projects/book_reading/2d_preview/profile.png",
    ],
developmentProcess: [
  "Requirement Analysis",
  "Project Architecture",
  "Authentication & Backend",
  "Core Reading Features",
  "Performance Optimization",
  "Testing & Refinement"
],
    challenges: [
      {
        icon: "database",
        title: "Backend Decoupling",
        challenge:
          "Integrating Supabase authentication, database queries, and storage operations without tightly coupling backend logic to presentation components.",
        solution:
          "Applied repository abstraction within the data layer and injected dependencies into the domain layer to preserve Clean Architecture boundaries.",
      },
      {
        icon: "performance",
        title: "Rebuild Control",
        challenge:
          "Preventing unnecessary widget rebuilds in list-heavy and state-driven screens such as Home and Library.",
        solution:
          "Used granular Cubit state emissions and selective BlocBuilder scopes to isolate rebuild areas and improve rendering performance.",
      },
      {
        icon: "auth",
        title: "Auth Persistence",
        challenge:
          "Ensuring consistent authentication state across app restarts and navigation transitions.",
        solution:
          "Leveraged Supabase session persistence combined with Cubit-based auth state restoration and GoRouter redirect logic.",
      },
    ],

   results: {
  screens: "8+",
  features: "9+",
  technologies: "14",
  packages: "20+",
  linesOfCode: "3K+",
  githubUrl: "https://github.com/Mohamedismaell/Book_reading_flutter_app",
}
  },



tasky: {
  slug: "tasky",
  title: "Tasky",
  role: "Flutter Developer",
  color: "#15B86C",
  year: "2025",
  duration: "2025",
  googlePlay: null,
  appStore: null,
  liveDemo: null,
  comingSoon: false,

  eyebrow: "Productivity App",
  subtitle: "Flutter Developer · Task Management",

  overview:
    "Tasky is a modern task management application built with Clean Architecture and Hydrated Bloc, delivering reliable offline task persistence, responsive state management, and a scalable foundation for future productivity features.",

  quickFacts: [
    { label: "Platform", value: "iOS + Android" },
    { label: "Architecture", value: "Clean Architecture" },
    { label: "Persistence", value: "Hydrated Bloc" },
    { label: "Focus", value: "Offline Task Management" },
  ],

  links: [
    {
      label: "GitHub",
      href: "https://github.com/Mohamedismaell/tasky",
      variant: "primary",
      icon: "github",
    },
  ],

  stats: [
    { label: "Screens", value: "7" },
    { label: "Features", value: "7+" },
    { label: "Tech", value: "10" },
    { label: "Challenges", value: "3" },
  ],

  developmentProcess: [
    "Requirements & feature planning",
    "Architecture and project setup",
    "Task management implementation",
    "State persistence integration",
    "Theme & profile customization",
    "Testing & optimization",
  ],

  shortDescription:
    "A production-ready task management application built with Feature-First Clean Architecture, Hydrated Bloc, and responsive Flutter UI. Tasky focuses on reliable offline persistence, efficient state management, and a clean user experience.",

  description:
    "Tasky was developed to demonstrate scalable Flutter application architecture using Feature-First organization and Clean Architecture principles. The project combines Hydrated Bloc for automatic state restoration, GetIt for dependency injection, and GoRouter for structured navigation, resulting in a maintainable codebase with predictable state management and responsive performance.",

  highlights: [
    "Feature-First Clean Architecture implementation",
    "Persistent state with Hydrated Bloc",
    "Optimized Bloc rebuild strategy",
    "Dynamic light & dark themes",
    "Scalable dependency injection with GetIt",
  ],

  features: [
    "Create, edit, and delete tasks",
    "Status-based task organization",
    "Persistent offline task storage",
    "Automatic state restoration",
    "Theme customization",
    "Profile management",
    "Responsive Material 3 interface",
  ],

  challenge:
    "Building a scalable task management application that preserves user data across app restarts while maintaining clean architecture and smooth UI performance.",

  solution:
    "Implemented Hydrated Bloc for automatic state persistence, structured the project using Feature-First Clean Architecture, and optimized Bloc rebuilds to deliver responsive and maintainable application behavior.",

  tech: [
    "Flutter",
    "Dart",
    "Clean Architecture",
    "Feature-First Structure",
    "Bloc",
    "Hydrated Bloc",
    "GoRouter",
    "GetIt",
    "Material 3",
    "Responsive UI",
  ],

  github: "https://github.com/Mohamedismaell/tasky",
    image: "/projects/tasky/normal/Screenshot 2026-02-15 184935.png",

heroScreens: [
      "/projects/tasky/normal/Splash-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159434-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159896-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159689-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159908-portrait.png",
      "/projects/tasky/normal/Screenshot_1771159921-portrait.png",
      "/projects/tasky/normal/Screenshot_1771161022-portrait.png",
    ],

    gallery: [
      "/projects/tasky/2D_preview/welcome.png",
      "/projects/tasky/2D_preview/home.png",
      "/projects/tasky/2D_preview/add_task.png",
      "/projects/tasky/2D_preview/todo.png",
      "/projects/tasky/2D_preview/completed.png",
      "/projects/tasky/2D_preview/profile.png",
    ],
results: {
  screens: "7",
  features: "7+",
  tech: "10",
  linesOfCode: "1k+",
  challenges: "3",
  architecture: "Feature-First",
  githubUrl: "https://github.com/Mohamedismaell/tasky",
},
    sections: [
      {
        label: "SCREEN 01",
        title: "Dashboard Overview",
        description:
          "Centralized task dashboard displaying structured Todo and Completed sections with real-time state updates and optimized UI rendering.",
        features: [
          "Selective Bloc rebuild strategy",
          "Status-based task segmentation",
          "Smooth animated list transitions",
        ],
        image: "/projects/tasky/normal/Screenshot_1771159896-portrait.png",
      },
      {
        label: "SCREEN 02",
        title: "Todo Management",
        description:
          "Dedicated Todo view enabling efficient task tracking, quick editing, and seamless status transitions.",
        features: [
          "Instant task state updates",
          "Optimized event handling with Bloc",
          "Structured feature-based architecture",
        ],
        image: "/projects/tasky/normal/Screenshot_1771159908-portrait.png",
      },
      {
        label: "SCREEN 03",
        title: "Completed Tasks",
        description:
          "Clear visualization of completed tasks with structured filtering logic and persistent state synchronization.",
        features: [
          "Hydrated persistent storage",
          "Efficient filtering logic",
          "Consistent UI rebuild boundaries",
        ],
        image: "/projects/tasky/normal/Screenshot_1771159921-portrait.png",
      },
      {
        label: "SCREEN 04",
        title: "Profile & Preferences",
        description:
          "User configuration screen supporting dynamic theme switching and persistent personalization settings.",
        features: [
          "Light & Dark mode toggle",
          "SharedPreferences integration",
          "Global theme state management",
        ],
        image: "/projects/tasky/normal/Screenshot_1771161022-portrait.png",
      },
    ],
  challenges: [
    {
      icon: "database",
      title: "Persistent State",
      challenge:
        "Keeping tasks and application state available after every app restart without relying on a backend.",
      solution:
        "Integrated Hydrated Bloc to automatically serialize and restore application state, providing a seamless offline experience.",
    },
    {
      icon: "layers",
      title: "Scalable Architecture",
      challenge:
        "Designing a project structure that remains maintainable as new features are introduced.",
      solution:
        "Adopted a Feature-First Clean Architecture with dependency injection and repository abstraction to keep features modular and scalable.",
    },
    {
      icon: "performance",
      title: "UI Performance",
      challenge:
        "Preventing unnecessary widget rebuilds while handling frequent task updates and filtering operations.",
      solution:
        "Separated business logic into feature-specific Blocs and optimized rebuilds using selective BlocBuilder updates.",
    },
  ],
},


};