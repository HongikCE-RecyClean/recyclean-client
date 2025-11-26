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
    nameRequired: "Please enter a nickname.",
    namePlaceholder: "Enter nickname",
    kakaoLogin: "Continue with Kakao",
    kakaoNotConfigured: "Kakao login is not configured",
  },
  auth: {
    callback: {
      loading: "Processing your login...",
      success: "Login successful!",
      redirecting: "Redirecting shortly...",
      error: "Login failed",
      retry: "Try again",
    },
    errors: {
      kakaoFailed: "Kakao login failed",
      noCode: "Authorization code missing",
      loginFailed: "Login failed. Please try again.",
    },
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
    hero: {
      subtitle: "This month's progress",
      currentPoints: "Current points",
      today: "Today",
      total: "Total",
    },
    tracker: {
      title: "Activity tracker",
      monthlyPoints: "Points collected this month",
      goal: "Goal {{goal}}pt",
      percent: "{{percent}}% complete",
      highlight: "Goal achieved!",
      logAction: "Add activity",
      stats: {
        entries: "Entries",
        items: "Items",
        categories: "Categories",
        planned: "Planned {{count}}",
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
      showMore: "Show more",
      showLess: "Show less",
    },
    recentActivity: {
      title: "Recent activity",
      meta: "{{count}} items | {{time}}",
      points: "+{{points}} pts",
      pointsPlanned: "Planned +{{points}} pts",
      modes: {
        record: "Completed",
        plan: "Planned",
      },
      empty: "No activities recorded yet.\nStart logging your first recycling activity!",
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
      modeLabel: "Entry type",
      modeOptions: {
        record: "Record activity",
        plan: "Plan activity",
      },
      category: "Category",
      material: "Material",
      amount: "Amount",
      date: "Date",
      time: "Time",
      pointsPreview: "Expected points: +{{points}}pt",
    },
    materials: {
      plasticPetBottle: {
        name: "Clear PET bottles (water & beverages)",
        instructions:
          "Empty, rinse, remove the label and cap, then compress before placing them in a clear-PET bin.",
        tips: "Colorless, label-free bottles that are lightly crushed become higher quality recycled resin.",
      },
      plasticTakeoutContainer: {
        name: "Greasy plastic takeout container",
        instructions:
          "If stubborn sauce or oil remains, recycling trucks reject it. When you can't clean it thoroughly, dispose of it as general waste.",
        tips: "Only containers that are fully washed and dried can move into the plastic stream.",
      },
      paperCarton: {
        name: "Milk or juice carton",
        instructions:
          "Empty, rinse, unfold, and dry. Remove straws, stickers, or mixed materials before bundling for pickup.",
        tips: "Clean laminated cartons can go to dedicated carton drives or deposit programs.",
      },
      greasyPizzaBox: {
        name: "Grease-stained pizza box",
        instructions:
          "Grease contaminates other paper, so place lightly soiled boxes in trash bags or special sacks.",
        tips: "Separate clean sections and recycle only the unstained pieces for better efficiency.",
      },
      aluminumCan: {
        name: "Aluminum beverage can",
        instructions:
          "Rinse to remove residue and keep foreign objects out. Remove any plastic caps before recycling.",
        tips: "Crushing the top improves collection efficiency and stacking stability.",
      },
      butaneCan: {
        name: "Butane can with leftover gas",
        instructions:
          "Remaining gas makes the can unsafe, so vent it completely outdoors, then place it in a special disposal sack.",
        tips: "Pierce the can and remove labels once it's empty to recycle it with other metal items.",
      },
      glassBottle: {
        name: "Soju or beer glass bottle",
        instructions:
          "Remove caps and labels, rinse, and recycle carefully or return it through the deposit refund program.",
        tips: "Deposit bottles can be returned to retailers for an instant refund.",
      },
      heatResistantGlass: {
        name: "Heat-resistant glass cookware",
        instructions:
          "Tempered or heat-resistant glass melts differently, so wrap it in newspaper and dispose of it as general waste.",
        tips: "Clearly label sharp shards to keep collection crews safe.",
      },
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
      analysisFailed: "We couldn't reach the AI service. Please try again shortly.",
      noPrediction: "No recyclable material detected. Try a clearer angle.",
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
      defaultInstructions: "Remove any residue and follow your local recycling rules.",
    },
    tips: {
      title: "Shooting tips",
      items: [
        "Shoot in bright, even lighting.",
        "Use a clean background for better accuracy.",
        "Make sure the recycling symbol is visible.",
        "Capture the item straight on when possible.",
      ],
      bannerMessage: "Photo tip ✨\nBright light plus a clean, front view keeps the AI spot on.",
    },
    captured: {
      alt: "Captured image preview",
      resetAria: "Retake photo",
    },
    guides: {
      plastic: {
        item: "Plastic items",
        instructions: "Remove labels and caps, rinse thoroughly, then crush before drop-off.",
        tips: "Dry containers completely to avoid contamination.",
      },
      paper: {
        item: "Paper & cardboard",
        instructions: "Peel off tape or staples, flatten boxes, and keep greasy parts out.",
        tips: "Store in a dry bag until collection.",
      },
      metal: {
        item: "Metal cans",
        instructions: "Empty and rinse cans, then press them gently to save space.",
        tips: "Remove plastic lids or seals before recycling.",
      },
      glass: {
        item: "Glass containers",
        instructions: "Take off lids, rinse, and place carefully to prevent breakage.",
        tips: "Wrap broken glass separately per local guidance.",
      },
      textile: {
        item: "Textiles",
        instructions: "Wash and dry garments before bringing them to a clothing bin.",
        tips: "Bundle items in tied bags for easier handling.",
      },
      electronic: {
        item: "Batteries & electronics",
        instructions: "Remove batteries and drop devices at an e-waste collection point.",
        tips: "Cover both battery terminals with tape to prevent short circuits.",
      },
      other: {
        item: "General waste",
        instructions: "Check municipal disposal rules when the material is uncertain.",
        tips: "Look for recycling symbols or ask your local office.",
      },
    },
  },
  calendar: {
    overviewTitle: "{{month}}",
    stats: {
      records: "Total records",
      items: "Total items",
      points: "Points earned",
      planned: "Planned {{count}}",
    },
    legend: {
      title: "Material legend",
      count: "{{count}} pcs",
      points: "+{{points}} pts",
      empty: "No records for this month yet.",
    },
    entries: {
      title: "{{date}}",
      meta: "{{count}} items | {{time}}",
      points: "+{{points}} pts",
      pointsPlanned: "Planned +{{points}} pts",
      modes: {
        record: "Completed",
        plan: "Planned",
        completed: "Done",
      },
      empty: "No entries on this day.",
      confirmDelete: "Are you sure you want to delete this record?",
      deleteGuide: "Deleting also removes the related points and cannot be undone",
      complete: "Complete",
      edit: "Edit",
      confirmComplete: "Mark this plan as completed?",
      completeGuide: "Completing will add points and convert to a record",
      completeSuccess: "Plan completed!",
      editSuccess: "Plan updated",
    },
    guide: {
      title: "Tracking guide",
      items: [
        "Entries automatically feed into your monthly stats.",
        "New scans appear on the calendar instantly.",
        "Busy days show a dot indicator on the calendar.",
      ],
      bannerMessage: "Calendar tip 🗓️\nTap any date to instantly review or delete its logs.",
    },
  },
  map: {
    mapView: {
      title: "Check locations on the map",
      subtitle:
        'We list drop-off bins for your default region; turn on "Use my location" to sort by distance.',
      loading: "Loading the map...",
      missingKey: {
        title: "Map API key missing",
        description:
          "Add the NAVER Web Dynamic Map key in the console and reload to see the live map.",
      },
      loadFailed: {
        title: "Couldn't load the map",
        description: "Verify the network connection and domain registration, then try again.",
      },
      initFailed: {
        title: "Map engine failed to initialize",
        description:
          "Make sure this origin is allowed in the NAVER Maps domain whitelist and API permissions.",
      },
    },
    guide: {
      bannerMessage: "Map tip 🧭\nLocation off = regional view, on = closest bins first.",
    },
    routePanel: {
      title: "Directions",
      idle: "Tap a directions button in the list to see the route.",
      measuring: "Fetching a walking route...",
      failed: "Couldn't load a route. Please try again.",
      clear: "Clear Route",
      locationRequired: "Enable your location first to start walking directions.",
    },
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
      updatedAt: "Updated {{time}}",
    },
    availability: {
      available: "Available",
      full: "Full",
      maintenance: "Under maintenance",
    },
    centers: {
      title: "Recycling centers",
      sectionTitle: "Recycling centers",
      directions: "Directions",
      call: "Call",
    },
    errors: {
      title: "Unable to load map data",
      description: "Check the server connection or SSL settings, then try again.",
      detail: "Error message: {{message}}",
      action: "Retry",
      retrying: "Retrying...",
    },
  },
  settings: {
    profile: {
      avatarAlt: "Default profile image",
      joined: "Joined {{date}}",
      points: "{{points}} pts",
      streak: "{{days}}-day streak",
      nickname: "Nickname",
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
      monthlyGoal: {
        title: "Monthly point goal",
        description: "Progress calculation basis",
        placeholder: "e.g. 200",
        helper: "Enter at least 10pt to save.",
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
      languages: {
        ko: "Korean",
        en: "English",
        es: "Spanish",
        fr: "French",
      },
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
      logoutConfirm: "Log out?",
      // 로그아웃 안내 메시지
      logoutGuide: "You’ll be signed out on this device. Sign back in anytime to continue.",
      logoutSuccess: "You’ve been logged out.",
      logoutFailed: "Failed to log out. Please try again.",
    },
  },
  profile: {
    card: {
      avatarAlt: "User profile image",
      joined: "Started {{date}}",
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
      pointsNeeded: "{{points}}pt needed to next level",
      maxLevel: "Max level achieved!",
    },
    monthlyGoal: {
      title: "Monthly points target",
      description: "Set the number of points you want to hit this month.",
      placeholder: "e.g. 250",
      helper: "Enter any value above 10 points to save automatically.",
      cta: "Save target",
      usage: "Used by the dashboard progress widgets and tracker card.",
    },
    categories: {
      title: "Category Statistics",
      topCategory: "Most Recycled",
      noData: "No category data yet.",
      items: "{{count}} items",
      points: "{{points}}pt",
    },
  },
  materials: {
    categories: {
      plastic: "Plastic",
      paper: "Paper",
      metal: "Metal",
      glass: "Glass",
      textile: "Textiles",
      electronic: "Electronics",
      other: "Other",
    },
    items: {
      plasticBottle: "Plastic bottle",
      petBottle: "PET bottle",
      plasticContainer: "Plastic container",
      vinyl: "Plastic film/bag",
      styrofoam: "Styrofoam",
      paper: "Paper",
      cardboard: "Cardboard",
      newspaper: "Newspaper",
      milkCarton: "Milk carton",
      can: "Can",
      aluminumCan: "Aluminum can",
      steelCan: "Steel can",
      glassBottle: "Glass bottle",
      sojuBottle: "Soju bottle",
      clothes: "Clothes",
      oldClothes: "Used clothes",
      textile: "Textiles",
      battery: "Battery",
      electronics: "Electronics",
      fluorescentLamp: "Fluorescent lamp",
      other: "Other",
    },
  },
  notifications: {
    actions: {
      close: "Close",
      undo: "Undo",
    },
    banner: {
      welcome: {
        message: "Hi {{name}}!\nReady to log one more recycling win today?",
        cta: "Log activity",
      },
    },
    snackbar: {
      entrySaved: "Activity saved! +{{points}}pt earned",
      entryDeleted: "Activity entry deleted",
      entryRestored: "Entry restored",
      profileUpdated: "Profile name updated",
      languageChanged: "Language switched to {{language}}",
      regionChanged: "Region set to {{region}}",
      darkModeEnabled: "Dark mode enabled",
      darkModeDisabled: "Light mode enabled",
      locationPermissionRequired:
        "Allow location access in Settings to show your current position.",
      locationUnsupported: "This device can't provide location services.",
      locationPinned: "Your current location is now pinned on the map.",
      locationPermissionDenied: "Location access was denied by the browser.",
      locationError: "We couldn't load your location. Please try again.",
      analysisFailedRetry: "Analysis failed. Try retaking the photo with better light or angle.",
      analysisLowConfidence: "Low confidence (≤60%). Please retake the photo.",
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
