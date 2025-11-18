export const enTranslation = {
  app: {
    name: "RecyClean",
  },
  header: {
    logoAlt: "{{appName}} logo",
    profileButton: "Open user menu",
  },
  navigation: {
    home: "Home",
    analyze: "Analyze",
    calendar: "Calendar",
    map: "Map",
    settings: "Settings",
  },
  onboarding: {
    tagline: "Make recycling effortless",
    description: "Track small daily eco actions.\\nFind nearby drop-off points easily.",
    cta: "Get started",
    hint: "Start living sustainably with {{appName}} now.",
  },
  dashboard: {
    welcome: {
      greeting: "Hello, {{name}}!",
      defaultName: "friend",
      helper: "I'll guide you through today's recycling.",
      stats: {
        items: "Items handled today",
        points: "Points earned",
        streak: "Day streak",
      },
    },
    tracker: {
      title: "Activity tracker",
      monthlyPoints: "Points collected this month",
      goal: "Goal {{goal}}pt",
      percent: "{{percent}}% complete",
      highlight: "Goal achieved!",
      logAction: "Log activity",
      stats: {
        entries: "Entries",
        items: "Items",
        categories: "Categories",
      },
    },
    materialSearch: {
      title: "Material search",
      placeholder: "Search by material or item",
      filters: {
        all: "All",
        Plastic: "Plastic",
        Glass: "Glass",
        Metal: "Metal",
        Paper: "Paper",
      },
      recyclable: "Recyclable",
      notRecyclable: "Not allowed",
      empty: "No matches for the current filters.",
    },
    recentActivity: {
      title: "Recent activity",
      meta: "{{count}} items · {{time}}",
      points: "+{{points}} pts",
      empty: "No activities recorded yet. Start logging your first recycling activity!",
    },
    monthlyProgress: {
      title: "Monthly goal progress",
      value: "{{current}} / {{goal}} points",
      subtitle: "As of January 2025",
      percent: "{{percent}}% complete",
    },
    quickActions: {
      title: "Quick actions",
      analyze: "Analyze with AI",
      map: "Find drop-off bins",
      record: "Add manual entry",
    },
    achievements: {
      title: "Achievements",
      earned: "Completed",
    },
    goals: {
      title: "Sustainability goals",
    },
    tips: {
      title: "Green ideas",
      all: "All",
      categories: {
        reduce: "Reduce",
        reuse: "Reuse",
        recycle: "Recycle",
        energy: "Energy",
      },
      impactLabel: "Impact: {{value}}",
      difficultyLabel: "Difficulty: {{value}}",
      impact: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      difficulty: {
        easy: "Easy",
        moderate: "Moderate",
        hard: "Hard",
      },
    },
    addEntry: {
      title: "Add Activity",
      category: "Category",
      material: "Material",
      amount: "Amount",
      date: "Date",
      pointsPreview: "Expected points: +{{points}}pt",
    },
  },
  analyze: {
    introTitle: "AI recycling classification",
    introDescription: "Take a photo or upload an image to learn how to recycle it properly.",
    actions: {
      capture: "Capture photo",
      upload: "Upload image",
      cancel: "Cancel",
    },
    errors: {
      onlyImages: "Only image files can be uploaded.",
      unsupported: "Your browser can't access the camera.",
      permission: "Please allow camera access.",
      playback: "Unable to play the camera stream.",
      notReady: "The camera feed is not ready yet.",
      stillInitializing: "The camera is still initializing. Try again shortly.",
      captureFailed: "Unable to capture the image.",
    },
    camera: {
      overlay: "Preparing the camera...",
    },
    scanning: {
      headline: "Analyzing your image...",
      subtext: "This takes just a moment.",
    },
    status: {
      recyclable: "Recyclable ♻️",
      notRecyclable: "Not recyclable ❌",
    },
    result: {
      title: "Classification result",
      confidence: "{{value}}% confidence",
      material: "Material: {{category}}",
      instructionsTitle: "Handling steps",
      retry: "Retake",
      logAction: "Log recycling",
      saveSuccess: "✅ Added to your activity log!",
    },
    tips: {
      title: "Shooting tips",
      items: [
        "Shoot in bright, even lighting.",
        "Use a clean background for better accuracy.",
        "Make sure the recycling symbol is visible.",
        "Capture the item straight on when possible.",
      ],
    },
    captured: {
      alt: "Captured image preview",
      resetAria: "Retake photo",
    },
    mockResults: {
      plasticBottle: {
        item: "Plastic water bottle",
        category: "Plastic #1 (PET)",
        instructions: "Remove the label and cap, rinse well, and recycle.",
        tips: "Look for the #1 recycling symbol on the bottom.",
      },
      pizzaBox: {
        item: "Pizza box",
        category: "Contaminated paper",
        instructions: "Grease and food stains make it hard to recycle.",
        tips: "Recycle only the clean portions; trash the rest.",
      },
      aluminumCan: {
        item: "Aluminum can",
        category: "Aluminum",
        instructions: "Rinse with water and crush to save space.",
        tips: "Metal cans have high recycling value.",
      },
    },
  },
  calendar: {
    overviewTitle: "{{month}} activity calendar",
    stats: {
      records: "Total records",
      items: "Total items",
      points: "Points earned",
    },
    legend: {
      title: "Material legend",
      count: "{{count}} pcs",
      points: "+{{points}} pts",
      empty: "No records for this month yet.",
    },
    entries: {
      title: "Records on {{date}}",
      meta: "{{count}} items · {{time}}",
      points: "+{{points}} pts",
      empty: "No entries on this day.",
      confirmDelete: "Are you sure you want to delete this record?",
    },
    guide: {
      title: "Tracking guide",
      items: [
        "Entries automatically feed into your monthly stats.",
        "New scans appear on the calendar instantly.",
        "Busy days show a dot indicator on the calendar.",
      ],
    },
  },
  map: {
    filter: {
      title: "Nearby drop-off bins",
      useLocation: "Use my location",
      options: {
        all: "All types",
        recycling: "Recycling",
        general: "General",
        electronic: "Electronics",
        compost: "Compost",
      },
    },
    placeholder: {
      title: "Map coming soon",
      subtitle: "We'll show {{count}} drop-off bins near you shortly.",
    },
    bins: {
      empty: "No bins match the current filter.",
      sectionLabel: "Accepted items",
      directions: "Directions",
      report: "Report status",
    },
    availability: {
      available: "Available",
      full: "Full",
      maintenance: "Under maintenance",
    },
    centers: {
      title: "Recycling centers",
      directions: "Directions",
      call: "Call",
    },
  },
  settings: {
    profile: {
      avatarAlt: "Default profile image",
      joined: "Joined {{date}}",
      points: "{{points}} pts",
      streak: "{{days}}-day streak",
    },
    impact: {
      title: "My impact",
      items: "Items processed",
      points: "Total points",
    },
    preferences: {
      title: "App preferences",
      notifications: {
        title: "Notifications",
        description: "Send recycling reminders",
        status: {
          requesting: "Requesting permission from your browser…",
          granted: "Notifications are allowed.",
          denied: "Notifications are blocked in your browser.",
          unsupported: "This browser does not support system notifications.",
          error: "Something went wrong while requesting permission.",
        },
      },
      location: {
        title: "Location services",
        description: "Find nearby drop-off bins",
        status: {
          requesting: "Requesting access to your location…",
          granted: "Location access is allowed.",
          denied: "Location access is blocked.",
          unsupported: "This device cannot share its location.",
          error: "Something went wrong while requesting location access.",
        },
      },
      darkMode: {
        title: "Dark mode",
        description: "Switch to the dark theme",
      },
      sounds: {
        title: "Sounds",
        description: "Play action sound effects",
      },
    },
    locale: {
      title: "Language & region",
      languageLabel: "Language",
      regionLabel: "Region",
      regionHint: "Currently optimized for the Korean pilot region.",
      regions: {
        kr: "South Korea",
        us: "United States",
        ca: "Canada",
        uk: "United Kingdom",
      },
    },
    support: {
      title: "Account & support",
      editProfile: "Edit profile",
      privacy: "Privacy settings",
      helpCenter: "Help center",
      about: "About the app",
      logout: "Log out",
    },
  },
  profile: {
    card: {
      avatarAlt: "User profile image",
      joined: "Joined {{date}}",
      points: "{{points}} pts",
      streak: "{{days}} day streak",
    },
    impact: {
      title: "My Impact",
      items: "Items Recycled",
      points: "Total Points",
    },
    level: {
      title: "Level Progress",
      currentLevel: "Level {{level}}",
      nextLevel: "To next level",
      pointsNeeded: "{{points}}pt needed",
      maxLevel: "Max level achieved!",
    },
    categories: {
      title: "Category Statistics",
      topCategory: "Most Recycled",
      noData: "No category data yet.",
      items: "{{count}} items",
      points: "{{points}}pt",
    },
  },
  notifications: {
    actions: {
      close: "Close",
      undo: "Undo",
    },
    banner: {
      welcome: {
        message: "Welcome, {{name}}! Log your first recycling activity.",
        cta: "Get started",
      },
    },
    snackbar: {
      entrySaved: "Activity saved! +{{points}}pt earned",
      entryDeleted: "Activity entry deleted",
      entryRestored: "Entry restored",
    },
  },
  common: {
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    confirm: "Confirm",
  },
} as const;
